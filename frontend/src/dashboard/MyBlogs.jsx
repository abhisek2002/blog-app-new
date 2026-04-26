import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'

function MyBlogs() {

  const [myBlogs, setMyBlogs] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/blogs/myBlogs",
          { withCredentials: true },
        );
        console.log(data);
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    await axios
      .delete(`http://localhost:4000/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete blog");
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  return (
    <div>
      <div className="container mx-auto my-12 p-4 md:pl-40">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <Link to={`/blog/${element?._id}`}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                {element?.blogImage && (
                  <img
                    src={element?.blogImage?.url || element?.blogImage}
                    alt="blogImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element.category}
                  </span>
                  <h4 className="text-xl font-semibold my-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                    
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      disabled={deletingId === element._id}
                      className={`text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline ${deletingId === element._id ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {deletingId === element._id ? "Deleting..." : "DELETE"}
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs
