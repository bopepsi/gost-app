import React, { useContext, useEffect, useState } from 'react'
import InvoiceTable from '../components/InvoiceTable'
import { AuthContext } from '../../shared/context/auth-context';
import { Backdrop, Divider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function AllInvoices() {

    const Auth = useContext(AuthContext);
    const [invoices, setInvoices] = useState([]);
    const [open, setOpen] = React.useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        Auth.role && (async () => {
            handleOpen();
            try {
                const response = await fetch(apiUrl + '/api/invoices/all', {
                    method: 'post',
                    headers: {
                        "content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        role: Auth.role,
                        name: Auth.name
                    })
                })
                const responseData = await response.json();
                if (!response.ok) {
                    alert(responseData.message);
                    handleClose();
                    return;
                };
                setInvoices(responseData);
            } catch (err) {
                alert('Fetching data failed');
                handleClose();
                return;
            }
            handleClose();
        })()
    }, [Auth, setInvoices])

    return (
        <>
            <InvoiceTable sx={{ m: 2 }} items={invoices} />
            <Divider />
            <Typography variant="h5" component="div"
                sx={{ color: 'text.secondary', fontSize: 14, mr: 3, mt: 1, display: 'flex', justifyContent: 'flex-end', fontStyle: 'italic' }}>
                {"Latest 20 invoices"}
            </Typography>
            {/* <FooterPagination /> */}
            {/* <FooterPagination items={maxPage} /> */}
            {open && <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
        </>

    )

}



export default AllInvoices