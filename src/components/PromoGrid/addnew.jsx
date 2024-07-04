// components/AddForm.jsx
import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Button, TextField, Grid } from '@material-ui/core';

const AddForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
  });
  const { isValid } = useFormState();

  const [step, setStep] = useState(1);

  const onSubmit = async (data) => {
    // Send form data to API
    console.log(data);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <Grid container spacing={2}>
      {step === 1 && (
        <Grid item xs={12}>
          <TextField
            label="First Name"
            {...register('name.firstName', { required: true })}
            error={errors.name?.firstName ? true : false}
            helperText={errors.name?.firstName?.message}
          />
          <TextField
            label="Last Name"
            {...register('name.lastName', { required: true })}
            error={errors.name?.lastName ? true : false}
            helperText={errors.name?.lastName?.message}
          />
          <Button onClick={handleNextStep} disabled={!isValid}>
            Next
          </Button>
        </Grid>
      )}
      {step === 2 && (
        <Grid item xs={12}>
          <TextField
            label="Address"
            {...register('address', { required: true })}
            error={errors.address ? true : false}
            helperText={errors.address?.message}
          />
          <TextField
            label="City"
            {...register('city', { required: true })}
            error={errors.city ? true : false}
            helperText={errors.city?.message}
          />
          <Button onClick={handleNextStep} disabled={!isValid}>
            Next
          </Button>
        </Grid>
      )}
      {step === 3 && (
        <Grid item xs={12}>
          <TextField
            label="State"
            {...register('state', { required: true })}
            error={errors.state ? true : false}
            helperText={errors.state?.message}
          />
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default AddForm;

// components/EditForm.jsx
import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Button, TextField, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

const EditForm = ({ rowData }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
  });
  const { isValid } = useFormState();

  const [step, setStep] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const onSubmit = async (data) => {
    // Send form data to API
    console.log(data);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
      <AccordionSummary>
        <Typography>Step 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              {...register('name.firstName', { required: true })}
              error={errors.name?.firstName ? true : false}
              helperText={errors.name?.firstName?.message}
              defaultValue={rowData.name.firstName}
            />
            <TextField
              label="Last Name"
              {...register('name.lastName', { required: true })}
              error={errors.name?.lastName ? true : false}
              helperText={errors.name?.lastName?.message}
              defaultValue={rowData.name.lastName}
            />
            <Button onClick={handleNextStep} disabled={!isValid}>
              Next
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
      <AccordionSummary>
        <Typography>Step 2</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Address"
              {...register('address', {
// components/EditForm.jsx
import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Button, TextField, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

const EditForm = ({ rowData }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
  });
  const { isValid } = useFormState();

  const [step, setStep] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const onSubmit = async (data) => {
    // Send form data to API
    console.log(data);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
      <AccordionSummary>
        <Typography>Step 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              {...register('name.firstName', { required: true })}
              error={errors.name?.firstName ? true : false}
              helperText={errors.name?.firstName?.message}
              defaultValue={rowData.name.firstName}
            />
            <TextField
              label="Last Name"
              {...register('name.lastName', { required: true })}
              error={errors.name?.lastName ? true : false}
              helperText={errors.name?.lastName?.message}
              defaultValue={rowData.name.lastName}
            />
            <Button onClick={handleNextStep} disabled={!isValid}>
              Next
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
      <AccordionSummary>
        <Typography>Step 2</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Address"
              {...register('address', { required: true })}
              error={errors.address ? true : false}
              helperText={errors.address?.message}
              defaultValue={rowData.address}
            />
            <TextField
              label="City"
              {...register('city', { required: true })}
              error={errors.city ? true : false}
              helperText={errors.city?.message}
              defaultValue={rowData.city}
            />
            <Button onClick={handleNextStep} disabled={!isValid}>
              Next
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
      <AccordionSummary>
        <Typography>Step 3</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="State"
              {...register('state', { required: true })}
              error={errors.state ? true : false}
              helperText={errors.state?.message}
              defaultValue={rowData.state}
            />
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default EditForm;

// components/TableComponent.jsx
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    axios.get('https://example.com/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEdit = (row) => {
    setEditing(true);
    setRowData(row);
  };

  const handleDelete = (id) => {
    axios.delete(`https://example.com/api/data/${id}`)
      .then(response => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell
// components/TableComponent.jsx
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import EditForm from './EditForm';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    axios.get('https://example.com/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEdit = (row) => {
    setEditing(true);
    setRowData(row);
  };

  const handleDelete = (id) => {
    axios.delete(`https://example.com/api/data/${id}`)
      .then(response => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name.firstName} {row.name.lastName}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(row)}>Edit</Button>
                <Button onClick={() => handleDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editing && (
        <EditForm rowData={rowData} />
      )}
    </TableContainer>
  );
};

export default TableComponent;

// components/TableComponent.jsx
import React, { useState, useEffect } from 'react';
import { MRT_Table, MRT_Row, MRT_Cell } from 'material-react-table';
import axios from 'axios';
import EditForm from './EditForm';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    axios.get('https://example.com/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEdit = (row) => {
    setEditing(true);
    setRowData(row);
  };

  const handleDelete = (id) => {
    axios.delete(`https://example.com/api/data/${id}`)
      .then(response => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const columns = [
    {
      accessorKey: 'name.firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'name.lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'city',
      header: 'City',
    },
    {
      accessorKey: 'state',
      header: 'State',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <MRT_Table columns={columns} data={data}>
      {(tableInstance) => (
        <table {...tableInstance.getTableProps()} className="mui-table">
          <thead>
            {tableInstance.headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="mui-table-header-row">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="mui-table-header-cell">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...tableInstance.getTableBodyProps()} className="mui-table-body">
            {tableInstance.rows.map((row) => (
              <MRT_Row {...row.getRowProps()} className="mui-table-row">
                {row.cells.map((cell) => (
                  <MRT_Cell {...cell.getCellProps()} className="mui-table-cell">
                    {cell.render('Cell')}
                  </MRT_Cell>
                ))}
              </MRT_Row>
            ))}
          </tbody>
        </table>
      )}
    </MRT_Table>
    {editing && (
      <EditForm rowData={rowData} />
    )}
  );
};

export default TableComponent;