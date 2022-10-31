import React from 'react';
import {Link,useNavigate} from "react-router-dom";
const Table = ({Products}) => {
    const navigate = useNavigate();
    //Detail button
    const LoadDetail = (id) => {
      navigate("/products/detail/" + id);
    }
    //Edit button
    const LoadEdit = (id) => {
      navigate("/products/edit/" + id);
    }
    //Delete button
    const RemoveProduct =  (id) => {
      if (window.confirm('Do you want to remove?')) {
        fetch("http://localhost:8000/products/" + id, {
          method: "DELETE"
        }).then((res) => {
          console.log("Removed successfully")
        }).catch((err) => {
          console.log(err.message)
        })
      }
    }
    //Add to cart button
    const AddToCart = async (item)=>
    {
      const quantity="1";
      const cart=
      {
        "name":item.name,
        "id":item.id,
        "price":item.price,
        "quantity":quantity,
        "total":item.price*quantity
      }
      await fetch("http://localhost:8000/carts",
      {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(cart)
      }).then((res)=>{
        alert('Added successfully.')
      }).catch((err)=>{
        console.log(err.message)
      })
    }
  return (
    <table className='list'>
    <thead >
          <tr>
            <th className='text-primary mb-3 item'>Code</th>
            <th className='text-primary mb-3 item'>Image</th>
            <th className='text-primary mb-3 item'>Name</th>
            <th className='text-primary mb-3 item'>Category</th>
            <th className='text-primary mb-3 item'>price</th>
            <th className='item'><Link to="products/create" className="btn bi bi-plus-square" style={{fontSize: '30px', color: 'blue'}}></Link></th>
          </tr>
          </thead>
          <tbody>
         {Products.map(post => (
         <tr key={post.id}>
        <td className='item'>{post.code}</td>
        <td className='item'><img src={post.image} alt=""/></td>
        <td className='item'>{post.name}</td>
        <td className='item'>{post.category}</td>
        <td className='item'>{post.price}</td>
        <td className='item'>
          <ul>
              <li><button onClick={() => { LoadEdit(post.id) }} className="btn bi bi-pencil-square" style={{fontSize: '20px', color: 'blue'}}></button>
                <button onClick={() => { LoadDetail(post.id) }} className="btn bi bi-eye"  style={{fontSize: '20px', color: 'blue'}}></button>
                 <button onClick={() => { AddToCart(post)}} className="btn bi bi-cart-plus"  style={{fontSize: '20px', color: 'blue'}}></button>
                <button onClick={() => { RemoveProduct(post.id) }} className="btn bi bi-trash"  style={{fontSize: '20px', color: 'red'}}></button>
                  </li></ul></td></tr>
          ))
          }
          </tbody>
        </table> 
  );
};

export default Table;