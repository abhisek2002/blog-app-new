import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookes from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message: "User photo is required",
      });
    }

    const { photo } = req.files;
    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Only jpg, png, jpeg, and webp formats are allowed",
      });
    }

    const { name, email, phone, education, role, password } = req.body;
    if (!name || !email || !phone || !education || !role || !password) {
      return res.status(400).json({
        message: "Please enter all the required fields",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath,
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
      return res.status(500).json({
        message: "Error uploading photo to Cloudinary",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    await newUser.save();
    if (newUser) {
      let token = await createTokenAndSaveCookes(newUser._id, res);
      // console.log(token);
      return res.status(201).json({
        message: "User registered successfully",
        newUser,
        token,
      });
    }
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "User with this email or phone already exists",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please enter all the required fields",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user.password) {
      return res.status(400).json({
        message: "Please fill required fields",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (user.role !== role) {
      return res.status(400).json({
        message: `Given role ${role} not found `,
      });
    }

    let token = await createTokenAndSaveCookes(user._id, res);
    // console.log("login token:", token);
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    // console.log('clearcookie called ',req.cookies);
    res.clearCookie("jwt");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json(user);
};

export const getAllAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json(admins);
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};