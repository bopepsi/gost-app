import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom'


function UserTableRow(row) {
    return (
        <TableRow

            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <Link to={`/${row.name}/invoices`}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
            </Link>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.username}</TableCell>
            <TableCell align="left">{row.password}</TableCell>
            <TableCell align="right">{row.role}</TableCell>
        </TableRow>
    )
}

export default UserTableRow