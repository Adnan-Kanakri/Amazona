import React from 'react'
import data from "../../Data"
import Product from '../product/Product';
import Rating from '../Rating/Rating';

const HomeScreen = (props) => {

   

    return (
        <div>
            <div className="row center">
                {
                    data.products.map(product =>
                        <Product
                            key={product._id}
                            product={product}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default HomeScreen