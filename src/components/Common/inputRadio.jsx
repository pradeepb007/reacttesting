import React from "react";

const inputRadio = (row, accesskey, label) => {
  const [value, setValue] = useState(row.original[accesskey]);
  return (
    <div>
      <FormControl>
        <FormLabel id={`${accesskey}-label`}>{label}</FormLabel>
        <RadioGroup
          aria-labelledby={`${accesskey}-label`}
          name={`${accesskey}-radio`}
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

export default inputRadio;

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputRadio from "./InputRadio"; // Assuming the component is exported as InputRadio

describe("InputRadio", () => {
  it("should render with correct label and options", () => {
    const row = {
      original: {
        accessKey: "testKey", // Provide necessary data for testing
      },
    };
    const label = "Test Label";

    const { getByLabelText } = render(
      <InputRadio row={row} accesskey="accessKey" label={label} />
    );

    // Check if label is rendered correctly
    expect(getByLabelText(label)).toBeInTheDocument();

    // Check if options are rendered correctly
    expect(getByLabelText("Yes")).toBeInTheDocument();
    expect(getByLabelText("No")).toBeInTheDocument();
  });

  it("should update value on option selection", () => {
    const row = {
      original: {
        accessKey: "testKey", // Provide necessary data for testing
      },
    };
    const label = "Test Label";

    const { getByLabelText } = render(
      <InputRadio row={row} accesskey="accessKey" label={label} />
    );

    // Select "Yes" option
    fireEvent.click(getByLabelText("Yes"));
    expect(getByLabelText("Yes").checked).toBe(true);
    expect(getByLabelText("No").checked).toBe(false);

    // Select "No" option
    fireEvent.click(getByLabelText("No"));
    expect(getByLabelText("Yes").checked).toBe(false);
    expect(getByLabelText("No").checked).toBe(true);
  });
});
