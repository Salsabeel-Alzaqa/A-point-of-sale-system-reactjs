import { useState,useEffect } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import {useLocation} from "react-router-dom";
const Filter = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const { state } = location;
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
     const filteredproducts = products.filter(({category}) => category === state );
     // Get current product
  const indexOfLastPost = currentPage * productsNum;
  const indexOfFirstPost = indexOfLastPost - productsNum;
  const currentProducts = filteredproducts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) =>{setCurrentPage(pageNumber);}
    return(
        <div className='container mt-5'>
      <h1 className='text-primary mb-3'>{state.toUpperCase()}</h1>
            <label htmlFor="page-num">Show
            <input type="number" value={productsNum} id="page-num" className="page-num" onInput={e=> setProductsNum(e.target.value)}></input></label>
            <Table Products={currentProducts}/>
            <Pagination productsPerPage={productsNum} AllProducts={filteredproducts.length} paginate={paginate}/>
        </div>
    );
}
export default Filter;