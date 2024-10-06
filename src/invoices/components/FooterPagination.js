import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

export default function BasicPagination(props) {
    return (
        <Box sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'center',

        }}>
            <Pagination count={10} color="primary" />
        </Box>
    );
}