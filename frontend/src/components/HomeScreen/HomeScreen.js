import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux"
import Product from '../product/Product';
import LoadingBox from '../LoadingBox/LoadingBox';
import ErrorBox from '../ErrorBox/ErrorBox';
import { connect } from "react-redux";
import * as actionType from "../../store/actions/index"


const HomeScreen = (props) => {
    // const dispatch = useDispatch();
    // const productList = useSelector(state => state.product)
    // const { products, loading } = productList;

    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // dispatch(actionType.fetchProduct())
                console.log(props)
                await props.getListProduct();
            } catch (err) {
                setError(err.message);
                props.prod.loading = false
            }
        };
        fetchData();
    },[])

    return (
        <div>
            {props.prod.loading ? <LoadingBox loading={props.prod.loading} />
                : error ? <ErrorBox variant="danger">{error}</ErrorBox> :
                    <div className="row center">
                        {
                            props.prod.products.map(product =>
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

const mapStateToProps = (state) => ({
    prod: state.product
})

const mapDispatchToProps = dispatch => ({
    getListProduct: () => dispatch(actionType.fetchProduct()),
});




export default connect(
    mapStateToProps,
    mapDispatchToProps)(HomeScreen)