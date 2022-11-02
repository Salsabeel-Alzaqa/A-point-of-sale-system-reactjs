import { useState,useEffect } from "react";
const POS = () => {
    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState("1");
    //const [tax, setTax] = useState(); 
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("http://localhost:8000/carts");
        const Data = await response.json();
        setCarts(Data);
      };
      fetchData();
    }, [carts]);
    const RemoveProduct = (id) => {
        fetch("http://localhost:8000/carts/" + id, {
            method: "DELETE"
        }).then((res) => {
            alert('Removed successfully.')
        }).catch((err) => {
            console.log(err.message)
        })
    }
    const summ = () =>
    {
        let sum=0;
        carts.forEach(item => {sum += item.total;});
        return sum;
    }
    const changeQuantity = (e,item)=>{
        e.preventDefault();
        setQuantity(e.target.value); 
        const cartt={
            ...item,
            "quantity":quantity,
            "total":item.price*quantity
        };
       fetch("http://localhost:8000/carts/"+ item.id,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(cartt)
      }).then((res)=>{
        console.log("changed")
      }).catch((err)=>{
        console.log(err.message)
      })}
    return(
    <div className="right">
      <div> 
      <div className="barcode">
            <input type="text" id="search" placeholder="Barcode" />
          </div>
    <table className="cart">
      <thead>
        <tr>     
          <th></th>
          <th >Name</th>
          <th>price</th>
          <th>quantity</th>
          <th>total</th>
        </tr>
      </thead>
      <tbody>
      {carts && carts.map(item => (
        <tr key={item.id}>
            <td><button onClick={() => { RemoveProduct(item.id) }} className="btn bi bi-trash"  style={{fontSize: '20px', color: 'red'}}></button></td>
            <td>{item.name}</td>
            <td>{item.price}</td>
           <td><input type="number" id="quantity" name="quantity" value={item.quantity} onInput={(e)=> changeQuantity(e,item)} /></td>
           <td>{item.total}</td>
        </tr>
        ))}
      </tbody>
    </table>      
</div>*

<div className="sticky">
<p>SubTotal:{summ()}</p>
<p>SubTotal:{summ()}</p>
<p>SubTotal:{summ()}</p>
<p>SubTotal:{summ()}</p>
<div>
<button className='btn btn-outline-danger' style={{width:'15%'}}>CANCEL</button>
<button className='btn btn-outline-success' style={{width:'15%'}}>PAYMENT</button></div>
</div>
</div> 
    );
  }
export default POS;