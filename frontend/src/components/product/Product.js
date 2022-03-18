import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Ratingg'

const product = (props) => {
    return (
        <div key={props.product._id} className="card">
            <Link to={`/product/${props.product._id}`}>
                <img className="medium" src={props.product.image} alt="product" />
            </Link>
            <div className="card-body">
                <Link to={`/product/${props.product._id}`}>
                    <h2>{props.product.name}</h2>
                </Link>
                <Rating rating={props.product.rating} numReviews={props.product.numReviews} />
                <div className="price">
                    ${props.product.price}
                </div>
            </div>
        </div>
    )
}

export default product