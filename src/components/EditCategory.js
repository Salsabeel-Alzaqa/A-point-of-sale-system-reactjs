import {useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useFormik } from "formik";

const EditCategory = () => {
    const { categoryID } = useParams();
    const [categories, setCategories] = useState([]);
    const navigate=useNavigate();
    //Edit category ---> json file
    const EditCategory = async(category)=>{
       await fetch("http://localhost:8000/categories/"+ categoryID,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(category)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/categories');
      }).catch((err)=>{
        console.log(err.message)
      }) }
    
    const formik = useFormik({
        initialValues:{
            name:''
        },
        onSubmit:async (values) =>{
        if(categories.some(el => el.name === values.name))
        {
            alert("this category name is exist ,please try again!!");
        }
        else
        {
            EditCategory(values);
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

    useEffect(() => {
        fetch("http://localhost:8000/categories/").then((res) => {
            return res.json();
        }).then((resp) => {
            setCategories(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return ( 
        <form className="container" onSubmit={formik.handleSubmit} style={{width: '50%',paddingTop:'40px' }}>
        <div>
            <h2 style={{color:'blue'}}>Edit Category</h2>
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
 
export default EditCategory;