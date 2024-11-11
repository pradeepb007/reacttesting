import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  TextField,
  Box,
  IconButton,
  Tooltip,
  FormControl,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { styled } from "@mui/system";

// Custom FormControl with flex layout to position icons side by side and adjust border
const StyledFormControl = styled(FormControl)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: "4px", // Ensures border radius for input area
  border: "1px solid #ccc", // Default border
  paddingRight: "2.5rem", // Space for icons
});

// Adjust border when error is present
const StyledTextField = styled(TextField)(({ theme, error }) => ({
  "& .MuiOutlinedInput-root": {
    borderColor: error ? theme.palette.error.main : "#ccc", // Error border color
    "&.Mui-focused": {
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.primary.main, // Focused error border
    },
  },
}));

// Absolute positioning for the error icon, positioned to the right of the date picker icon
const StyledErrorIconWrapper = styled(Box)({
  position: "absolute",
  right: 10, // Adjust to place next to the datepicker icon
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "auto",
  zIndex: 1, // Ensure the error icon stays on top
});

function DatePickerWithTooltipError({ value, onChange }) {
  const errorMessage = "This is an error message"; // Example error message
  const hasError = !!errorMessage;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StyledFormControl>
        <DatePicker
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              error: hasError,
              fullWidth: true,
              variant: "outlined", // Ensures outlined variant for border
              InputProps: {
                endAdornment: null, // Remove calendar icon to avoid conflict
              },
            },
          }}
        />
        <StyledTextField
          error={hasError}
          variant="outlined"
          helperText={hasError ? errorMessage : ""}
        />
        {hasError && (
          <StyledErrorIconWrapper>
            <Tooltip title={errorMessage} arrow>
              <IconButton size="small">
                <ErrorIcon color="error" />
              </IconButton>
            </Tooltip>
          </StyledErrorIconWrapper>
        )}
      </StyledFormControl>
    </LocalizationProvider>
  );
}

export default DatePickerWithTooltipError;
