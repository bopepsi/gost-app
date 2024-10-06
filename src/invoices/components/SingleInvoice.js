import { Box } from '@mui/material';
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteInvoiceButton from './DeleteButton';
import Chip from '@mui/material/Chip';

function SingleInvoice(props) {

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(1)' }}
        >
            •
        </Box>
    );

    // const deleteHandler = () => {
    //     console.log('DELETING')
    // }

    const inv = props.item;

    return (
        <Box  >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', mb: 1, mt: 1 }}>
                        Invoice Date: {new Date(inv.invoice_date).toISOString().slice(0, 10)}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {inv.invoice_ref}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 2, mt: 1 }}>
                        From {new Date(inv.service_date_start).toISOString().slice(0, 10)} To {new Date(inv.service_date_end).toISOString().slice(0, 10)}
                    </Typography>
                    <Typography variant="body1" >

                        <Chip label={"Subtotal: " + USDollar.format(inv.net_total)} sx={{ mr: 2 }} color="success" />
                        <Chip label={"Tax: " + USDollar.format(inv.tax_total)} color="success" variant="outlined" />
                        <br />
                        <Chip label={"Gross total: " + USDollar.format(inv.gross_total)} sx={{ mt: 2 }} color="success" variant="outlined" />
                        {/* {bull} Total: ${inv.gross_total} (in {inv.currency.toLowerCase()}) */}
                        <br />
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        {bull} Filename: {inv.file_name}
                        <br />
                        {bull} Route: {inv.route_name}
                        <br />
                        {bull} Client: {inv.client}
                        <br />
                        {bull} Description: {inv.description}
                        <br />
                    </Typography>
                </CardContent>

                <CardActions sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <DeleteInvoiceButton invoiceRef={inv.invoice_ref} />
                    {/* <Button variant="outlined" color="error" size="small" sx={{ m: 1 }} onClick={deleteHandler}>Delete</Button> */}
                </CardActions>
            </Card>

        </Box>
    )
}

export default SingleInvoice