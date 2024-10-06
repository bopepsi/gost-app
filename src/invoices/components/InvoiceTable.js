import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InvoiceRow from './InvoiceRow';
import { Box } from '@mui/material';

function InvoiceTable(props) {

    return (
        <Box sx={{
            m: 2, height: 'calc(100vh - 240px)', overflowY: 'scroll'
        }}>
            <TableContainer component={Paper}>
                < Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ref</TableCell>
                            <TableCell align="left">Invoice date</TableCell>
                            <TableCell align="left">Service start</TableCell>
                            <TableCell align="left">Service end</TableCell>
                            <TableCell align="right">Net total</TableCell>
                            <TableCell align="right">Tax total</TableCell>
                            <TableCell align="right"> Total</TableCell>
                            {/* <TableCell align="left"> Desc</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.items.map((row) => (
                            <InvoiceRow id={row.id} key={row.ID}
                                invoice_date={new Date(row.invoice_date).toISOString().slice(0, 10)}
                                invoice_ref={row.invoice_ref}
                                service_date_start={new Date(row.service_date_start).toISOString().slice(0, 10)}
                                service_date_end={new Date(row.service_date_end).toISOString().slice(0, 10)}
                                net_total={row.net_total.toFixed(2)} tax_total={row.tax_total.toFixed(2)} gross_total={row.gross_total.toFixed(2)} description={row.description}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </Box >
    );
}//new Date(invoice_date).toISOString().slice(0, 10)

export default InvoiceTable