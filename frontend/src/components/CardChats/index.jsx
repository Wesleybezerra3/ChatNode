import React, { useEffect, useState } from "react";
import "./style.css";
import api from "../../services/api";
import { Link } from "react-router-dom";
const CardChats = ({ qtdMembros, chatName, creator, acess,}) => {

  const [nameCreator,setNameCreator] = useState('');

  useEffect(()=>{
    const id = creator;
     const getNameCreator = async ()=>{
      try {
        const response = await api.get(`/users/getNameById`,{
          params: {id}
        } );
        const nameCreator = response.data.name.username;
        setNameCreator(nameCreator)
        // nameCreator(data.username);
      } catch (err) {
        console.error(err);
      }
     }
     getNameCreator()
  },[])

  return (
    <>
      <article className="container-card">
        <div className="container-info-card">
          <div className="colum1">
            <p>{chatName}</p>
          
           
          </div>
          <div className="colum2">
          <p>
            By:
              <span> {nameCreator} </span>
            </p>
            <p>{acess ? "Chat priado" : "Chat público"}</p>
          </div>
        </div>

        <div className="container-btn">
          <Link to={`/chat/${chatName}`}>
           Entrar no chat
          </Link>
        </div>
      </article>
    </>
  );
};

export default CardChats;
