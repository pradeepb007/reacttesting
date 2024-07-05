import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Box } from '@mui/material';

const Step1Form = ({ control }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First Name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        rules={{ required: 'Last Name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
    </Box>
  );
};

export default Step1Form;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Box } from '@mui/material';

const Step2Form = ({ control }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Controller
        name="email"
        control={control}
        rules={{ 
          required: 'Email is required',
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Invalid email address'
          }
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        rules={{ required: 'Phone Number is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
    </Box>
  );
};

export default Step2Form;


import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Box } from '@mui/material';

const Step3Form = ({ control }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Controller
        name="address"
        control={control}
        rules={{ required: 'Address is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        rules={{ required: 'City is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
    </Box>
  );
};

export default Step3Form;

import React, { useState } from 'react';
import {
  Stepper, Step, StepLabel, Button, Typography, Box, Container,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';

const steps = ['Personal Information', 'Contact Details', 'Address Information'];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm({ mode: 'onTouched' });
  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    const result = await trigger();
    if (result) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = (data) => {
    // Handle form submission
    alert('Form submitted!');
  };

  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2, mb: 2 }}>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h6" align="center">
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {activeStep === 0 && <Step1Form control={methods.control} />}
              {activeStep === 1 && <Step2Form control={methods.control} />}
              {activeStep === 2 && <Step3Form control={methods.control} />}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                  </Button>
                )}
              </Box>
            </form>
          </FormProvider>
        )}
      </Box>
    </Container>
  );
};

export default StepperForm;
