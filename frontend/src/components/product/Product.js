import React from 'react'
import Rating from '../Rating/Ratingg'

const product = (props) => {
    return (
        <div className="card">
            <a href={`/product/${props.product._id}`}>
                <img className="medium" src={props.product.image} alt="product" />
            </a>
            <div className="card-body">
                <a href={`/product/${props.product._id}`}>
                    <h2>{props.product.name}</h2>
                </a>
                <Rating rating={props.product.rating} numReviews={props.product.numReviews}/>
                <div className="price">
                    ${props.product.price}
                </div>
            </div>
        </div>
    )
}

export default product