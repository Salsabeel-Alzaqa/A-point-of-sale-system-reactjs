import React, { useEffect, useState} from "react";
import { useFormik } from 'formik';
function SighnUp(props) {
  const [users, setUsers] = useState([]);  
  const AddUser = async(user)=>{
    await fetch("http://localhost:8000/users",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
  }).then((res)=>{
    console.log('Saved successfully.')
    }).catch((err)=>{
      console.log(err.message)
    })}
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/users");
      const Data = await response.json();
      setUsers(Data);
    };
    fetchData();
  },[users])
  const exist = (email) =>{
    const found = users.some(el => el.email === email);
    return found;
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
          AddUser(values);
          formik.resetForm();
          props.setTrigger(false);
        },
        validate:values =>{
            let errors ={};
            if(!values.name){
                errors.name='Required'
            }
            if(!values.password){
                errors.password='Required'
            } else if(values.password.length < 8)
            {
              errors.password='Must be more than 8 words'
            }
            if(!values.confpassword){
                errors.confpassword='Required'
            } else if(values.password !== values.confpassword)
            {
              errors.confpassword='must match password'
            } 
            if(values.email === ''){
                errors.email='Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address'
            }else if(exist(values.email))
            {
              errors.email='This email already used'
            }
            return errors;
        }
    });
  return (props.trigger?
        <div className="popup">
          <div className="popup-inner">
             <button className="close-btn btn btn-outline-danger" onClick={() => props.setTrigger(false)}>Back</button>
            <form className="container" onSubmit={formik.handleSubmit}>
            <div>
                <h2 style={{color:'blue'}}>Sign Up</h2>
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
                    <input type="email" id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="form-control"></input>
                    {formik.touched.email && formik.errors.email && (<div className="error">{formik.errors.email}</div>)}
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
                    <input type="password" id='confpassword' value={formik.values.confpassword} onChange={formik.handleChange} className="form-control"></input>
                    {formik.errors.confpassword ? <div className="error">{formik.errors.confpassword}</div> : null}
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-group">
                    <button className="btn btn-outline-success" type="submit">SighnUp</button>
                </div>
            </div>
        </form>
          </div>
        </div>:"");
}
export default SighnUp;
    