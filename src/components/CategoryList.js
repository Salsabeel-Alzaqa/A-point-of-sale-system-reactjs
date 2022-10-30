import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/categories/edit/" + id);
    }
    
    const Removefunction =  (id) => {
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
        <div className="container">
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
</div>
    );
}
export default CategoryList;