import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom'

function InvoiceRow(row) {

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    
    return (
        <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, m: 1 }}
        >

            <TableCell align="left" width={'15%'} style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>{row.vendor_name.toUpperCase()}</TableCell>
            <TableCell component="th" scope="row" width={'15%'}>
                <Link to={`/invoices/${row.inv_id}`}>
                    {row.invoice_ref}
                </Link>
            </TableCell>

            <TableCell align="left" width={'10%'}>{row.invoice_date}</TableCell>
            <TableCell align="left" width={'10%'}>{row.service_date_start}</TableCell>
            <TableCell align="left" width={'10%'}>{row.service_date_end}</TableCell>
            <TableCell align="right" width={'9%'}>{USDollar.format(row.net_total)}</TableCell>
            <TableCell align="right" width={'9%'}>{USDollar.format(row.tax_total)}</TableCell>
            <TableCell align="right" width={'9%'}>{USDollar.format(row.gross_total)}</TableCell>
            {/* <TableCell align="left" sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }}>{row.description}</TableCell> */}



        </TableRow>
    )
}

export default InvoiceRow