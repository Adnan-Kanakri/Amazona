import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckOutStep from '../CheckOutStep/CheckOutStep'
import styled from "./payment.module.css"
import { savePaymentMethod } from "../../store/actions/index"
import { useNavigate } from 'react-router-dom';

const PaymentMethod = () => {
    const navigate = useNavigate();
    const [payment, setPayment] = useState("");
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart
    const dispatch = useDispatch();
    useEffect(() => {
        if (shippingAddress.length === 0) {
            navigate("/signing");
        }
    }, [])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(payment));
        navigate("/place-order");
    }
    return (
        <div>
            <CheckOutStep step1 step2 step3></CheckOutStep>
            <form className={styled.from} onSubmit={submitHandler}>
                <div >
                    <h1>
                        Payment
                    </h1>
                </div>
                <div>
                    <div>
                        <input type="radio"
                            id="paypal"
                            name='payment'
                            value="PayPal"
                            required
                            onChange={e => setPayment(e.target.value)}
                        />
                        <label htmlFor='paypal'>Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio"
                            id="stripe"
                            name='payment'
                            value="Stripe"
                            required
                            onChange={e => setPayment(e.target.value)}
                        />
                        <label htmlFor='stripe'>Stripe</label>
                    </div>
                </div>

                <div>
                    <button type='submit' className={styled.primary}>Continue</button>
                </div>
            </form>

        </div>
    )
}

export default PaymentMethod
