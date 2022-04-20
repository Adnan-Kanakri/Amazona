import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import LoadingBox from "../LoadingBox/LoadingBox"
import ErrorBox from "../ErrorBox/ErrorBox"
import * as actionType from "../../store/actions/index"
import styled from "./OrderHistory.module.css"
import Table from "../TableList/TableList"
import { getOrderListDetail } from "../../store/actions/index"

const OrderHistory = (props) => {
    // const orderList = useSelector(state => state.order);
    // const { loading, error, ordersRequest } = orderList
    // const dispatch = useDispatch()
    // console.log(props.getListProduct());
    // const fetchData = async () => {
    //     // dispatch(actionType.fetchProduct())
    //     console.log(await props.getListProduct());
    // };
    // fetchData();

    useEffect(() => {
        const fetchData = async () => {
            // dispatch(actionType.fetchProduct())
            await props.getListProduct();
        };
        fetchData();
    }, [])

    console.log(props)
    return props.order.loading ? (<LoadingBox loading={props.order.loading} />) :
        props.order.error ? (<ErrorBox variant="danger">{props.order.error}</ErrorBox>) :
            (
                <div>
                    <h1>Order History</h1>
                    <Table orderInfo={props.order.ordersRequest} />
                </div>
            )
}

const mapStateToProps = (state) => ({
    order: state.order
})

const mapDispatchToProps = dispatch => ({
    getListProduct: () => dispatch(actionType.getOrderListDetail()),
});




export default connect(
    mapStateToProps,
    mapDispatchToProps)(OrderHistory)