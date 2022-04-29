import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useFormik } from "formik"
import styled from "./Profile.module.css"
import * as Yup from 'yup';
import { updateUserInfo, getUserInfo, userUpdateReset } from "../../store/actions/index"
import ErrorBox from '../ErrorBox/ErrorBox'
import LoadingBox from '../LoadingBox/LoadingBox'
const ProfilePage = (props) => {
    console.log(props);
    useEffect(() => {
        props.getUserDetailProfile(props.user.userInfo._id);
        // props.userUpdateReset();
    }, [])
    const validate = (values) => {
        const errors = {}
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "the password doesn't match";
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            email: props.user.userInfo.email || "",
            password: "",
            name: props.user.userInfo.name || "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            email: Yup.string("It must be text")
                .email("you enter Invalid email")
                .required("required"),
            password: Yup.string("it must be text and number")
                .max(8, "it must be 8 characters"),
            name: Yup.string("must be a text")
                .max(8, "must be less than 8 characters")
                .trim().min(3, "must be more than 3 characters")
                .required("required"),
            confirmPassword: Yup.string("it must be text and number")
                .max(8, "it must be 8 characters"),
        }),
        validate,
        onSubmit: (values) => {
            props.updateUserProfile(values);
        },
    })
    return (
        <div>
            <form className={styled.from} onSubmit={formik.handleSubmit}>
                <div><h1>profilePage</h1></div>
                {props.user.loadingUser ?
                    <LoadingBox loading={props.user.loadingUser} /> :
                    props.user.error ? <ErrorBox variant="danger">{props.user.error}</ErrorBox>
                        :
                        <>
                            {props.user.loadingUser && <LoadingBox loading={props.user.loadingUser} />}
                            {props.user.error && <ErrorBox variant="danger">{props.user.error}</ErrorBox>}
                            {props.user.success && <ErrorBox variant="success">update successfully</ErrorBox>}
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
                                <button type='submit' className={styled.primary}>Update</button>
                            </div>
                        </>
                }
            </form>
        </div >
    )
}


const mapStateToProps = (state) => ({
    user: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    updateUserProfile: (data) => dispatch(updateUserInfo(data)),
    getUserDetailProfile: (userId) => dispatch(getUserInfo(userId)),
    userUpdateReset: () => dispatch(userUpdateReset())


})

export default connect(mapStateToProps,
    mapDispatchToProps)(ProfilePage)