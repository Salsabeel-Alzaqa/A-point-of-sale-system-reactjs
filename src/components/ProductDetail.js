import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const  ProductDetail = () => {
    const { productID } = useParams();
    const [products, setProducts] = useState({});
    useEffect(() => {
        fetch("http://localhost:8000/products/" + productID).then((res) => {
            return res.json();
        }).then((resp) => {
            setProducts(resp);
        }).catch((err) => {
            console.log(err.message);
        })
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