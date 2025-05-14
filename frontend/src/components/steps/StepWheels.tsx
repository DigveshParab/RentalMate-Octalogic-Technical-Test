import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  CircularProgress,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { debounce } from 'lodash';

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  goNext: () => void;
  goBack: () => void;
}

const StepWheels = ({ formData, setFormData, goNext, goBack }: Props) => {
  // values
  const [wheels, setWheels] = useState(formData.wheels || '');
  const [vehicleTypeId, setVehicleTypeId] = useState(formData.vehicleTypeId || '');
  const [vehicleId, setVehicleId] = useState(formData.vehicleId || '');

  // collection
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);
  const [vehicleList, setVehicleList] = useState<any[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  useEffect(() => {
    if (wheels) {
      setLoadingTypes(true);
      fetchVehicleTypes(wheels);
    }

    return ()=> {
      setVehicleList([])
      setLoadingTypes(false)
    }
  }, [wheels]);


useEffect(() => {
    if (vehicleTypeId) {
      setLoadingVehicles(true);
      fetchVehicleList(vehicleTypeId);
    }

    return ()=> {
      setVehicleList([])
      setLoadingVehicles(false)
    }
  }, [vehicleTypeId]);

  const fetchVehicleTypes = debounce(async (wheels: string) => {
    try {
      const response = await fetch(`http://localhost:5000/book/getTypes/${wheels}`);
      const data = await response.json();
      setVehicleTypes(data.data);
    } catch (error) {
      console.error('Error fetching vehicle types:', error);
    } finally {
      setLoadingTypes(false);
    }
  }, 300);

  const fetchVehicleList = debounce(async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/book/getRide/${id}`);
      const data = await response.json();
      setVehicleList(data.data);
    } catch (error) {
      console.error('Error fetching vehicle types:', error);
    } finally {
      setLoadingVehicles(false);
    }
  }, 300);

  const handleWheelsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setWheels(selected);
    setVehicleTypeId(''); // reset vehicle type on wheels change
    //@ts-ignore
    setFormData((prev) => ({ ...prev, wheels: selected, vehicleTypeId: '' }));
  };

  const handleVehicleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setVehicleTypeId(selected);
    //@ts-ignore
    setFormData((prev) => ({ ...prev, vehicleTypeId: selected }));
  };

  const handleVehicleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    console.log(vehicleList,"jjj")
    setVehicleId(selected);
    //@ts-ignore
    setFormData((prev) => ({ ...prev, vehicleId: selected }));
  };


  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
      <Stack spacing={4}>
        <Typography variant="h6">Step 2: Choose Your Vehicle</Typography>

        <FormControl>
          <FormLabel>Number of Wheels</FormLabel>
          <RadioGroup row value={wheels} onChange={handleWheelsChange}>
            <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
            <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
          </RadioGroup>
        </FormControl>

        {loadingTypes && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}

        {!loadingTypes && vehicleTypes.length > 0 && (
          <FormControl>
            <FormLabel>Vehicle Type</FormLabel>
            <RadioGroup value={vehicleTypeId} onChange={handleVehicleTypeChange}>
              {vehicleTypes.map((vehType) => {
                return(
                  <FormControlLabel
                  key={vehType.id}
                  value={vehType.id}
                  control={<Radio />}
                  label={vehType.type}
                />

                )
              })}
            </RadioGroup>
          </FormControl>
        )}

        {loadingVehicles && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          )}
        {!loadingVehicles && vehicleTypes.length > 0 && (
          <FormControl>
            <FormLabel>Vehicle Type</FormLabel>
            <RadioGroup value={vehicleId} onChange={handleVehicleChange}>
              {vehicleList.map((veh) => {
                return(
                  <FormControlLabel
                    key={veh.id}
                    value={veh.id}
                    control={<Radio />}
                    label={veh.name}
                />
                )
              })}
            </RadioGroup>
          </FormControl>
        )}

        <Box display="flex" justifyContent="space-between" pt={2}>
          <Button variant="outlined" color="secondary" onClick={goBack}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={goNext}
            disabled={!wheels || loadingTypes || loadingVehicles || !vehicleTypeId}
          >
            Next
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default StepWheels;
