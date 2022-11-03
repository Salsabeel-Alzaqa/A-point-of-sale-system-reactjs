import { useState,useEffect } from "react";
const POS = () => {
    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState("1");
    const [tax, setTax] = useState(0); 
    const [discount, setDiscount] = useState(0);
    const [TaxTag, setTaxTag] = useState(true);
    const [DisTag, setDisTag] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("http://localhost:8000/carts");
        const Data = await response.json();
        setCarts(Data);
      };
      fetchData();
    }, [carts]);
    const RemoveProduct =async (id) => {
        await fetch("http://localhost:8000/carts/" + id, {
            method: "DELETE"
        }).then((res) => {
          console.log('Removed successfully.')
        }).catch((err) => {
            console.log(err.message)
        })
    }
    const subtotal = () =>
    {
        let sum=0;
        carts.forEach(item => {sum += item.total;});
        return sum;
    }
    const DiscountResult = () =>
    {
      let Discount= discount/100;
       Discount*=subtotal();
      return (subtotal()-Discount);
    }
    const Total=()=>
    {
      let sum = DiscountResult();
      sum +=sum*(tax/100);
      return sum.toFixed(2);
    }
    const changeQuantity =async (e,item)=>{
        e.preventDefault();
        setQuantity(e.target.value); 
        const cartt={
            ...item,
            "quantity":quantity,
            "total":item.price*quantity
        };
       await fetch("http://localhost:8000/carts/"+ item.id,{
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
      <div className="barcode">
            <input type="text" placeholder="Barcode Scanner" style={{width:'85%'}}/>
          </div>
<div className="cart">
{carts.length >0 ? carts.map(item => (
        <div key={item.id} className="cart_item">
           <p>Name : {item.name} - Price : {item.price}</p>
           <p>Quantity : <input type="number" id="quantity" name="quantity" value={item.quantity} onInput={(e)=> changeQuantity(e,item)} style={{width:'10%',borderRadius:'10px'}} /></p>
           <p>Total : {item.total}</p>
           <button onClick={() => { RemoveProduct(item.id) }} className='btn btn-outline-danger' style={{width:'100%',borderRadius:'25px'}}>Remove</button>
        </div>
        )): 
        <div className="cart_item"> 
        <p>Add To CART !!</p>
     </div>}
</div>
<div className="sticky">
  <div className="sticky_item">
<table>
  <tbody>
    <tr>
    <td>SubTotal :</td>
    <td>{subtotal()} GTQ</td>
    <td>{carts.length} Items</td>
    </tr>
    <tr>
      <td>Order Tax :</td>
      {TaxTag ? (
        <td onClick={() => setTaxTag(false)}>{tax} %</td>
      ) : (
        <td><input type="number" autoFocus onBlur={() => setTaxTag(true)} onChange={(e)=>setTax(e.target.value)} style={{width:'40px',height:'30px'}}/>%</td>
      )}
      <td>{(Total()-DiscountResult()).toFixed(2)}GTQ</td>
    </tr>
    <tr>
      <td>Discount :</td>
      {DisTag ? (
        <td onClick={() => setDisTag(false)}>{discount} %</td>
      ) : (
        <td><input type="number" autoFocus onBlur={() => setDisTag(true)} onChange={(e)=>{setDiscount(e.target.value);}} style={{width:'40px',height:'30px'}}/>%</td>
      )}
      <td>{(subtotal()-DiscountResult()).toFixed(2)}GTQ</td>
    </tr>
  </tbody>
</table>
<p style={{textAlign:'center'}}>Total : {Total()} GTQ</p>
<div>
<button className='btn btn-outline-danger' style={{width:'50%'}} onClick={()=>carts.forEach((item)=>RemoveProduct(item.id))}>CANCEL</button>
<button className='btn btn-outline-success' style={{width:'50%'}}>PAYMENT</button></div>
</div></div>
</div> 
    );
  }
export default POS;