import React from "react";

export const PrintCart = React.forwardRef((props, ref) => {
    const {carts, totalAmount,Discount,tax} = props;
    return (
      <div ref={ref} className="p-5">
          <table className='table'>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    { carts ? carts.map((cartProduct) => <tr key={cartProduct.id}>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.total}</td>
                    </tr>)
                    : ''}
                  </tbody>
                </table>
                <p className='px-2'>Discount: {Discount}%</p>
                <p className='px-2'>Tax: {tax}%</p>
                <p className='px-2'>Total Amount: ${totalAmount}</p>
      </div>
    );
});