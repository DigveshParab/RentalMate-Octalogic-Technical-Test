import { useState } from 'react';
import { Box, Paper, Stepper, Step, StepLabel, Typography, Container } from '@mui/material';
import StepName from './steps/StepName';
import StepWheels from './steps/StepWheels';
import StepDateRange from './steps/StepDaterange';
import StepPreview from './steps/StepPreview';

const steps = ['Your Name', 'Number of Wheels', 'Booking Dates', 'Confirm Booking'];

const BookingForm = () => {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleTypeId: '',
    vehicleId: '',
    startDate: '',
    endDate: '',
  });


  const resetForm = ()=>{
    setFormData({
      firstName: '',
      lastName: '',
      wheels: '',
      vehicleTypeId: '',
      vehicleId: '',
      startDate: '',
      endDate: '',
    })
  }

  const goNext = () => setStep(prev => prev + 1);
  const goBack = () => setStep(prev => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepName formData={formData} setFormData={setFormData} goNext={goNext} />;
      case 1:
        return <StepWheels formData={formData} setFormData={setFormData} goNext={goNext} goBack={goBack} />;
      case 2:
        return <StepDateRange formData={formData} setFormData={setFormData} goNext={goNext} goBack={goBack}  />;
      case 3:
        return <StepPreview formData={formData} setFormData={setFormData} goBack={goBack} setStep={setStep} resetForm={resetForm}/>;
      default:
        return <Typography>Step not found</Typography>;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" mb={4}>
          Vehicle Booking
        </Typography>

        <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>
          {renderStep()}
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingForm;
