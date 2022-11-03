import React, { useState,useEffect } from "react";
import Login from "./Login";
import { useFormik } from 'formik';
function SighnUp() {
  const [login, setLogin] = useState(true);
  const localSignUp=localStorage.getItem("signUp");
  useEffect(()=>{
    if(localSignUp){
      setLogin(!login);
  }
  },[])
  const AddProduct = async(users)=>{
    await fetch("http://localhost:8000/users",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(users),
  }).then((res)=>{
      alert('Saved successfully.')
    }).catch((err)=>{
      console.log(err.message)
    })}
  function handleClick() {
    setLogin(!login);
  }
  const formik = useFormik(
    {
        initialValues:{
            name:'',
            password:'',
            email:'',
            confpassword:''
        },
        onSubmit:(values) =>
        {
          AddProduct(values);
          formik.resetForm();
          setLogin(!login);  
        },
        validate:values =>{
            let errors ={};
            if(!values.name){
                errors.name='Required'
            }
            if(!values.password){
                errors.password='Required'
            }
            if(!values.confpassword){
                errors.confpassword='Required'
            }
            if(!values.email){
                errors.email='Required'
            }
            if(values.password !== values.confpassword)
            {
              errors.confpassword='must match password'
            }
            return errors;
        }
    });
  return (
        <div>
          {login ? (
            <form className="container" onSubmit={formik.handleSubmit}>
            <div>
                <h2 style={{color:'blue'}}>Add Product</h2>
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
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' value={formik.values.email} onChange={formik.handleChange} className="form-control"></input>
                    {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' value={formik.values.password} onChange={formik.handleChange} className="form-control"></input>
                    {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-group">
                    <label htmlFor="confpassword">Confirm Password</label>
                    <input type="password" id='confpassword' value={formik.values.confpassword} onChange={formik.handleChange}onBlur={formik.handleBlur} className="form-control"></input>
                    {formik.errors.confpassword ? <div className="error">{formik.errors.confpassword}</div> : null}
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-group">
                    <button className="btn btn-outline-success" type="submit">SighnUp</button>
                    <button className="btn btn-outline-danger" onClick={handleClick}>Login</button>
                </div>
            </div>
        </form>
          ) : (
            <Login />
          )}
        </div>
  );
}
export default SighnUp;
    