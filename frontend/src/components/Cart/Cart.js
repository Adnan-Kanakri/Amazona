import React, { useEffect } from 'react'
import { useParams, useLocation, Link, useNavigate } from "react-router-dom"
import { connect, useSelector } from "react-redux";
import styled from "./Cart.module.css"
import * as actionType from "../../store/actions/index"
import ErrorBox from '../ErrorBox/ErrorBox';


const Cart = (props) => {
    const product_id = useParams("id").id;
    const Location = useLocation();
    const history = useNavigate()
    let classes = [styled.primary, styled.block].join(" ")
    const qty = Location.search ? Number(Location.search.split("=")[1]) : 1;
    const cart = useSelector(state => state.cart);
    const { carts } = cart

    useEffect(() => {
        if (product_id) {
            props.addProductToCart(product_id, qty);
            // console.log(props)
        }
    }, [])
    const removeCartHandler = (productId) => {
        props.deleteFromCart(productId);
    }

    const checkOutHandler = () => {
        history("/signup?redirect=shopping")
    }

    return (
        <div className='row top'>
            <div className={styled.col_2}>
                <h1>Shopping Cart</h1>
                {
                    carts.length === 0 ? <ErrorBox>
                        Cart is Empty. <Link to="/">Go Shopping</Link>
                    </ErrorBox> : (
                        <ul>
                            {
                                carts.map(item => {
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
                                                <div className='min-30'>
                                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    <select
                                                        value={item.qty}
                                                        onChange={
                                                            (e) => {
                                                                return props.addProductToCart(item._id, Number(e.target.value))
                                                            }
                                                        }>
                                                        {
                                                            [...Array(item.countInStock).keys()]
                                                                .map(x => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                ))
                                                        }
                                                    </select>
                                                </div>
                                                <div>
                                                    ${item.price}
                                                </div>
                                                <div>
                                                    <button type='button' onClick={() => {
                                                        
                                                        removeCartHandler(item._id)
                                                    }}>DELETE</button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>
            <div>
                <div className={styled.col_1}>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>
                                    SubTotal({
                                        carts.reduce((a, c) => a + c.qty, 0)} items) : $
                                    {carts.reduce((a, c) => a + c.price * c.qty, 0)}
                                </h2>
                            </li>
                            <li>
                                <button
                                    type='button'
                                    onClick={checkOutHandler}
                                    className={classes}
                                    disabled={carts.length === 0}
                                >
                                    process to checkOut
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}


const mapStateToProps = (state) => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    addProductToCart: (product_id, qty) => dispatch(actionType.addToCart(product_id, qty)),
    deleteFromCart: (product_id) => dispatch(actionType.removeFromCart(product_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Cart)