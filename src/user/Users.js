import React, { useEffect, useState } from "react";

// imports from react material icons

import { Avatar } from "@mui/material";

function Users({ user, handleSelect, id }) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <div className="userinfo" onClick={() => handleSelect(user)}>
      <div className="avatar-container">
        {user.avatar?
          <img src={user.avatar} alt="Profile" />
        :<Avatar
          src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
          style={{ width: "100%", height: "100%" }}
        />}
      </div>
      <div className="userinfo-container">
        <p>{user.name}</p>
        <p className={user.isOnline ? "online" : "offline"}>
          {user.isOnline ? "online" : "offline"}
        </p>
      </div>
    </div>
  );
}

export default Users;
