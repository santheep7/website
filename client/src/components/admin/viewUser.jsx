import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AdminBar from './adminnavbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import gsap from 'gsap';

export default function ViewUserDetails() {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState('');
  const tableRef = useRef(null);

  const filteredUsers = user.filter((customer) =>
    customer.username.toLowerCase().includes(query.toLowerCase()) ||
    customer.email.toLowerCase().includes(query.toLowerCase())
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

  // Animate rows when filteredUsers change
  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current.querySelectorAll('tbody tr'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        }
      );
    }
  }, [filteredUsers]);

  const deleteuser = (id) => {
    axios.delete("http://localhost:9000/api/admin/deluser", { headers: { userid: id } })
      .then((res) => {
        alert(res.data);
        setUser(user.filter(u => u._id !== id));
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <AdminBar setSearchQuery={setQuery} />
      <h1>User Details</h1>

      <Table striped bordered hover ref={tableRef}>
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
