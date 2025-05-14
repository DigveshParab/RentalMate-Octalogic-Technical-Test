import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Typography, Alert, Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { debounce } from 'lodash';
import axios from 'axios'; 

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  goNext: () => void;
  goBack:()=>void;
}

const StepDateRange = ({ formData, setFormData, goNext,goBack }: Props) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(formData.startDate || null);
  const [endDate, setEndDate] = useState<Dayjs | null>(formData.endDate || null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const checkAvailability = debounce(async (start: Dayjs, end: Dayjs) => {
    setChecking(true);

    const payload = {
      vehicleId: parseInt(formData.vehicleId),
      startDate: dayjs(start).format("YYYY-MM-DD"),
      endDate: dayjs(end).format("YYYY-MM-DD"),
    };

    try {
      const res = await axios.post('http://localhost:5000/book/check_availability', payload);
      setIsAvailable(res.data?.available);
    } catch (error) {
      console.error(error);
      setIsAvailable(null);
    } finally {
      setChecking(false);
    }
  }, 400);


  useEffect(() => {
    if (startDate && endDate && endDate.isAfter(startDate)) {
      checkAvailability(startDate, endDate);
    } else {
      setIsAvailable(null);
    }
    return () => checkAvailability.cancel();
  }, [startDate, endDate]);

  const handleContinue = () => {
    setFormData((prev: any) => ({
      ...prev,
      startDate,
      endDate,
    }));
    goNext();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
        <Typography variant="h6">Select Booking Date Range</Typography>

        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
        />

        <DatePicker
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          minDate={startDate || undefined}
        />

        {checking && <p className="text-sm text-gray-500">Checking availability...</p>}

        {isAvailable === false && (
          <Alert severity="error">Selected dates are not available.</Alert>
        )}

        {isAvailable && (
          <Alert severity="info">Selected dates are  available.</Alert>
        )}

        {isAvailable && (
          <>
            <Button type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </>
        )}

         <Box display="flex" justifyContent="space-between" pt={2}>
                  <Button variant="outlined" color="secondary" onClick={goBack}>
                    Back
                  </Button>
                  
          </Box>
      </form>
    </LocalizationProvider>
  );
};

export default StepDateRange;
