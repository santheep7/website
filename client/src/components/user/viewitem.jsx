import React, { useState } from 'react'
import './navbar'
import { Navbar } from 'react-bootstrap'
export default function ViewItem() {
    const [query,setquery] = useState('')
  return (
    <div>
        <h1>viewitem</h1>
        <Navbar searchquery={setquery}/>
        </div>
  )
}
