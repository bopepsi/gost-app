import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Box from '@mui/material/Box';

export default function BasicMenu(token, user) {
    const Auth = React.useContext(AuthContext)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        navigate('/login')
    };

    const handleLogout = () => {
        Auth.logout()
        // Redirect to login page
        navigate('/');
    };

    const handleDashboardClick = () => {
        navigate('/invoices');
    }

    const addInvoiceClickHandler = () => {
        navigate('/invoices/new');
    }

    const allVendorsClickHandler = () => {
        navigate('/admin/vendors')
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: 2
            }}>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleDashboardClick}
                >
                    Invoices
                </Button>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    {Auth.role === 'admin' && <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={allVendorsClickHandler}
                    >
                        Vendors
                    </Button>
                    }
                    {!Auth.isLoggedIn &&
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Login
                        </Button>}
                    {Auth.isLoggedIn && <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={addInvoiceClickHandler}
                    >
                        Add Invoice
                    </Button>
                    }
                    {Auth.isLoggedIn && <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    }
                </Box>
            </Box>




        </div >
    );
}