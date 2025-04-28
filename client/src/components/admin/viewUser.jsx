import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewUserDetails() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/user/getalluser')
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);  
      });
  }, []); 

  return (
    <div>
      <h1>Details</h1>
      <ul>
        {user.map((item) => (
          <li key={item._id}>
            {item.username} - {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
