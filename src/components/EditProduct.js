import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const EditProduct = () => {
    const { productID } = useParams();
    const[id,setId]=useState("");
    const[code,setCode]=useState("");
    const[name,setName]=useState("");
    const[category,setCategory]=useState("");
    const[price,setPrice]=useState("");
    const[image,setImage]=useState("");
    const navigate=useNavigate();
    
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/categories/").then((res) => {
            return res.json();
        }).then((resp) => {
            setCategories(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);


    useEffect(() => {
        fetch("http://localhost:8000/products/" + productID).then((res) => {
            return res.json();
        }).then((resp) => {
            setId(resp.id);
            setCode(resp.code);
            setName(resp.name);
            setCategory(resp.category);
            setPrice(resp.price);
            setImage(resp.image);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const handlesubmit=(e)=>{
      e.preventDefault();
      const products={id,code,name,category,price,image};
      fetch("http://localhost:8000/products/"+ productID,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(products)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })
    }

    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Product Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                            <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input value={code} onChange={e=>setCode(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onChange={e=>setName(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Category</label>
                                             <select required defaultValue="" onChange={e=>setCategory(e.target.value)} className="form-control">
                                             <option value="" disabled>Select Category</option>
                                             {categories && categories.map(item => (
                                                <option key={item.id} value={item.name}>{item.name}</option>))}
                                            </select>
                                        </div>
                                    </div>

                                <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input type="number"  required value={price} onChange={e=> setPrice(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                         <label >Image URL</label>
                                         <input required type="url" value={image} onChange={e=> setImage(e.target.value)} className="form-control"></input>                                            
                                        </div>
                                    </div>
                                
                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Save</button>
                                       <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
     );
}
 
export default EditProduct;