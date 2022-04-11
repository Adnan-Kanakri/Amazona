import React from 'react'
import { useNavigate } from "react-router-dom"
import CheckOutStep from '../CheckOutStep/CheckOutStep'
import { useFormik } from "formik"
import * as Yup from 'yup';
import styled from "./Shipping.module.css"
import { connect, useSelector } from 'react-redux';
import * as actionType from '../../store/actions/index'

const ShippingAddress = (props) => {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const { userInfo } = auth
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart
    if (!userInfo) {
        navigate("/signing")
    }
    // const validate = (values) => {
    //     const errors = {}
    //     if (values.password !== values.confirmPassword) {
    //         errors.confirmPassword = "the password doesn't match";
    //     }
    //     return errors;
    // }
    const formik = useFormik({
        initialValues: {
            fullName: shippingAddress.fullName || ' ',
            address: shippingAddress.address || ' ',
            city: shippingAddress.city || ' ',
            postalCode: shippingAddress.postalCode || ' ' ,
            country: shippingAddress.country || ' ',
        },
        validationSchema: Yup.object({
            fullName: Yup.string("must be a text")
                .max(8, "must be less than 8 characters")
                .trim().min(3, "must be more than 3 characters")
                .required("required"),
            address: Yup.string("must be a text")
                .max(8, "must be less than 8 characters")
                .trim().min(3, "must be more than 3 characters")
                .required("required"),
            city: Yup.string("must be a text")
                .max(8, "must be less than 8 characters")
                .trim().min(3, "must be more than 3 characters")
                .required("required"),
            postalCode: Yup.number("it mus be number")
                .min(6, "must be more than 6 numbers")
                .required("required"),
            country: Yup.string("must be a text")
                .max(8, "must be less than 8 characters")
                .trim().min(3, "must be more than 3 characters")
                .required("required"),
        }),
        onSubmit: (values) => {
            props.saveShipping(values);
            navigate('/payment');
        }
        // validate
    })
    return (
        <div>
            <CheckOutStep step1 step2></CheckOutStep>
            <form className={styled.from} onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        id="fullName"
                        name='fullName'
                        type="fullName"
                        placeholder='Enter your full Name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                    />
                    {formik.errors.fullName && formik.touched.fullName ? (
                        <div className={styled.error}>{formik.errors.fullName}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor='fullName'>Address</label>
                    <input
                        id="address"
                        name='address'
                        type="address"
                        placeholder='Enter your Address'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                    />
                    {formik.errors.address && formik.touched.address ? (
                        <div className={styled.error}>{formik.errors.address}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor='City'>City</label>
                    <input
                        id="city"
                        name='city'
                        type="city"
                        placeholder='Enter your City'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                    />
                    {formik.errors.city && formik.touched.city ? (
                        <div className={styled.error}>{formik.errors.city}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input
                        id="postalCode"
                        name='postalCode'
                        type="postalCode"
                        placeholder='Enter your Postal Code'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.postalCode}
                    />
                    {formik.errors.postalCode && formik.touched.postalCode ? (
                        <div className={styled.error}>{formik.errors.postalCode}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input
                        id="country"
                        name='country'
                        type="country"
                        placeholder='Enter your country'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                    />
                    {formik.errors.country && formik.touched.country ? (
                        <div className={styled.error}>{formik.errors.country}</div>
                    ) : null}
                </div>
                <div>
                    <button type='submit' className={styled.primary}>Continue</button>
                </div>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    saveShipping: (values) => dispatch(actionType.saveShippingAddress(values))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ShippingAddress)

