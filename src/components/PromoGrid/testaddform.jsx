import React from 'eact';

const Step1 = () => {
  return (
    <div>
      <label>First Name:</label>
      <input type="text" name="firstName" />
      <br />
      <label>Last Name:</label>
      <input type="text" name="lastName" />
      <br />
      <!-- Add more fields as needed -->
    </div>
  );
};

export default Step1

import React from 'eact';

const Step2 = () => {
  return (
    <div>
      <label>Address:</label>
      <input type="text" name="address" />
      <br />
      <label>City:</label>
      <input type="text" name="city" />
      <br />
      <!-- Add more fields as needed -->
    </div>
  );
};

export default Step2;

import React from 'eact';
import Step1 from './Step1';
import Step2 from './Step2';

const AddForm = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default AddForm;

import React from 'eact';
import Step1 from './Step1';
import Step2 from './Step2';
import { Accordion, AccordionItem } from '@material-ui/core';

const EditForm = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemSummary>Step 1</AccordionItemSummary>
        <AccordionItemDetails>
          <Step1 />
        </AccordionItemDetails>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemSummary>Step 2</AccordionItemSummary>
        <AccordionItemDetails>
          <Step2 />
        </AccordionItemDetails>
      </AccordionItem>
    </Accordion>
  );
};

export default EditForm;