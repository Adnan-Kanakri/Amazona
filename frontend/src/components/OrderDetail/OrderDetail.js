import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingBox from '../LoadingBox/LoadingBox'
import styled from "./Order.module.css"
import { getOrderDetail } from "../../store/actions/index"
import ErrorBox from '../ErrorBox/ErrorBox'

const OrderDetail = () => {
    const id = useParams().id;
    const orderCreate = useSelector(state => state.order);
    const { loadingOrder, error, order } = orderCreate
    console.log(orderCreate)
    // const navigate = useNavigate();
    // let classes = [styled.primary, styled.block].join(" ")
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("test order")
        dispatch(getOrderDetail(id));
    }, [])
    return (
        loadingOrder ? <LoadingBox loading={loadingOrder} /> :
            (<div>
                <h1>Order Detail</h1>
                <div className='row top'>
                    <div className={styled.col_2}>
                        <ul>
                            <li>
                                <div className='card card-body'>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                        <strong>Address: </strong> {order.shippingAddress.address},
                                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                        ,{order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? <ErrorBox variant="success">Delivered at {order.deliveredAt}</ErrorBox>
                                        :
                                        <ErrorBox variant="danger">Not Delivered</ErrorBox>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className='card card-body'>
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method: </strong>{order.paymentMethod}
                                    </p>
                                    {order.isPaid ? <ErrorBox variant="success">Delivered at {order.paidAt}</ErrorBox>
                                        :
                                        <ErrorBox variant="danger">Not Paid</ErrorBox>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className='card card-body'>
                                    <h2>Order Items</h2>
                                    <ul>
                                        {
                                            order.orderItems.map(item => {
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
                                        <div>${order.itemsPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Shipping</div>
                                        <div>${order.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>${order.taxPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>
                                            <strong> Order Total</strong>
                                        </div>
                                        <div>
                                            <strong>${order.totalPrice.toFixed(2)}</strong>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>)
    )
}

export default OrderDetail