import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

function DeleteInvoiceButton({ invoiceRef, onDeleteSuccess }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const Auth = useContext(AuthContext);
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const deleteInvoice = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this invoice?');
        if (!confirmed) return;

        console.log(invoiceRef)

        setIsDeleting(true); // Set loading state

        try {
            const response = await fetch(apiUrl + `/api/invoices/delete/${invoiceRef}?role=${Auth.role}&name=${Auth.name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + Auth.token
                },
            });

            const responseData = await response.json();

            if (!response.ok) {
                alert(responseData.message || 'Failed to delete invoice');
                setIsDeleting(false);
                return;
            }
            // Call the success callback, if provided
            if (onDeleteSuccess) {
                onDeleteSuccess(invoiceRef);
            }
            alert('Invoice deleted successfully');
            navigate('/invoices');
            return;
        } catch (error) {
            alert('An error occurred while deleting the invoice');
        } finally {
            setIsDeleting(false); // Reset loading state
        }
        return;
    };

    return (
        <Button variant="outlined" color="error" size="small" sx={{ m: 1 }} onClick={deleteInvoice} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Invoice'}
        </Button>
        // <button onClick={deleteInvoice} disabled={isDeleting}>
        //     {isDeleting ? 'Deleting...' : 'Delete Invoice'}
        // </button>
    );
}

export default DeleteInvoiceButton;
