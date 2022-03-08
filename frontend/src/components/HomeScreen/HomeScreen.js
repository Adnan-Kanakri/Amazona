import React, { useEffect, useState } from 'react'
import Product from '../product/Product';
import LoadingBox from '../LoadingBox/LoadingBox';
import ErrorBox from '../ErrorBox/ErrorBox';

// import Rating from '../Rating/Rating';
import axios from "axios"

const HomeScreen = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await axios.get("/api/products");
                const product = data.data.data;
                setLoading(false);
                setProducts(product.products);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }

        };
        fetchData();
    }, [])

    return (
        <div>
            {loading ? <LoadingBox loading={loading} />
                : error ? <ErrorBox variant="danger">{error}</ErrorBox> :
                    <div className="row center">
                        {
                            products.map(product =>
                            (<Product
                                key={product._id}
                                product={product}
                            />)
                            )
                        }
                    </div>
            }
        </div>
    )
}

export default HomeScreen