import { useState,useEffect } from "react";
import { useNavigate,useLocation} from "react-router-dom";
const Filter = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const LoadDetail = (id) => {
        navigate("/products/detail/" + id);
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
    
useEffect(() => {
    fetch("http://localhost:8000/products").then((res) => {
        return res.json();
    }).then((resp) => {
        setProducts(resp);
    }).catch((err) => {
        console.log(err.message);
    })
  }, [])
     const filteredproducts = products.filter(({category}) => category === state );
     let empty = false;
     if (filteredproducts.length === 0)
     {
        empty = true;
     }
    return(
        <div className="container">
  <div className="row">
    <div className="col-12"> 
		<table className="table table-image">
		  <thead>
		    <tr>     
		      <th scope="col">Code</th>
		      <th scope="col">Image</th>
		      <th scope="col">Name</th>
		      <th scope="col">Category</th>
		      <th scope="col">price</th>
		    </tr>
		  </thead>
		  <tbody>
        {!empty ?filteredproducts && filteredproducts.map(item => (
            <tr key={item.id}>
                <td>{item.code}</td>
                <td className="w-25"><img src={item.image} className="img-fluid img-thumbnail" alt={item.name}/></td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td><button onClick={() =>{ LoadDetail(item.id) }} className="btn btn-primary">Details</button></td>     
            </tr>)) : null}</tbody>
		</table>   
    </div>
  </div>
</div>
    );
}
export default Filter;