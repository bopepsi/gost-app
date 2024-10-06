import React, { useContext, useState } from 'react'

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Button, Divider } from '@mui/material';
import { AuthContext } from '../../shared/context/auth-context';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const NewInvoice = () => {

  const navigate = useNavigate();

  const [invoice_ref, setInvoiceRef] = useState("");
  const [invoice_date, setInvoiceDate] = useState(null);
  const [service_date_start, setSDS] = useState(null);
  const [service_date_end, setSDE] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [filename, setFilename] = useState("");
  const [routename, setRoutename] = useState("");
  const [desc, setDesc] = useState("");
  const [client, setClient] = useState("");
  const [currency, setCurrency] = useState("CAD");

  const [open, setOpen] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const currencyOnChangeHandler = (event) => {
    setCurrency(event.target.value);
  };

  const Auth = useContext(AuthContext);

  const invoiceRefOnChangeHandler = (e) => {
    setInvoiceRef(e.target.value);
  }

  const filenameOnChangeHandler = (e) => {
    setFilename(e.target.value);
  }

  const subtotalOnChangeHandler = (e) => {
    const subtotal = e.target.value;
    setSubtotal(subtotal);
    const total = Number(subtotal) + Number(tax);
    setTotal(total.toFixed(2));
  }

  const taxOnChangeHandler = (e) => {
    const tax = e.target.value;
    setTax(tax);
    const total = Number(subtotal) + Number(tax);
    setTotal(total.toFixed(2));
  }

  const totalOnChangeHandler = (e) => {
    setTotal(e.target.value);
  }

  const routenameOnChangeHandler = (e) => {
    setRoutename(e.target.value);
  }

  const clientOnChangeHandler = (e) => {
    setClient(e.target.value);
  }

  const descOnChangeHandler = (e) => {
    setDesc(e.target.value);
  }

  // vendor_name, invoice_ref, invoice_date, service_date_start, service_date_end,
  // currency, net_total, tax_total, gross_total, file_name, route_name, description, client
  const addInvoiceHandler = async (e) => {

    handleOpen();
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + '/api/invoices/create', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + Auth.token
        },
        body: JSON.stringify({
          vendor_name: Auth.name,
          invoice_ref: invoice_ref,
          invoice_date: new Date(invoice_date).toISOString().slice(0, 10),
          service_date_start: new Date(service_date_start).toISOString().slice(0, 10),
          service_date_end: new Date(service_date_end).toISOString().slice(0, 10),
          currency: currency.toLowerCase(),
          net_total: Number(subtotal),
          tax_total: Number(tax),
          gross_total: Number(total),
          file_name: filename,
          route_name: routename.toLowerCase(),
          description: desc,
          client: client.toLowerCase()
        })
      })
      const responseData = await response.json();

      if (!response.ok) {
        alert(responseData.message);
        return;
      };

      handleClose();
      navigate('/invoices');

    } catch (err) {
      alert('Fetching data failed');
    }
    handleClose();

  }

  return (
    <>
      {open && <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
      <form onSubmit={addInvoiceHandler}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',

        }}>
          <TextField id="filled-basic" label="Invoice Ref" sx={{ m: 2, flexGrow: 1 }} variant="filled" onChange={invoiceRefOnChangeHandler} value={invoice_ref} />
          <TextField id="filled-basic" label="File Name" sx={{ m: 2 }} variant="filled" onChange={filenameOnChangeHandler} value={filename}
            helperText="Ex: INV1234.pdf" />
        </Box>
        <br />

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              sx={{ m: 2, flexGrow: 1 }}
              size="medium"
              label="Invoie date"
              value={invoice_date}
              onChange={(newValue) => setInvoiceDate(newValue)}
            />
            <DateField
              size="medium"
              sx={{ m: 2 }}
              label="Service start date"
              value={service_date_start}
              onChange={(newValue) => setSDS(newValue)}
            />
            <DateField
              size="medium"
              sx={{ m: 2 }}
              label="Service end date"
              value={service_date_end}
              onChange={(newValue) => setSDE(newValue)}
            />
          </LocalizationProvider>
        </Box>

        <br />

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>

          <FormControl sx={{ m: 2, flexGrow: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount" sx={{ fontSize: '1.2rem' }}>Subtotal</InputLabel>
            <Input
              value={subtotal} onChange={subtotalOnChangeHandler}
              type='number'
              id="standard-adornment-amount"
              startAdornment={<InputAdornment position="start" >$</InputAdornment>}
            />
          </FormControl>
          <FormControl sx={{ m: 2 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount" sx={{ fontSize: '1.2rem' }}>Tax</InputLabel>
            <Input
              placeholder='0'
              value={tax} onChange={taxOnChangeHandler}
              id="standard-adornment-amount"
              type='number'
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <FormControl sx={{ m: 2 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount" sx={{ fontSize: '1.2rem' }}>Total</InputLabel>
            <Input
              value={total} onChange={totalOnChangeHandler}
              id="standard-adornment-amount"
              type='number'
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <FormControl variant="standard" sx={{ m: 2, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-standard-label" sx={{ fontSize: '1.2rem' }}>Currency</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={currency}
              onChange={currencyOnChangeHandler}
              label="Currency"
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'CAD'}>CAD</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <TextField id="outlined-basic" label="Origin - Destination" sx={{ m: 2 }} variant="filled" onChange={routenameOnChangeHandler} value={routename}
            helperText="Ex: ORD - YYZ" />
          <TextField id="filled-basic" label="Client" sx={{ m: 2 }} variant="filled" onChange={clientOnChangeHandler} value={client} helperText="Ex: iherb" />
          <TextField id="filled-basic" label="Description" sx={{ m: 2, flexGrow: 1 }} variant="filled" onChange={descOnChangeHandler} value={desc} helperText="Driver Bills, Fuel & Maintenance for Aug" />
        </Box>
        <Divider />
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexGrow:1,
        }}>
          <Box style={{ fontStyle: 'italic' }} sx={{ m: 2, display: 'flex', flexGrow:2}}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 14, flexGrow: 1 }}>
              invoice_date: The date the invoice was created.
              <br />
              service_date_start: The starting date of the service period the invoice is covering.
              service_date_end: The ending date of the service period the invoice is covering.
              <br />
              (for trucking companys, use pickup date as start and end date.)
              <br />
              route_name: A description of the service route or delivery path. (Optional for non-trucking companys)
              <br />
              description: A brief description of the service or product being invoiced, helps clarify the nature of the invoice.
              <br />
              client: The client for whom the service is for (e.g. iHerb).
            </Typography>

          </Box>
          <Button fullWidth sx={{ m: 2, maxWidth: '20vw' }} type='submit' variant="outlined" >Add</Button>

        </Box>


      </form >
    </>

  )
}

export default NewInvoice