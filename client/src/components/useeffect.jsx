import React, { useEffect, useState } from 'react'

export default function Timer() {
    const [count,setCount] = useState(0);  
    useEffect(()=>{
        console.log("component rendered or updwated");
        document.title = `you clicked ${count} times`;
    },[count]);//only run when count changes
    return (
    <div>
        <p>you clicked {count} times</p>
        <button onClick={()=>setCount(count+1)}>Click me</button>
    </div>
  )
}
