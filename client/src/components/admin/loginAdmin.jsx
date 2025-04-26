import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function AdminLogin() {
  const [admin, setAdmin] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email entered:", admin.email);
    console.log("Password entered:", admin.password);

    if (admin.email.trim().toLowerCase() === "santheep@gmail.com" && admin.password.trim() === "12345") {
      toast.success("login successful");
      setTimeout(() => {
        navigate('/adminHome')
      }
        , 3000)
      setAdmin({ email: "", password: "" }); // optional: clear form
    } else {
      toast.error("invalid credentials");
    }
  };
  return (
    <div className="container" >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div>
        <h1>Welcome to Admin Login</h1>
      </div>
      <div className="form" style={{ width: "400px", marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name='email' placeholder="Enter email" onChange={handleChange} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;