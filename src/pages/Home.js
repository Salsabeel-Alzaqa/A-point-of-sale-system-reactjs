import { Route, Routes } from 'react-router-dom';
//products
import ProductsList from '../components/ProductsList';
import CreateProduct from '../components/CreateProduct';
import ProductDetail from '../components/ProductDetail';
import EditProduct from '../components/EditProduct';
//categories
import CategoryList from '../components/CategoryList';
import CreateCategory from '../components/CreateCategory';
import EditCategory from '../components/EditCategory';
import Navbar  from '../components/Navbar';
//
import Filter  from '../components/Filter';
import POS  from '../components/POS';
import Login from './Login';

function Home() {
    const localSignUp=localStorage.getItem("signUp");
  return (
    <div className='main'>
    <div className="left">
      <Navbar />
        <Routes>
          <Route path='/' element={localSignUp? <ProductsList /> : <Login />}></Route>
          <Route path='/filter' element={<Filter />}></Route>
          <Route path='/categories' element={<CategoryList />}></Route>
          <Route path='categories/categories/create' element={<CreateCategory />}></Route>
          <Route path='/categories/edit/:categoryID' element={<EditCategory />}></Route>
          <Route path='/products/create' element={<CreateProduct />}></Route>
          <Route path='/products/detail/:productID' element={<ProductDetail />}></Route>
          <Route path='/products/edit/:productID' element={<EditProduct />}></Route>
        </Routes>
        </div>    
        <POS />
        </div>
  );
}
export default Home;