import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const  ProductDetail = () => {
    const { productID } = useParams();
    const [products, setProducts] = useState({});
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://localhost:8000/products/" + productID);
          const Data = await response.json();
          setProducts(Data);
        };
        fetchData();
      }, []);
    return (
    <div >
        <h2>The product name is : <b>{products.name}</b>  (Code: {products.code})</h2>
        {products &&
            <div>
                <img src={products.image} alt="pic" ></img>
                <h3>Details:</h3>
                <h5>Category : {products.category}</h5>
                <h5>price : {products.price}</h5>
                <Link to="/" className="btn btn-outline-primary">Back</Link>
            </div>
        }
    </div>
    );
}

export default ProductDetail;