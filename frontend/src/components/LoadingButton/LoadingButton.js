import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import styled from "./Loading.module.css"
export default function LoadingButtons() {
    return (
        <LoadingButton
            loading
            className={styled.primary}
            loadingPosition="center"
            startIcon={<SaveIcon />}
            variant="outlined"
        >
            Place Order
        </LoadingButton>
    );
}
