import './App.css';
import { Route, Routes } from 'react-router-dom';
//products
import ProductsList from './components/ProductsList';
import CreateProduct from './components/CreateProduct';
import ProductDetail from './components/ProductDetail';
import EditProduct from './components/EditProduct';
//categories
import CategoryList from './components/CategoryList';
import CreateCategory from './components/CreateCategory';
import EditCategory from './components/EditCategory';
import Navbar  from './components/Navbar';
//
import Login from './pages/Login';

function App() {
  return (
    <div className="App" style={{backgroundColor:'black'}}>
    <Login />
    </div>
  );
}
export default App;