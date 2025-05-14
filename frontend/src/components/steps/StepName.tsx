import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  goNext: () => void;
}

const StepName = ({ formData, setFormData, goNext }: Props) => {
  const formik = useFormik({
    initialValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
    }),
    onSubmit: values => {
      //@ts-ignore
      setFormData((prev) => ({ ...prev, ...values }));
      goNext();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">What is your name?</h2>

      <TextField
        name="firstName"
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        // error={!!formik.errors.firstName && formik.touched.firstName}
        // helperText={formik.touched.firstName && formik.errors.firstName}
      />

      <TextField
        name="lastName"
        label="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        // error={!!formik.errors.lastName && formik.touched.lastName}
        // helperText={formik.touched.lastName && formik.errors.lastName}
      />

      <Button type="submit" variant="contained" color="primary">
        Next
      </Button>
    </form>
  );
};

export default StepName;
