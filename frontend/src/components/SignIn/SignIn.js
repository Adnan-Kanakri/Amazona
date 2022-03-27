import React from 'react'
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from 'yup';
import styled from "./signIn.module.css"

const SignIn = () => {
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

        },

    });
    return (
        <form className={styled.from} onSubmit={formik.handleSubmit}>
            <div>
                <h1>SignIn</h1>
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

export default SignIn