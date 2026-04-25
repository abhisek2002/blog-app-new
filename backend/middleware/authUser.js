import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

 export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log("Token from cookie:", token);
    if (!token) {
      return res.status(401).json({
        error: "Token not found. Please login first.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if(!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }
    req.user = user;
    next();
;  } catch (error) {
    console.log("Error in authentication middleware:", error);
    return res.status(401).json({
      error: "You are not authenticated.",
    });
  }
};

export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `User with role ${req.user.role} is not authorized to perform this action.`,
      });
    }
    next();
  };
};