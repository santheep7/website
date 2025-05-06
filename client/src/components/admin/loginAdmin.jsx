import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [admin, setAdmin] = useState({ email: '', password: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (admin.email.trim().toLowerCase() === 'santheep@gmail.com' && admin.password.trim() === '12345') {
      setSnackbar({ open: true, message: 'Login successful', severity: 'success' });
      setTimeout(() => {
        navigate('/adminHome');
      }, 3000);
      setAdmin({ email: '', password: '' });
    } else {
      setSnackbar({ open: true, message: 'Invalid credentials', severity: 'error' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm">
      {/* Snackbar for Toast Replacement */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Welcome to Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            value={admin.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            value={admin.password}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AdminLogin;
