import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

const BlogPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!title || !content) {
        setMessage("Please fill out both fields.");
        return;
      }
  
      const blogRef = ref(database, "Blog/");
      const newBlog = {
        title,
        content,
        timestamp: Date.now(),
      };
  
      push(blogRef, newBlog)
        .then(() => {
          setMessage("Blog added successfully!");
          setTitle("");
          setContent("");
        })
        .catch((error) => {
          setMessage("Error adding blog: " + error.message);
        });
    };
  
    return (
      <div style={{ padding: "20px" }}>
        <h1>Create a Blog Post</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Content:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ width: "100%", padding: "8px", height: "200px", marginTop: "5px" }}
              />
            </label>
          </div>
          <button type="submit" style={{ padding: "10px 20px" }}>
            Submit
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
  export default BlogPage;
  