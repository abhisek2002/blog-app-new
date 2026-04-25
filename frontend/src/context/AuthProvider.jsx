import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("jwt");
        // const parsedToken = token ? JSON.parse(token) : undefined;
        console.log(token);
        if (token) {
          const { data } = await axios.get(
            "http://localhost:4000/api/users/myProfile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          console.log(data);
          setProfile(data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/blogs/allBlogs",
          { withCredentials: true },
        );
        // console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs, profile, isAuthenticated,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
