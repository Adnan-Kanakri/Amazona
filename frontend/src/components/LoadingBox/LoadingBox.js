import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import styled from "./LoadingBox.module.css"


const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
    },
    media: {
        height: 250,
    },
}));

function Media(props) {
    const { loading = false } = props;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            {loading ? (
                <Skeleton animation="wave" variant="rect" className={classes.media} />
            ) : null}

            <CardContent className={styled.card}>
                {loading ? (
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                ) : (
                    <Typography variant="body2" color="textSecondary" component="p">
                        {
                            "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
                        }
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};

const LoadingBox = (props) => {
    return (
        <div className={styled.row}>
            <Media loading={props.loading} />
            <Media loading={props.loading} />
            <Media loading={props.loading} />
            <Media loading={props.loading} />
            <Media loading={props.loading} />
            <Media loading={props.loading} />
        </div>
    );
}


export default LoadingBox