import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const User = ({ userId, avatar, name, skills }) => {
  console.log(skills);
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar} alt={name} />
      <div>
        <Typography>{name}</Typography>
        <h4>
          {skills?.length > 0 && skills.map((skill, index) => `${skill}. `)}
        </h4>
      </div>
    </Link>
  );
};

export default User;
