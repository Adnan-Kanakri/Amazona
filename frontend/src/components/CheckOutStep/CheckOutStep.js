import React from 'react'
import styled from "./CheckOut.module.css"

function CheckOutStep(props) {
    const classes = ["row", styled['checkOut-steps']]
    return (
        <div className={classes.join(" ")}>
            <div className={props.step1 ? styled.active : ""}>Sign-In</div>
            <div className={props.step2 ? styled.active : ""}>Shipping</div>
            <div className={props.step3 ? styled.active : ""}>Payment</div>
            <div className={props.step4 ? styled.active : ""}>Place Order</div>
        </div>
    )
}

export default CheckOutStep