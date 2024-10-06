import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../../shared/context/auth-context';
import SingleInvoice from '../components/SingleInvoice';
import { Box } from '@mui/material';

function Invoice() {

    const { ref } = useParams();
    const auth = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [inv, setInv] = useState({});

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        auth.role && (async () => {
            handleOpen();
            try {
                const response = await fetch(apiUrl + `/api/invoices/${ref}?role=${auth.role}&name=${auth.name}`)
                // const response = await fetch(`http://localhost:5000/api/invoices/${ref}`)
                const responseData = await response.json();

                if (!response.ok) {
                    alert(responseData.message);
                    handleClose();
                    return;
                };
                setInv(responseData);
            } catch (err) {
                alert('Fetching data failed');
                handleClose();
            }
            handleClose();
        })()
    }, [auth, setInv])

    return (
        <Box sx={{ m: 2 }}>
            {/* <div>Invoice{ref}</div> */}
            {/* <SingleInvoice item={inv} ></SingleInvoice> */}
            {inv.invoice_ref &&
                <SingleInvoice item={inv} />
                // <Box  >
                //     <Card sx={{ minWidth: 275 }}>
                //         <CardContent>
                //             <Typography gutterBottom sx={{ color: 'text.secondary', mb: 1 }}>
                //                 Invoice Date: {new Date(inv.invoice_date).toISOString().slice(0, 10)}
                //             </Typography>
                //             <Typography variant="h5" component="div">
                //                 {inv.invoice_ref}
                //             </Typography>
                //             <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>
                //                 From {new Date(inv.service_date_start).toISOString().slice(0, 10)} To {new Date(inv.service_date_end).toISOString().slice(0, 10)}
                //             </Typography>
                //             <Typography variant="body2">
                //                 well meaning and kindly.
                //                 <br />
                //                 {'"a benevolent smile"'}
                //             </Typography>
                //         </CardContent>
                //         <CardActions sx={{
                //             display: "flex",
                //             justifyContent: "flex-end",
                //         }}>
                //             <Button variant="outlined" color="error" size="small" sx={{ m: 1 }} >Delete</Button>
                //         </CardActions>
                //     </Card>
                // </Box>
            }
            {open && <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
        </Box>
    )
}

export default Invoice