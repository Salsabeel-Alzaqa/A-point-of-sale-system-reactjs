import React, { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import { useFormik } from 'formik';
import SighnUp from "./SighnUp";
//import SighnUp from "./SighnUp";

function Login() {
    const [users, setUsers] = useState([]);  
    const [home, setHome] = useState(true);
    const localSignUp=localStorage.getItem("signUp");
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://localhost:8000/users");
          const Data = await response.json();
          setUsers(Data);
        };
        fetchData();
        if(localSignUp){
            setHome(!home);
        }
      }, []);
      const formik = useFormik(
        {
            initialValues:{
                password:'',
                email:''
            },
            onSubmit:(values) =>
            {
                const open = users.filter(user => values.email === user.email && values.password === user.password)
                if(open.length > 0 )
                {
                    localStorage.setItem("signUp",true);
                    setHome(!home);
                }
                else{
                    alert("password or email is unvalid");
                }
              formik.resetForm();
              
            },
            validate:values =>{
                let errors ={};
                if(!values.password){
                    errors.password='Required'
                }
                if(!values.email){
                    errors.email='Required'
                }
                return errors;
            }
        });
  return (
    <div >
      {home ? (
        <form className="container" onSubmit={formik.handleSubmit}>
        <div>
            <h2 style={{color:'blue'}}>LogIn</h2>
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
                <button className="btn btn-outline-success" type="submit">LogIn</button>
                <Link to="products/create" className="btn btn-outline-success">SignIn</Link>
            </div>
        </div>
    </form>
      ) : (
        <Home />
      )}
    </div>
  );
}
export default Login;