import React, { useState, useEffect } from "react";
import Navbar from "../Navbar.jsx";
import Banner from "../Banner.jsx";
import Freebook from "../Freebook.jsx";
import Footer from "../Footer.jsx";
import Auth from "../Auth.jsx";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Track Firebase user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Modal controller object
  const loginModal = {
    open: () => setShowAuth(true),
    close: () => setShowAuth(false),
  };

  return (
    <>
      {/* Navbar */}
      <Navbar openLogin={loginModal} user={user} />

      <Banner />
      <Freebook />
      <Footer />

      {/* Auth Modal */}
      {showAuth && (
        <div
          onClick={() => setShowAuth(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "350px",
              maxWidth: "90%",
            }}
          >
            {/* Auth component handles login/signup */}
            <Auth onSuccess={loginModal.close} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
