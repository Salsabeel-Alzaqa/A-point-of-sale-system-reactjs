import React, { useState,useEffect} from "react";
import Home from "./Home";
import { useFormik } from 'formik';
import SighnUp from "./SighnUp";
function Login() {
    const [users, setUsers] = useState([]);  
    const [home, setHome] = useState(true);
    const localSignUp=localStorage.getItem("signUp");
    const [show, setShow] = useState(false);
    const exist = (email) =>{
        const found = users.some(el => el.email === email);
        return found;
      }
  const handleClick = () => {
    setShow(true);
  };
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
                    alert("password and email do not match :(");
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
                } else if(!exist(values.email)){
                    errors.email='This email does not exist'
                }
                return errors;
            }
        });
  return (
    <div >
        <div>
            <h2 style={{color:'blue'}}>LogIn <button  className="btn btn-outline-danger" onClick={handleClick}>SignIn</button></h2>
                <SighnUp trigger={show} setTrigger={setShow} />
        </div>
      {home ? (
        <form className="container" onSubmit={formik.handleSubmit}>
        <div className="col-lg-12" style={{paddingTop:'10px'}}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' value={formik.values.email} onChange={formik.handleChange} className="form-control" style={{boxShadow:'0 10px 20px 0 rgba(0, 0, 0, 0.2), 0 4px 40px 0 rgba(8, 30, 224, 0.185)'}}></input>
                {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
            </div>
        </div>
        <div className="col-lg-12" style={{paddingTop:'40px'}}>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' value={formik.values.password} onChange={formik.handleChange} className="form-control"  style={{boxShadow:'0 10px 20px 0 rgba(0, 0, 0, 0.2), 0 4px 40px 0 rgba(8, 30, 224, 0.185)'}}></input>
                {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
            </div>
        </div>
        <div className="col-lg-12">
            <div className="form-group" style={{paddingTop:'40px'}}>
                <button className="btn btn-outline-success" type="submit" >LogIn</button>
                
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