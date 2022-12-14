import { Link, useNavigate } from "react-router-dom";
import {useFormik } from "formik";
import { useState,useEffect} from "react";
const CreateCategory = () => {
    const navigate=useNavigate();
    const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/categories");
      const Data = await response.json();
      setCategories(Data);
    };
    fetchData();
  }, []);
    const  AddCategory= async(category)=>{
          await fetch("http://localhost:8000/categories",{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(category),
        }).then((res)=>{
            alert('Saved successfully.')
            navigate('/categories');
          }).catch((err)=>{
            console.log(err.message)
          })}
    const formik = useFormik({
        initialValues:{
            name:''
        },
        onSubmit:(values) =>{
        if(categories.some(el => el.name === values.name))
        {
            alert("this category name is exist ,please try again!!");
        }
        else
        {
            AddCategory(values);
        }
        formik.resetForm();  
        },
        validate:values =>{
            let errors ={};
            if(!values.name){
                errors.name='Required'
            }
            return errors;
        }
    });
    return (
        <form className="container" onSubmit={formik.handleSubmit} style={{width: '50%',paddingTop:'40px' }}>
        <div>
            <h2 style={{color:'blue'}}>Add Category</h2>
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
                <Link to="/categories" className="btn btn-outline-primary">Back</Link>
                <button className="btn btn-outline-success" type="submit">Save</button>
            </div>
        </div>
    </form>
    );
}
export default CreateCategory;