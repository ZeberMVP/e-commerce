import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart, decreaseQuantity, increaseQuantity, decreaseSize, increaseSize } from "../../../redux";


const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cartItems);
    useSelector(state => state.numberItems);

    let TotalCart = 0;
    items.forEach(item => {
        TotalCart += item.quantity * item.price;
    });

    return (
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => {
                    return (
                        <tr key={i} i={i}>
                            <td><button style={{ cursor: "pointer" }} onClick={() => {
                                dispatch(deleteCart(i))
                            }}>X</button></td>
                            <td>{item.product_name}</td>
                            <td><img src={item.image} alt={item.product_name} style={{ width: '100px', height: '80px' }} /></td>
                            <td>{item.price} $</td>
                            <td>
                                <button style={{ margin: '2px', cursor: "pointer" }} onClick={() => {
                                    dispatch(decreaseSize(i))
                                }}>-</button>
                                <span>{item.size}</span>
                                <button style={{ margin: '2px', cursor: "pointer" }} onClick={() => {
                                    dispatch(increaseSize(i))
                                }}>+</button>
                            </td>
                            <td>
                                <button style={{ margin: '2px', cursor: "pointer" }} onClick={() => {
                                    dispatch(decreaseQuantity(i))
                                }}>-</button>
                                <span>{item.quantity}</span>
                                <button style={{ margin: '2px', cursor: "pointer" }} onClick={() => {
                                    dispatch(increaseQuantity(i))
                                }}>+</button>
                            </td>
                            <td><b>{item.price * item.quantity} $</b></td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan="6" style={{ textAlign: 'right' }}>Total Price:</td>
                    <td><b>{TotalCart} $</b></td>
                </tr>
            </tbody>
        </table>
    )
}



export default Cart