import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom"

export default function DataTable(props) {

    const history = useNavigate();
    const styled = {
        width: "100%",
        fontSize: "1.6rem",
    }

    function renderButton(params) {
        return <button type='button' className='small'
            onClick={(event) => {
                console.log(params.id)
                history(`/order/${params.id}`);
            }}
        >
            Details
        </button>
    }


    const myColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'DATE', headerName: 'DATE', width: 130 },
        { field: 'TOTAL', headerName: 'TOTAL', width: 130 },
        { field: 'PAID', headerName: 'PAID', width: 130 },
        { field: 'DELIVERY', headerName: 'DELIVERY', width: 130 },
        {
            field: 'ACTION',
            renderCell: renderButton,
            editable: true,
        },
    ]



    console.log(props)
    const rows = props.orderInfo.map(item => {
        return {
            id: item._id,
            DATE: item.createdAt.substring(0, 10),
            TOTAL: item.totalPrice,
            PAID: item.isPaid ? item.paidAt.substring(0, 10) : "NO",
            DELIVERY: item.isDelivered ? item.deliveredAt.substring(0, 10) : "NO",
            ACTION: item._id,
        }
    })

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={myColumns}
                style={styled}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}

            // checkboxSelection
            />
        </div>
    );
}
