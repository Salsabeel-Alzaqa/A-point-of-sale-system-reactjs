import React , {useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
const Navbar =() =>{
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/categories/").then((res) => {
            return res.json();
        }).then((resp) => {
            setCategories(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [categories]);

    return(
        <div className='navbar'>  
        <ul className="nav__list">
        <li className="nav__item"><NavLink  className="link" to="/" >Home</NavLink></li>
        <li className="nav__item"><NavLink  className="link" to="/categories">categories</NavLink></li>
       {categories && categories.map(item => (
        <ul className="nav__list" key={item.id}>
               <li><NavLink  className="link" to={{pathname :"/filter"}} state={item.name}>{item.name}</NavLink></li></ul>))
       }
       </ul>
    </div>
    );
}
export default Navbar;