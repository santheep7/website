import React, { useState } from "react";
import AXIOS from 'axios';
import './reg.css';
import { useNavigate} from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify';
export default function LoginUser(){
    const [record,setRecord]=useState({
        username:"",
        email:"",
        password:""
    })
    const [error,setError]=useState({});
    const navigate = useNavigate()
    const handleChange=(e)=>{
     setRecord({...record,[e.target.name]:e.target.value})
    }
    const validate=()=>{
        const newError={}
        if(!record.username.trim())newError.username="username required";
       
        if(!record.password)newError.password="password required";
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
        AXIOS.post('http://localhost:9000/api/user/loginuser',record)
        .then((res)=>{
            alert(res.data.msg)
            if(res.data.status == 200)
                localStorage.setItem("token",res.data.token)
               navigate("/userhome")
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
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <p><input type="text" name="username" placeholder="username" onChange={handleChange} />
                    {error.username && <span style={{ color: "red" }}>{error.username}</span>}</p>
            
                <p><input type="password" name="password" placeholder="password" onChange={handleChange} />
                    {error.password && <span style={{ color: "red" }}></span>}{error.password}</p>
                <p><button type="submit">Login</button></p>
                <a href="/reg">Register here?</a>

            </form>
        </>
    )
}