import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, set } from "firebase/database";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Blog = ({ loggedInUser }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [author, setAuthor] = useState(loggedInUser || "");
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const database = getDatabase();
  const blogsRef = ref(database, "Blog");

  useEffect(() => {
    get(blogsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setBlogs(Array.isArray(data) ? data : []);
      } else {
        setBlogs([]);
      }
    });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage("Please fill out the title and content.");
      return;
    }

    const newBlog = {
      title,
      subtitle,
      content,
      image: imageBase64,
      author: author || "Anonymous",
      timestamp: new Date().toISOString(),
    };

    const updatedBlogs = [...blogs, newBlog];
    set(blogsRef, updatedBlogs)
      .then(() => {
        setMessage("Blog added successfully!");
        setTitle("");
        setSubtitle("");
        setContent("");
        setImageBase64("");
        setBlogs(updatedBlogs);
      })
      .catch((error) => {
        setMessage("Error adding blog: " + error.message);
      });
  };

  return (
    <div className="p-6 max-w-3xl" style={{ margin: '50px' }}>
      {!selectedBlog ? (
        <>
          <h1 className="text-2xl font-bold mt-6">Create a Blog Post</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Subtitle (optional)"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <ReactQuill
              value={content}
              onChange={setContent}
              className="w-full p-2 border border-gray-300 rounded h-40 mb-2"
            />
            <input type="file" onChange={handleImageUpload} className="mb-2" />
            {imageBase64 && <img src={imageBase64} alt="Uploaded" className="w-full h-auto mb-2" />}
            <input
              type="text"
              placeholder="Author (default: you)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            {message && <p className="text" style={{color: '#ff0000'}}>{message}</p>}
            <button
              type="submit"
              className="text-white px-4 py-2 rounded"
              style={{ background: 'linear-gradient(135deg, #003049, #003049, #005f73)' }}
            >
              Publish
            </button>
          </form>
          <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
          <div className="grid gap-4">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <h3 className="text-lg text-gray-600">{blog.subtitle}</h3>
                <p className="mt-2 text-sm text-gray-500">By {blog.author}</p>
                <button
                  className="mt-2 text-white px-4 py-2 rounded"
                  style={{ background: 'linear-gradient(135deg, #003049, #003049, #005f73)' }}
                  onClick={() => setSelectedBlog(blog)}
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-6 p-4 border rounded shadow">
          <button
            onClick={() => setSelectedBlog(null)}
            className="text-white px-4 py-2 rounded mb-2"
            style={{ background: 'linear-gradient(135deg, #003049, #003049, #005f73)' }}
          >
            Back to Blogs
          </button>
          <h2 className="text-xl font-bold">{selectedBlog?.title}</h2>
          <h3 className="text-lg text-gray-600">{selectedBlog?.subtitle}</h3>
          {selectedBlog?.image && <img src={selectedBlog.image} alt="Blog" className="w-full h-auto my-2" />}
          <div className="mt-2 text-gray-800" dangerouslySetInnerHTML={{ __html: selectedBlog?.content }}></div>
          <p className="mt-2 text-sm text-gray-500">By {selectedBlog?.author}</p>
          {/* <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Edit</button> */}
        </div>
      )}
    </div>
  );
};

export default Blog;
