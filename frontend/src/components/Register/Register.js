import React, { useEffect } from 'react'
import { Link, useNavigate, useMatch, useLocation } from "react-router-dom"
import { useFormik } from "formik"
import { connect, useSelector } from "react-redux"
import * as actionType from "../../store/actions/index"
import * as Yup from 'yup';
import styled from "./Register.module.css"
import LoadingBox from '../LoadingBox/LoadingBox'
import ErrorBox from '../ErrorBox/ErrorBox'

const SignUp = (props) => {
    const location = useLocation();
    const navigation = useNavigate();
    const redirectInUrl = new URLSearchParams(location.search)
        .get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const auth = useSelector(state => state.auth);
    const { userInfo } = auth
    const validate = (values) => {
        const errors = {}
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "the password doesn't match";
        }
        return errors;
    }
    useEffect(() => {
        if (userInfo) {
            navigation(redirect);
        }
    }, [])
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            email: Yup.string("It must be text")
                .email("you enter Invalid email")
                .required("required"),
            password: Yup.string("it must be text and number")
                .required("required")
                .max(8, "it must be 8 characters"),
            name: Yup.string("must be a text")
                .max(8, "must be less than 8 characters")
                .trim().min(3, "must be more than 3 characters")
                .required("required"),
            confirmPassword: Yup.string("it must be text and number")
                .required("required")
                .max(8, "it must be 8 characters"),
        }),
        validate,
        onSubmit: (values) => {
            props.getSignUp(values.email, values.password, values.name, values.confirmPassword)
        },

    });
    return (
        <form className={styled.from} onSubmit={formik.handleSubmit}>
            <div>
                <h1>Resister</h1>
            </div>
            {props.auth.error && <ErrorBox variant="danger">{auth.error}</ErrorBox>}
            <div>
                <label htmlFor='name'>User Name</label>
                <input
                    id="name"
                    name='name'
                    type="name"
                    placeholder='Enter your name'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                    <div className={styled.error}>{formik.errors.name}</div>
                ) : null}
            </div>
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
                <label htmlFor='confirmPassword'>Password</label>
                <input
                    id="confirmPassword"
                    name='confirmPassword'
                    type="password"
                    placeholder='Enter your password again'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                    <div className={styled.error}>{formik.errors.confirmPassword}</div>
                ) : null}
            </div>
            <div>
                <button type='submit' className={styled.primary}>Resister</button>
            </div>
            <div>
                <label></label>
                <div>
                    Already have an account? {" "}
                    <Link to="/signing">Sign-In</Link>
                </div>
            </div>
        </form>
    )
}


const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    getSignUp: (email, password, name, confirmPassword) => dispatch(actionType.singUp(email, password, name, confirmPassword)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(SignUp)
