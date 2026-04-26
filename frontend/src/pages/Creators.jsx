import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Creators() {

  const [creators, setCreators] = useState([]);
  console.log(creators);
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/users/admins",
          {
            withCredentials: true,
          },
        );
        // console.log(data);
        setCreators(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, []);

 return (
   <div className="flex flex-wrap justify-center items-center my-20 bg-gray-100">
     {creators.map((creator) => (
       <Link
         to={`/user/${creator._id}`}
         key={creator._id}
         className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-4 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl cursor-pointer"
       >
         <div className="relative">
           <img
             src={creator.photo.url}
             alt="avatar"
             className="w-full h-60 object-cover"
           />
           <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
             <img
               src={creator.photo.url}
               alt="avatar"
               className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
             />
           </div>
         </div>
         <div className="px-4 py-6 mt-4">
           <h2 className="text-center text-xl font-semibold text-gray-800">
             {creator.name}
           </h2>
           <p className="text-center text-gray-600 mt-2">{creator.email}</p>
           <p className="text-center text-gray-600 mt-2">{creator.phone}</p>
           <p className="text-center text-gray-600 mt-2">{creator.role}</p>
         </div>
       </Link>
     ))}
   </div>
 );
}

export default Creators
