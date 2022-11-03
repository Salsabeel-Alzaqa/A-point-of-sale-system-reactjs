import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";
import {useFormik } from "formik";
const CreateProduct = () => {
    const navigate=useNavigate();
    const [categories, setCategories] = useState([]);
    const AddProduct = async(products)=>{
        await fetch("http://localhost:8000/products",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(products),
      }).then((res)=>{
          alert('Saved successfully.')
          navigate('/');
        }).catch((err)=>{
          console.log(err.message)
        })}
    const formik = useFormik(
        {
            initialValues:{
                code:'',
                name:'',
                category:'',
                price:'',
                image:'',
            },
            onSubmit:async (values) =>
            {
                let name = values.name;
                let code = values.code;
                let category = values.category;
                let price = values.price;
                let image = values.image;
                const products={code,name,category,price,image};
                AddProduct(products);
            formik.resetForm();  
            },
            validate:values =>{
                let errors ={};
                if(!values.name){
                    errors.name='Required'
                }
                if(!values.code){
                    errors.code='Required'
                }
                if(!values.price){
                    errors.price='Required'
                }
                if(!values.category){
                    errors.category='Required'
                }
                if(!values.image){
                    errors.image='Required'
                }
                return errors;
            }
        });
        useEffect(() => {
            const fetchData = async () => {
              const response = await fetch("http://localhost:8000/categories");
              const Data = await response.json();
              setCategories(Data);
            };
            fetchData();
          }, []);
    return (
    <form className="container" onSubmit={formik.handleSubmit} style={{width: '50%',paddingTop:'40px' }}>
        <div>
            <h2 style={{color:'blue'}}>Add Product</h2>
        </div>
        <div className="col-lg-12">
            <div className="form-group">
                <label htmlFor="code">Code</label>
                <input  id="code" name="code" value={formik.values.code} onChange={formik.handleChange} className="form-control" ></input>
                {formik.errors.code ? <div className="error">{formik.errors.code}</div> : null}
            </div>
        </div>
        <div className="col-lg-12">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={formik.values.name} onChange={formik.handleChange} className="form-control"></input>
                {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
            </div>
        </div>
        <div className="col-lg-12">
            <div className="form-group">
                <label>Category</label>
                <select id='category' name='category' value={formik.values.category} onChange={formik.handleChange} className="form-control">
                    <option value="" disabled>Select Category</option>
                    {categories && categories.map(item => (
                        <option key={item.id} value={item.name}>{item.name}</option>))}
                </select>
                {formik.errors.category ? <div className="error">{formik.errors.category}</div> : null}
            </div>
        </div>
        <div className="col-lg-12">
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number" id='price' value={formik.values.price} onChange={formik.handleChange} className="form-control"></input>
                {formik.errors.price ? <div className="error">{formik.errors.price}</div> : null}
            </div>
        </div>
        <div className="col-lg-12">
            <div className="form-group">
                <label >Image URL</label>
                <input type="url" id='image' value={formik.values.image} onChange={formik.handleChange} className="form-control"></input>  
                {formik.errors.image ? <div className="error">{formik.errors.image}</div> : null}                                          
            </div>
        </div>
        <div className="col-lg-12">
            <div className="form-group">
                <Link to="/" className="btn btn-outline-primary">Back</Link>
                <button className="btn btn-outline-success" type="submit">Save</button>
            </div>
        </div>
    </form>
    );
}
export default CreateProduct;