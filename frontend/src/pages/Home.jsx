import React from "react";
import { Hero, HowItWorks, Testimonials } from "../components/sections";

const Home = ({ darkMode, onExplore, onSearch }) => {
  return (
    <div>
      {/* Hero Section */}
      <Hero darkMode={darkMode} onExplore={onExplore} onSearch={onSearch} />

      {/* How It Works */}
      <HowItWorks darkMode={darkMode} />

      {/* Testimonials */}
      <Testimonials darkMode={darkMode} />
    </div>
  );
};

export default Home;
