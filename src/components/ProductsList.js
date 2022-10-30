import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const quantity="1";
    const navigate = useNavigate();
    //Detail button
    const LoadDetail = (id) => {
        navigate("/products/detail/" + id);
    }
    //Add to cart button
    const AddCart =(item)=>{
        const cart={
       "name":item.name,
       "id":item.id,
       "price":item.price,
       "quantity":quantity,
       "total":item.price*quantity
    }
       fetch("http://localhost:8000/carts",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(cart)
    }).then((res)=>{
          alert('Added successfully.')
        }).catch((err)=>{
          console.log(err.message)})
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
                alert('Removed successfully.')
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
   useEffect(() => {
        fetch("http://localhost:8000/products").then((res) => {
            return res.json();
        }).then((resp) => {
            setProducts(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [products])
     //search 
     const [search, setSearch] = useState("");
     const filteredproducts = products.filter(({name,category}) => 
        name.toLowerCase().includes(search.toLowerCase())|| category.toLowerCase().includes(search.toLowerCase()));
    //
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredproducts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredproducts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Products</h1>
      <div className="search">
            <input type="text" value={search} id="search" placeholder=" Search" onChange={(e) => setSearch(e.target.value)} />
          </div>
      <table>
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
           {currentPosts.map(post => (
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
                   <button onClick={() => { AddCart(post)}} className="btn bi bi-cart-plus"  style={{fontSize: '20px', color: 'blue'}}></button>
                  <button onClick={() => { RemoveProduct(post.id) }} className="btn bi bi-trash"  style={{fontSize: '20px', color: 'red'}}></button>
                    </li></ul></td></tr>
            ))
            }
            </tbody>
		</table> 
    <footer className='mx-auto'> 
        <nav>
            <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} href='/' className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    </footer>
    </div>
  );
};

export default ProductsList;