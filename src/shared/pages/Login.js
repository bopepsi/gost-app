import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { Button, Input } from '@mui/material';
import Box from '@mui/material/Box';

const Login = () => {

    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(apiUrl + '/api/auth/login', {
                method: 'post',
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email, password: password
                })
            })
            const responseData = await response.json();

            if (!response.ok) {
                alert(responseData.message);
                return;
            }
            // console.log('...................')
            // console.log(responseData);
            auth.login(responseData.user, responseData.role, responseData.token);
            navigate('/invoices');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh', // Full viewport height
            // backgroundColor: '#f5f5f5' // Optional: Light background color
        }}>
            <form onSubmit={handleLogin} style={{ width: '300px' }}> {/* Optional: Set a width for the form */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column', // Stack inputs vertically
                    mt: 3,
                    p: 1
                }}>
                    <Input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }} // Optional: Add some margin at the bottom
                    />
                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }} // Optional: Add some margin at the bottom
                    />
                </Box>
                {/* Centering the button */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2 // Optional: Add some margin on top of the button
                }}>
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                </Box>
            </form>
        </Box>
    );
};

export default Login;
