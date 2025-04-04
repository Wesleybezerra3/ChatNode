import React, { useEffect, useState } from "react";
import "./style.css";

const Notification = ({ text,resetKey }) => {
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
      <div
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
