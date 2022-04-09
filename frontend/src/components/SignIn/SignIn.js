import React, { useEffect } from 'react'
import { Link, useNavigate,  useLocation } from "react-router-dom"
import { useFormik } from "formik"
import { connect, useSelector } from "react-redux"
import * as actionType from "../../store/actions/index"
import * as Yup from 'yup';
import styled from "./signIn.module.css"
// import LoadingBox from '../LoadingBox/LoadingBox'
import ErrorBox from '../ErrorBox/ErrorBox'

const SignIn = (props) => {
    const location = useLocation();
    const navigation = useNavigate();
    const redirectInUrl = new URLSearchParams(location.search)
        .get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const auth = useSelector(state => state.auth);
    const { userInfo } = auth
    useEffect(() => {
        if (userInfo) {
            navigation(redirect);
        }
    }, [navigation, redirect, userInfo])
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string("It must be text")
                .email("you enter Invalid email")
                .required("required"),
            password: Yup.string("it must be text and number")
                .required("required")
                .max(8, "it must be 8 characters")
        }),
        onSubmit: (values) => {
            props.getSignIn(values.email, values.password)
        },

    });
    return (
        <form className={styled.from} onSubmit={formik.handleSubmit}>
            <div>
                <h1>SignIn</h1>
            </div>
            {props.auth.error && <ErrorBox variant="danger">{auth.error}</ErrorBox>}
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    id="email"
                    name='email'
                    type="email"
                    placeholder='Enter your email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                    <div className={styled.error}>{formik.errors.email}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    id="password"
                    name='password'
                    type="password"
                    placeholder='Enter your password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                    <div className={styled.error}>{formik.errors.password}</div>
                ) : null}
            </div>
            <div>
                <button type='submit' className={styled.primary}>SignIn</button>
            </div>
            <div>
                <label></label>
                <div>
                    New Customer? {" "}
                    <Link to="/register">Create your account</Link>
                </div>
            </div>

        </form>
    )
}


const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    getSignIn: (email, password) => dispatch(actionType.singIn(email, password)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(SignIn)
