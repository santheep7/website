import React, { useEffect,useState } from 'react'
import { Table, Form, Button } from "react-bootstrap";
import AXIOS from 'axios'
export default function ViewOrdersAdmin(){
    const [orderList, setOrderList] = useState([]);
    useEffect(()=>{
      AXIOS.get("http://localhost:9000/api/admin/vieworder")
      .then((res)=>{
        console.log(res.data)
        setOrderList(Array.isArray(res.data) ? res.data : [res.data])
      }).catch((err)=>{
        console.log(err)
      })
    },[orderList])


    const handleStatus=(id,status)=>{
         console.log("order",id)
         console.log("status",status)
          AXIOS.patch("http://localhost:9000/api/admin/updatestatus",{status:status},{headers:{
            _id:id
          }}).then((res)=>{
            alert(res.data)
          }).catch((err)=>{
            console.log(err)
          })
    }

    return(
        <>
        <h1>Orders Placed</h1>
        <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Products (Quantity)</th>
          <th>Total Amount</th>
          <th>Delivery Address</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Update Status</th>
        </tr>
      </thead>
      <tbody>
        {orderList.map((order) => (
          <tr key={order._id}>
            <td>
  {order.products.map((item, index) => (
    <div key={index}>
      {item.productId?.productName || 'Unknown Product'} ({item.quantity})
    </div>
  ))}
</td>
            <td>₹{order.totalAmount}</td>
            <td>{order.address}</td>
            <td>{order.payment}</td>
            <td>{order.status}</td>
            <td>
              <Form.Select onChange={(e)=>handleStatus(order._id,e.target.value)}
              >
                <option value={"Order Placed"}>Order Placed</option>
                <option value={"Processing"}>Processing</option>
                <option value={"Shipped"}>Shipped</option>
                <option value={"Delivered"}>Delivered</option>
                <option value={"Cancelled"}>Cancelled</option>
              </Form.Select>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
        </>
    )
}