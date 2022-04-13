import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckOutStep from '../CheckOutStep/CheckOutStep'
import styled from "./placeOrder.module.css"
import ErrorBox from "../ErrorBox/ErrorBox"
import { createOrder, orderResat } from "../../store/actions/index"
import LoadingButton from "../LoadingButton/LoadingButton"


const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.order);
    const { loading, error, success, order } = orderCreate
    let classes = [styled.primary, styled.block].join(" ")
    const toPrice = (num) => Number(num.toFixed(2))
    cart.ItemPrice = toPrice(
        cart.carts.reduce((a, c) => a + c.qty * c.price, 0)
    )
    cart.shippingPrice = cart.ItemPrice > 100 ? toPrice(0) : toPrice(10)
    cart.taxPrice = toPrice(0.15 * cart.ItemPrice);
    cart.totalPrice = cart.ItemPrice + cart.shippingPrice + cart.taxPrice;
    const placeOrderHandler = () => {
        dispatch(createOrder({
            ...cart,
        }));
    }
    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/payment")
        }
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch(orderResat())
        }
    }, [success])
    return (
        <div>
            <CheckOutStep step1 step2 step3 step4></CheckOutStep>
            <div className='row top'>
                <div className={styled.col_2}>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                                    ,{cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cart.carts.map(item => {
                                            return (
                                                <li key={item._id}>
                                                    <div className='row'>
                                                        <div>
                                                            <img
                                                                className="small"
                                                                src={item.image}
                                                                alt={item.name}
                                                            />
                                                        </div>
                                                        <div className={styled.min_30}>
                                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                        </div>

                                                        <div>
                                                            {item.qty} x  ${item.price} = ${item.qty * item.price}
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styled.col_1}>
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.ItemPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {loading === false ? (<button
                                    className={classes}
                                    type="submit"
                                    onClick={placeOrderHandler}
                                    disabled={cart.carts.length === 0}
                                >
                                    Place Order
                                </button>) : (
                                    <LoadingButton />
                                )}
                            </li>
                            {error && <ErrorBox variant="danger">{error}</ErrorBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder