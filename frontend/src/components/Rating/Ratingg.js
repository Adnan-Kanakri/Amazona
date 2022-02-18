import React from 'react';
import Rating1 from '@material-ui/lab/Rating';


const Rating = (props) => {
    // const [value, setValue] = React.useState(2);
    return (
        <div>
            {/* <Rating1
                name="simple-controlled"
                value={props.rating}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            /> */}


            <Rating1 name="read-only" value={props.rating} readOnly />
            <span>{
                props.numReviews
            } reviews</span>
        </div>
    );
}

export default Rating
