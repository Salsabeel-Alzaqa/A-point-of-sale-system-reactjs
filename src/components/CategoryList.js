import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [catNum,setCatNum] = useState(3); //category number per page
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/categories/edit/" + id);
    }
    const RemoveCategory =  (id) => {
        if (window.confirm('Do you want to remove?')) {
             fetch("http://localhost:8000/categories/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    useEffect(() => {
        fetch("http://localhost:8000/categories").then((res) => {
            return res.json();
        }).then((resp) => {
            setCategories(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [categories])
    
    //search 
     const [search, setSearch] = useState("");
     const filteredCategories = categories.filter(
      ({ name }) =>
        name.toLowerCase().includes(search.toLowerCase()))
       // Get current product
      const indexOfLastPost = currentPage * catNum;
      const indexOfFirstPost = indexOfLastPost - catNum;
      const currentProducts = filteredCategories.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) =>{setCurrentPage(pageNumber);}
    return(
      <div className='container mt-5' >
      <h1 className='text-primary mb-3'>CATEGORIES
      <Link to="categories/create" className="btn bi bi-plus-square" style={{fontSize: '40px', color: 'blue',paddingBottom:'11px'}}></Link></h1>
      <div>
            <input type="text" value={search} className="search" id="search" placeholder=" Search" onChange={(e) => setSearch(e.target.value)} />
            <label htmlFor="page-num">Show
            <input type="number" value={catNum} id="page-num" className="page-num" onInput={e=> setCatNum(e.target.value)}></input></label>
      </div>
        <table className='list' style={{width: '70%'}}>
    <thead >
          <tr>
            <th className='text-primary mb-3 item'>Name</th>
            <th className='item'></th>
          </tr>
          </thead>
          <tbody>
         {currentProducts.map(post => (
         <tr key={post.id}>
        <td className='item'>{post.name}</td>
        <td className='item'>
          <ul>
              <li><button onClick={() => { LoadEdit(post.id) }} className="btn bi bi-pencil-square" style={{fontSize: '20px', color: 'blue'}}></button>
                <button onClick={() => { RemoveCategory(post.id) }} className="btn bi bi-trash"  style={{fontSize: '20px', color: 'red'}}></button>
                  </li></ul></td></tr>
          ))
          }
          </tbody>
        </table>
        <Pagination productsPerPage={catNum} AllProducts={filteredCategories.length} paginate={paginate} />
      </div>

    );
}
export default CategoryList;