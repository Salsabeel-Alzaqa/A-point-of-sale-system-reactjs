import { useState,useEffect } from "react";
const POS = () => {
    const [carts, setCarts] = useState([]);
    const [tax, setTax] = useState();
    useEffect(() => {
        fetch("http://localhost:8000/carts").then((res) => {
            return res.json();
        }).then((resp) => {
            setCarts(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [carts])  
    const [quantity, setQuantity] = useState("1");
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
<div>
<div className="search">
            <input type="text" id="search" placeholder=" Search" />
          </div>
<div> 
    <table>
      <thead>
        <tr>     
          <th >Name</th>
          <th>price</th>
          <th>quantity</th>
          <th>total</th>
        </tr>
      </thead>
      <tbody>
      {carts && carts.map(item => (
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
           <td><input type="number" id="quantity" name="quantity" value={item.quantity} onChange={(e)=> changeQuantity(e,item)} /></td>
           <td>{item.total}</td>
        </tr>
        ))}
      </tbody>
    </table>      
</div>
<div className="sticky">
<p>SubTotal:{summ()}</p>
</div>
</div> 
    );
  }
export default POS;