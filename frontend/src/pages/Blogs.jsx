import React from "react";
import { FeaturedBlogs } from "../components/sections";

const Blogs = ({ darkMode }) => {
  return (
    <div className="pt-20">
      <FeaturedBlogs darkMode={darkMode} />
    </div>
  );
};

export default Blogs;
