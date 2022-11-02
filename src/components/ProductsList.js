import React, { useState, useEffect } from 'react';
import Pagination from "./Pagination";
import Table from "./Table";
import { Link } from "react-router-dom";
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsNum,setProductsNum] = useState(5); //products number per page
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/products");
      const Data = await response.json();
      setProducts(Data);
    };
    fetchData();
  }, [products]);
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
      <h1 className='text-primary mb-3'>PRODUCTS
      <Link to="products/create" className="btn bi bi-plus-square" style={{fontSize: '40px', color: 'blue',paddingBottom:'11px'}}></Link></h1>
      <div>
            <input type="text" value={search} className="search" id="search" placeholder=" Search" onChange={(e) => setSearch(e.target.value)} />
            <label htmlFor="page-num">Show
            <input type="number" value={productsNum} id="page-num" className="page-num" onInput={e=> setProductsNum(e.target.value)}></input></label>
      </div>
      <Table Products={currentProducts} />
      <Pagination productsPerPage={productsNum} AllProducts={filteredproducts.length} paginate={paginate} /> </div>
  );
};
export default ProductsList;