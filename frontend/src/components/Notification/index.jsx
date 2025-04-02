import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const Notification = ({ text, color,resetKey }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (text) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }
  }, [text, resetKey]);
  return (
    <>
      <div style={{color:color}}
        className={`containerNotification ${
          isVisible ? "showNotification" : ""
        }`}
      >
        <p>{text}</p>
      </div>
    </>
  );
};

export default Notification;
