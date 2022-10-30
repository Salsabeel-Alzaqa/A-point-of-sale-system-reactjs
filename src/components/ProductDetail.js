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
        <div className="bboy">
               <div className="container">
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                <h2>The product name is : <b>{products.name}</b>  (Code: {products.code})</h2>
                </div>
                <div className="card-body"></div>
                {products &&
                    <div>
                        <img src={products.image} alt="pic" ></img>
                        <h3>Details:</h3>
                        <h5>Category : {products.category}</h5>
                        <h5>price : {products.price}</h5>
                        <Link className="btn btn-danger" to="/">Back to Products</Link>
                    </div>
                }
            </div>
            </div>
        </div >
    );
}

export default ProductDetail;