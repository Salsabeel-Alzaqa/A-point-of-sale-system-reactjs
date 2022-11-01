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
        <div>
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={formik.handleSubmit}>
                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Category Name Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input id="name" name="name" {... formik.getFieldProps('name')} className="form-control"></input>
                                        {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                                    </div>
                                </div>
                                
                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Save</button>
                                       <Link to="/categories" className="btn btn-danger">Back</Link>
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
 
export default EditCategory;