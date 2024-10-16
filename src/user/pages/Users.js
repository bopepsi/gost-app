import React, { useContext, useEffect, useState } from 'react'
import BasicTable from '../components/UsersTable'
import Home from '../../shared/pages/Home';
import { AuthContext } from '../../shared/context/auth-context';
import Typography from '@mui/material/Typography';
import { Backdrop, Divider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Users() {

    const [open, setOpen] = React.useState(false);
    const Auth = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        (Auth.role) && (async () => {
            handleOpen();
            try {
                const response = await fetch(apiUrl + '/api/auth/allusers', {
                    method: 'post',
                    headers: {
                        "content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        role: Auth.role
                    })
                });

                const responseData = await response.json();

                if (!response.ok) {
                    alert(responseData.message);
                    handleClose();
                    return;
                }
                setUsers(responseData);
            } catch (err) {
                alert('Login failed');
                handleClose();
            }
            handleClose();
        })()
    }, [Auth, setUsers])

    return (
        //<UserList items={USERS} />
        <>
            {Auth.role === 'admin' ?
                <BasicTable items={users} /> : <Home />}
            <Divider />
            <Typography variant="h5" component="div"
                sx={{ color: 'text.secondary', fontSize: 14, mr: 3, mt: 1, display: 'flex', justifyContent: 'flex-end', fontStyle: 'italic' }}>
                {"All vendors"}
            </Typography>
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



export default Users