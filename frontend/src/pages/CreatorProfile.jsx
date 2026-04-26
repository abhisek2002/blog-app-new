import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CreatorProfile() {
  const { id } = useParams();
  const [creator, setCreator] = useState({});

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/users/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        setCreator(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreator();
  }, [id]);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
          <div className="relative">
            <img
              src={creator?.photo?.url}
              alt="avatar"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={creator?.photo?.url}
                alt="avatar"
                className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
              />
            </div>
          </div>
          <div className="px-6 py-8 mt-2">
            <h2 className="text-center text-2xl font-semibold text-gray-800">
              {creator?.name}
            </h2>
            <p className="text-center text-gray-600 mt-2">{creator?.email}</p>
            <p className="text-center text-gray-600 mt-2">{creator?.phone}</p>
            <p className="text-center text-gray-600 mt-2">{creator?.role}</p>
            <p className="text-center text-gray-600 mt-2">{creator?.education}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorProfile;
