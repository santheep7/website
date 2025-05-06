import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminBar from './adminnavbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
export default function ViewUserDetails() {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState('');
const filteredUsers = user.filter((customer)=>
  customer.username.toLowerCase().includes(query.toLowerCase())||
customer.email.toLowerCase().includes(query.toLocaleLowerCase())
);
  useEffect(() => {
    axios.get('http://localhost:9000/api/admin/getuser')
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);  
      });
  }, []); 
  const deleteuser =(id)=>{
    console.log("userid",id)
    axios.delete("http://localhost:9000/api/admin/deluser",{headers:{userid:id}})
    .then((res)=>{
      alert(res.data);
      setUser(user.filter(u => u._id !== id));

    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    
    <div>
      {/* Pass down setSearchQuery as a prop to the AdminBar */}
      <AdminBar setSearchQuery={setQuery} />
      <h1>Details</h1>

      {/* Display filtered users in table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td>
                  {/* Delete button for each user */}
                  <Button variant="danger" onClick={() => deleteuser(customer._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
