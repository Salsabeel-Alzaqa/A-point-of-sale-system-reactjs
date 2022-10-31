import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import Table from "./Table";
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsNum,setProductsNum] = useState(5); //products number per page
  /*const quantity="1";
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
  const AddToCart =(item)=>
  {
    const cart=
    {
      "name":item.name,
      "id":item.id,
      "price":item.price,
      "quantity":quantity,
      "total":item.price*quantity
    }
    fetch("http://localhost:8000/carts",
    {
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(cart)
    }).then((res)=>{
      alert('Added successfully.')
    }).catch((err)=>{
      console.log(err.message)
    })
  }*/
  useEffect(() =>{
    fetch("http://localhost:8000/products").then((res) => {
      return res.json();
    }).then((resp) => {
      setProducts(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [products])
  //filter --> to search by product name or category 
  const [search, setSearch] = useState("");
  const filteredproducts = products.filter(({name,category}) => name.toLowerCase().includes(search.toLowerCase())|| category.toLowerCase().includes(search.toLowerCase()));
  // Get current product
  const indexOfLastPost = currentPage * productsNum;
  const indexOfFirstPost = indexOfLastPost - productsNum;
  const currentProducts = filteredproducts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) =>{setCurrentPage(pageNumber);}
  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Products</h1>
      <div className="search">
            <input type="text" value={search} id="search" placeholder=" Search" onChange={(e) => setSearch(e.target.value)} />
            <label htmlFor="page-num">Show
            <input type="number" value={productsNum} id="page-num" className="page-num" onInput={e=> setProductsNum(e.target.value)}></input></label>
          </div>
        <Table Products={currentProducts} />
      {/*<table>
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
           {currentProducts.map(post => (
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
          </table> */}
    <Pagination productsPerPage={productsNum} AllProducts={filteredproducts.length} paginate={paginate} /> </div>
  );
};
export default ProductsList;