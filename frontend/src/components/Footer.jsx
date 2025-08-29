import React from 'react';

const Footer = () => {
  // Define footer links
  const footerLinks = [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Courses', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  // Define social media links with inline SVG icons (mimicking Shadcn/Lucide style)
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook h-5 w-5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ), 
      href: 'https://www.facebook.com/boundless' 
    },
    { 
      name: 'Twitter', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter h-5 w-5">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.6-11.6 17.6 1.3 0 2.2 0 3 0 10.9-10.7 18.2-13.1 18.2-13.1V4z"/>
          <path d="M22 4l-2 3.4"/>
        </svg>
      ), 
      href: 'https://www.twitter.com/boundless' 
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram h-5 w-5">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ), 
      href: 'https://www.instagram.com/boundless' 
    },
    { 
      name: 'LinkedIn', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin h-5 w-5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ), 
      href: 'https://www.linkedin.com/company/boundless' 
    },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-main-content">
        
        {/* Company Info / Logo Section */}
        <div className="company-info-section">
          <a href="#" className="company-logo-link">
            BOUNDLESS
          </a>
          <p className="company-description">
            Discover endless stories and knowledge. Your journey into the world of books starts here.
          </p>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="social-icon-button">
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="navigation-links-section">
          <div className="quick-links-group">
            <h6 className="section-title">
              Quick Links
            </h6>
            <ul className="link-list">
              {footerLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="legal-links-group">
            <h6 className="section-title">
              Legal
            </h6>
            <ul className="link-list">
              {footerLinks.slice(3).map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div className="copyright-section">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} Boundless. All rights reserved.
        </p>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .footer-container {
          width: auto;
background: linear-gradient(to right, #5a381f 0%, #8a5c30 100%);
          color: white;
          padding: 2rem; /* p-8 */
          box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-2xl */
          border-top-left-radius: 0.5rem; /* rounded-t-lg */
          border-top-right-radius: 0.5rem;
          font-family: 'Inter', sans-serif;
        }

        .footer-main-content {
          max-width: 76rem; /* container mx-auto */
          margin-left: auto;
          margin-right: auto;
          display: flex;
          flex-direction: column; /* flex-col */
          align-items: center; /* items-center */
          text-align: center; /* text-center */
          margin-bottom: 2rem; /* mb-8 */
        }
        @media (min-width: 768px) { /* md breakpoint */
          .footer-main-content {
            flex-direction: row; /* md:flex-row */
            justify-content: space-between; /* md:justify-between */
            align-items: flex-start; /* md:items-start */
            text-align: left; /* md:text-left */
          }
        }

        .company-info-section {
          display: flex;
          flex-direction: column;
          align-items: center; /* items-center */
          margin-bottom: 2rem; /* mb-8 */
          width: 100%; /* Default width */
        }
        @media (min-width: 768px) {
          .company-info-section {
            align-items: flex-start; /* md:items-start */
            margin-bottom: 0; /* md:mb-0 */
            width: 33.333333%; /* md:w-1/3 */
          }
        }

        .company-logo-link {
          font-size: 1.5rem; /* variant="h4" */
          color: white;
          margin-bottom: 1rem; /* mb-4 */
          font-weight: 700; /* font-bold */
          letter-spacing: 0.05em; /* tracking-wider */
          text-decoration: none;
        }

        .company-description {
          color: white;
          font-weight: 400; /* font-normal */
          max-width: 16rem; /* max-w-xs */
          opacity: 0.8; /* opacity-80 */
          margin-bottom: 1rem; /* mb-4 */
          font-size: 0.875rem; /* Adjust if needed */
        }

        .social-links {
          display: flex;
          gap: 1rem; /* gap-4 */
        }

        .social-icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem; /* h-9 w-9 */
          height: 2.25rem;
          border-radius: 0.375rem; /* rounded-md */
          background-color: transparent;
          color: white;
          transition: color 0.3s ease-in-out, transform 0.3s ease-in-out; /* transition-all duration-300 */
          text-decoration: none;
        }
        .social-icon-button:hover {
          color: #90cdf4; /* hover:text-blue-300 */
          transform: scale(1.1); /* hover:scale-110 */
        }

        .navigation-links-section {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr)); /* grid-cols-2 */
          gap: 2rem; /* gap-8 */
          margin-bottom: 2rem; /* mb-8 */
          width: 100%; /* Default width */
        }
        @media (min-width: 768px) {
          .navigation-links-section {
            gap: 3rem; /* md:gap-12 */
            margin-bottom: 0; /* md:mb-0 */
            width: 33.333333%; /* md:w-1/3 */
          }
        }
        @media (min-width: 1024px) {
          .navigation-links-section {
            gap: 5rem; /* lg:gap-20 */
          }
        }

        .quick-links-group, .legal-links-group {
          display: flex;
          flex-direction: column;
          align-items: center; /* items-center */
        }
        @media (min-width: 768px) {
          .quick-links-group, .legal-links-group {
            align-items: flex-start; /* md:items-start */
          }
        }

        .section-title {
          font-size: 1.125rem; /* variant="h6" */
          color: #90cdf4; /* text-blue-300 */
          margin-bottom: 0.75rem; /* mb-3 */
          font-weight: 600; /* font-semibold */
        }

        .link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem; /* space-y-2 */
        }

        .footer-link {
          color: white;
          font-weight: 400; /* font-normal */
          opacity: 0.8; /* opacity-80 */
          transition: color 0.3s ease-in-out; /* transition-colors */
          text-decoration: none;
        }
        .footer-link:hover {
          color: #90cdf4; /* hover:text-blue-300 */
        }

        .copyright-section {
          margin-top: 3rem; /* mt-12 */
          border-top: 1px solid #2b6cb0; /* border-t border-blue-800 */
          padding-top: 2rem; /* pt-8 */
          text-align: center; /* text-center */
        }

        .copyright-text {
          color: white;
          font-weight: 400; /* font-normal */
          opacity: 0.7; /* opacity-70 */
          font-size: 0.875rem; /* default text size */
        }
      `}</style>
    </footer>
  );
};

export default Footer;
