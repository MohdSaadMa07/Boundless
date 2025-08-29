import React from 'react';
import banner from '../assets/banner.jpg';

const Banner = () => {
  return (
    <div
      className="banner-container"
      style={{ backgroundImage: `url(${banner})` }} // use imported image
    >
      
      {/* Dark Overlay for better text contrast */}
      <div className="banner-overlay"></div>

      {/* Main Content Area */}
      <div className="banner-content">
        
        {/* Animated Main Heading */}
        <h1 className="banner-heading animate-fade-in-up">
          Dive into New Worlds <br className="md-break"/> at Our Book Store
        </h1>
        
        {/* Animated Subheading/Description */}
        <p className="banner-description animate-fade-in-up animation-delay-200">
          Uncover captivating stories, expand your knowledge, and find endless inspiration with our diverse collection.
        </p>
        
       
        

        {/* Stylish Call-to-action Button */}
        <a 
          href="#featured" 
          className="banner-button animate-bounce-in"
        >
          Explore Our Books
        </a>

      </div>
      
      {/* Optional: Subtle background animation or element */}
      <div className="banner-gradient-bottom"></div>

      {/* Embedded CSS for the banner component */}
      <style>{`
        .banner-container {
          position: relative;
          width: 100%;
          margin-top:80px;
          height: 65vh;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        @media (min-width: 768px) {
          .banner-container {
            height: 90vh;
          }
          .md-break { display: block; }
        }
        @media (max-width: 767px) { .md-break { display: none; } }

        .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
        }

        .banner-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          color: white;
          padding: 1.5rem;
        }

        .banner-heading {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1.25;
          margin-top: -5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
        }
        @media (min-width: 768px) { .banner-heading { font-size: 3.75rem; } }
        @media (min-width: 1024px) { .banner-heading { font-size: 4.5rem; } }

        .banner-description {
          font-size: 1rem;
          line-height: 1.5;
          max-width: 48rem;
          margin-bottom: 2rem;
          filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.4));
        }
        @media (min-width: 768px) { .banner-description { font-size: 1.25rem; } }
        @media (min-width: 1024px) { .banner-description { font-size: 1.5rem; } }

        .banner-button {
          background-image: linear-gradient(to right, #3b82f6 0%, #4f46e5 100%);
          color: white;
          font-weight: 700;
          padding: 0.75rem 2.5rem;
          border-radius: 9999px;
          font-size: 1.125rem;
          transition: all 0.3s ease-in-out;
          transform: scale(1);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
          text-decoration: none;
        }
        .banner-button:hover {
          background-image: linear-gradient(to right, #2563eb 0%, #4338ca 100%);
          transform: scale(1.05);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5), 0 4px 6px -2px rgba(59, 130, 246, 0.25);
        }

        .banner-gradient-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
        }

        @keyframes fadeInFromBottom {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInFromBottom 0.8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }
        @keyframes bounceIn {
          0%,20%,40%,60%,80%,100% { transition-timing-function: cubic-bezier(0.215,0.61,0.355,1); }
          0% { opacity:0; transform: scale3d(0.3,0.3,0.3); }
          20% { transform: scale3d(1.1,1.1,1.1); }
          40% { transform: scale3d(0.9,0.9,0.9); }
          60% { opacity:1; transform: scale3d(1.03,1.03,1.03); }
          80% { transform: scale3d(0.97,0.97,0.97); }
          100% { opacity:1; transform: scale3d(1,1,1); }
        }
      `}</style>
    </div>
  );
};

export default Banner;
