import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState,useEffect} from "react";
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
import Filter  from './components/Filter';
import POS  from './components/POS';

function App() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/categories");
      const Data = await response.json();
      setCategories(Data);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
    <div className="left">
      <Navbar />
        <Routes>
          <Route path='/' element={<ProductsList />}></Route>
          <Route path='/filter' element={<Filter />}></Route>
          <Route path='/categories' element={<CategoryList />}></Route>
          <Route path='categories/categories/create' element={<CreateCategory categories={categories} />}></Route>
          <Route path='/categories/edit/:categoryID' element={<EditCategory categories={categories}/>}></Route>
          <Route path='/products/create' element={<CreateProduct categories={categories} />}></Route>
          <Route path='/products/detail/:productID' element={<ProductDetail />}></Route>
          <Route path='/products/edit/:productID' element={<EditProduct categories={categories}/>}></Route>
        </Routes>
        </div>
        <div className="right">
        <POS />
        </div>
        </div>

  );
}
export default App;