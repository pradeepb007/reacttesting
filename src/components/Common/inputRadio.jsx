import React from "react";

const InputRadio = (row, column) => {
  const rowValue = row.original[column.id];
  const initialValue =
    rowValue === true ? "yes" : rowValue === false ? "no" : "";
  const [value, setValue] = useState(initialValue);
  return (
    <div>
      <FormControl>
        <FormLabel id={`${accesskey}-label`}>{label}</FormLabel>
        <RadioGroup
          aria-labelledby={`${accesskey}-label`}
          name={`${accesskey}-radio`}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default InputRadio;
