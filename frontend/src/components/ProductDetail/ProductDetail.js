import React from 'react'
import data from "../../Data"
import styled from "./ProductDetail.module.css"
import { Link, useParams } from "react-router-dom"
import Rating from '../Rating/Ratingg'

import { } from "@material-ui/core"

const ProductDetail = (props) => {
    let productId = useParams();
    let classes = [styled.primary, styled.block]
    const product = data.products
        .find(x => {
            return x._id === productId.id
        })
    if (!product) {
        return <div>Product Not Found</div>
    }
    return (
        <div >
            <Link to="/">Back to results</Link>
            <div className="row top">
                <div className={styled.col_2}>
                    <img className={styled.large} src={product.image} alt={product.name} />
                </div>
                <div className={styled.col_1}>
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}
                            />

                            {/* <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}
                            ></Rating> */}
                        </li>
                        <li>Pirce : ${product.price}</li>
                        <li>
                            Description:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className={styled.col_1}>
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>price</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <span className={styled.success}>In Stock</span>
                                        ) : (
                                            <span className={styled.error}>Unavailable</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className={classes.join(" ")}>Add to Cart</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail