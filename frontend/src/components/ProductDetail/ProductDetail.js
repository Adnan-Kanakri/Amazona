import React, { useEffect, useState } from 'react'
import styled from "./ProductDetail.module.css"
import { Link, useParams, useNavigate } from "react-router-dom"
import Rating from '../Rating/Ratingg'
// import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from './../LoadingBox/LoadingBox';
import ErrorBox from './../ErrorBox/ErrorBox';
// import { ProductDetails } from "../../store/actions/index"

import { connect } from "react-redux";
import * as actionType from "../../store/actions/index"


const ProductDetail = (props) => {
    let productId = useParams().id;
    const [qty, setQty] = useState(1)
    const history = useNavigate();

    let classes = [styled.primary, styled.block]
    useEffect(() => {
        props.getDetailsProduct(productId);
        console.log(props.prod)
    }, [])


    const addTOCartHandler = () => {
        history(`/cart/${productId}?qty=${qty}`);
    }



    return (
        <div>
            {props.prod.loading ? <LoadingBox loading={props.prod.loading} />
                : props.prod.error ? <ErrorBox variant="danger">{props.prod.error}</ErrorBox> :
                    <div >
                        <Link to="/">Back to results</Link>
                        <div className="row top">
                            <div className={styled.col_2}>
                                <img className={styled.large} src={props.prod.product.image} alt={props.prod.product.name} />
                            </div>
                            <div className={styled.col_1}>
                                <ul>
                                    <li>
                                        <h1>{props.prod.product.name}</h1>
                                    </li>
                                    <li>
                                        <Rating
                                            rating={props.prod.product.rating}
                                            numReviews={props.prod.product.numReviews}
                                        />
                                    </li>
                                    <li>Pirce : ${props.prod.product.price}</li>
                                    <li>
                                        Description:
                                        <p>{props.prod.product.description}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className={styled.col_1}>
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>price</div>
                                                <div className="price">${props.prod.product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status</div>
                                                <div>
                                                    {props.prod.product.countInStock > 0 ? (
                                                        <span className={styled.success}>In Stock</span>
                                                    ) : (
                                                        <span className={styled.error}>Unavailable</span>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                        {
                                            props.prod.product.countInStock > 0 && (
                                                <>
                                                    <li>
                                                        <div className='row'>
                                                            <div>QTY</div>
                                                            <div>
                                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                    {
                                                                        [...Array(props.prod.product.countInStock).keys()].map(x => (
                                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={addTOCartHandler}
                                                            className={classes.join(" ")}
                                                        >Add to Cart</button>
                                                    </li>
                                                </>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>

    )
}

const mapStateToProps = (state) => ({
    prod: state.product
})

const mapDispatchToProps = dispatch => ({
    getDetailsProduct: (product_id) => dispatch(actionType.ProductDetails(product_id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ProductDetail)