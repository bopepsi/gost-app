import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserTableRow from './UserTableRow';
import { Box } from '@mui/material';

export default function BasicTable(props) {
    return (
        <Box sx={{
            m: 2, height: 'calc(100vh - 240px)', overflowY: 'scroll'
        }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendors</TableCell>
                            <TableCell align="left">id</TableCell>
                            <TableCell align="left">username</TableCell>
                            <TableCell align="left">password</TableCell>
                            <TableCell align="right">role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.items.map((row) => (
                            <UserTableRow id={row.id} key={row.id} name={row.name} username={row.username} password={row.password} role={row.role} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}