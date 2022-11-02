import React , {useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
const Navbar =() =>{
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://localhost:8000/categories");
          const Data = await response.json();
          setCategories(Data);
        };
        fetchData();
      }, [categories]);
    return(
        <nav className="nav">
        <ul className="nav__menu">
          <li className="nav__menu-item">
          <NavLink  className="link" to="/" >Home</NavLink>
          </li>
          <li className="nav__menu-item">
          <NavLink className="link" to="/categories" >Categories</NavLink>            
          </li>
          <li className="nav__menu-item">
          <NavLink  className="link" >Categories Filter </NavLink>
          <ul className="nav__submenu" >
            {categories && categories.map(item => (
               <li key={item.id} className="nav__submenu-item ">
                <NavLink className="link" to={{pathname :"/filter"}} state={item.name}>{item.name}</NavLink></li>))}</ul>
        </li>
        </ul>
      </nav>
    );
}
export default Navbar;

  
