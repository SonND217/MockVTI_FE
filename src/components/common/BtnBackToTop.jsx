import React, { useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
function BtnBackToTop() {
  // Function to handle scroll event
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      document.querySelector(".back-to-top").style.display = "block";
    } else {
      document.querySelector(".back-to-top").style.display = "none";
    }
  };

  // Function to handle click event
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Use useEffect to add an event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <a
        href="#"
        className="btn btn-primary back-to-top"
        onClick={handleClick}
        style={{ display: "none" }}
      >
        <FaAngleDoubleUp />
      </a>
    </div>
  );
}

export default BtnBackToTop;
