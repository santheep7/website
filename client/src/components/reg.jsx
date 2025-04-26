import React, { useState } from "react";
import AXIOS from 'axios';
import './reg.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
export default function RegisterPage(){
    const [record,setRecord]=useState({
        username:"",
        email:"",
        password:""
    })
    const [error,setError]=useState({});
    
    const handleChange=(e)=>{
     setRecord({...record,[e.target.name]:e.target.value})
    }
    const validate=()=>{
        const newError={}
        if(!record.username.trim())newError.username="username is required";
        if(!record.email.trim())newError.email="email required";
        else if(!/\S+@\S+\.\S+/.test(record.email)) newError.email = "Email format is invalid";
        if(!record.password)newError.password="password required";
        else if(record.password.length<6)newError.password="password length must be atleast 6 characters!";
        return newError;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const validateErrors = validate()
        if(Object.keys(validateErrors).length>0){
            setError(validateErrors);
            return;
        }
        console.log(record)
        AXIOS.post('http://localhost:9000/api/user/register',record)
        .then((res)=>{
            console.log(res.data)
            toast.success('User Registered Successful')
        }).catch((err)=>{
            console.log(err)
            alert("Error occcured")
        })
    }
    return(
        <>
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
            <h1>Registeration page</h1>
            <form onSubmit={handleSubmit}>
                <p><input type="text" name="username" placeholder="username" onChange={handleChange} />
                    {error.username && <span style={{ color: "red" }}>{error.username}</span>}</p>
                <p><input type="email" name="email" placeholder="email" onChange={handleChange} />
                    {error.email && <span style={{ color: "red" }}></span>}{error.email}</p>
                <p><input type="password" name="password" placeholder="password" onChange={handleChange} />
                    {error.password && <span style={{ color: "red" }}></span>}{error.password}</p>
                <p><button type="submit">Login</button></p>
            </form>
        </>
    )
}