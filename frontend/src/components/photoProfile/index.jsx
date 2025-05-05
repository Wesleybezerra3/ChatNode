import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Contexts";
import "./style.css";

const PhotoProfile = ({size}) => {
  const [primaryLetter, setPrimaryLetter] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user && user.username) {
      setPrimaryLetter(user.username.charAt(0).toUpperCase() || 'U');
    }
  }, [user]);
  return <div className="container-img-profile">{primaryLetter}</div>;
};

export default PhotoProfile;
