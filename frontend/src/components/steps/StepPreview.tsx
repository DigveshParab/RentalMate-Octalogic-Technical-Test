import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep:React.Dispatch<React.SetStateAction<any>>;
  resetForm:()=>void;
  goBack: () => void;
}

const StepPreview = ({ formData, goBack,setStep,resetForm}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      firstName:formData.firstName,
      lastName:formData.lastName,
      startDate: dayjs(formData.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(formData.endDate).format("YYYY-MM-DD"),
      vehicleId:parseInt(formData.vehicleId)
    };

    try {
      const response = await axios.post('http://localhost:5000/book/create', payload);

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('Booking failed. Please try again.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('Something went wrong while booking.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
      <Stack spacing={4}>
        <Typography variant="h6">Step 4: Review & Confirm</Typography>

        <Box>
          <Typography><strong>First Name:</strong> {formData.firstName}</Typography>
          <Typography><strong>Last Name:</strong> {formData.lastName}</Typography>
          <Typography><strong>Wheels:</strong> {formData.wheels}</Typography>
          <Typography><strong>Vehicle Type ID:</strong> {formData.vehicleTypeId}</Typography>
          <Typography><strong>Vehicle ID:</strong> {formData.vehicleId}</Typography>
          <Typography><strong>Start Date:</strong> {formData.startDate.format('YYYY-MM-DD')}</Typography>
          <Typography><strong>End Date:</strong> {formData.endDate.format('YYYY-MM-DD')}</Typography>
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Booking successful!</Alert>}

        <Box display="flex" justifyContent="space-between" pt={2}>
          <Button variant="outlined" color="secondary" onClick={goBack}>
            Back
          </Button>
          {!success ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBooking}
                    disabled={loading}
                >
                    Book Now
            </Button>
          ):(
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>{setStep(0),resetForm()}}
                >
                    New Booking
            </Button>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default StepPreview;
