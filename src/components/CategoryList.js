import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const CategoryList = () => {
    const [categories, setCategories] = useState([]);
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
        name.toLowerCase().includes(search.toLowerCase())
  );
    return(
      <div>
        <table className='list'>
    <thead >
          <tr>
            <th className='text-primary mb-3 item'>Name</th>
            <th className='item'><Link to="categories/create" className="btn bi bi-plus-square" style={{fontSize: '30px', color: 'blue'}}></Link></th>
          </tr>
          </thead>
          <tbody>
         {filteredCategories.map(post => (
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
      </div>
       /*} <div className="container">
            <div className="search">
            <input type="text" value={search} id="search" placeholder=" Search" onChange={(e) => setSearch(e.target.value)} />
          </div>
  <div className="row">
    <div className="col-12"> 
		<table className="table table-image">
		  <thead>
		    <tr>     
		      <th scope="col">Name</th>
              <th><Link to="categories/create" className="btn btn-success">Add New (+)</Link></th>
		    </tr>
		  </thead>
		  <tbody>
          
          {filteredCategories && filteredCategories.map(item => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td><button onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</button>
                    <button onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</button>
                </td>
            </tr>
            ))
            }
		  </tbody>
		</table>   
    </div>
  </div>
          </div>*/
    );
}
export default CategoryList;