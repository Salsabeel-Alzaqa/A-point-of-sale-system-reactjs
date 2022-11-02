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
       /*} <div className='navbar'>
        <ul className="nav__list">
        <li className="nav__item"><NavLink  className="link" to="/" >Home</NavLink></li>
        <li className="nav__item"><NavLink  className="link" to="/categories">Categories</NavLink></li>
       {categories && categories.map(item => (
        <ul className="nav__list" key={item.id}>
               <li><NavLink  className="link" to={{pathname :"/filter"}} state={item.name}>{item.name}</NavLink></li></ul>))
       }
       </ul>
    </div>*/

        <nav className="nav">
        <ul className="nav__menu">
          <li className="nav__menu-item">
          <NavLink  className="link" to="/" >Home</NavLink>
          </li>
          <li className="nav__menu-item">
          <NavLink className="link" to="/categories" >Categories</NavLink>            
          </li>
          <li className="nav__menu-item">
          <NavLink  className="link" >categories filter </NavLink>
          {categories && categories.map(item => (
          <ul className="nav__submenu" key={item.id}>
               <li className="nav__submenu-item ">
                <NavLink  className="link" to={{pathname :"/filter"}} state={item.name}>{item.name}</NavLink></li></ul>))}
        </li>
        </ul>
      </nav>
    
    );
}
export default Navbar;

const Menu = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [head, ...tail] = React.Children.toArray(children);
    
    return (
      <div
        className='menu'
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {head}
        {isOpen && <div className='open'>{tail}</div>}
      </div>
    );
  };
  
  const Item = ({ children, onClick }) => {
    return (
      <div className='item' onClick={onClick}>
        {children}
      </div>
    );
  };
  
  const menuInstance = (
    <Menu>
      <Item onClick={() => alert('Link one clicked!')}>Link One</Item>
      <Item onClick={() => alert('Link two clicked!')}>Link Two</Item>
      <Item onClick={() => alert('Link three clicked!')}>Link Three</Item>
    </Menu>
  );
  
