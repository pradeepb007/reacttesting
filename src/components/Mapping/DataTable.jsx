// DataTable.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  addNewRowData,
  updateRowData,
  deleteRowData,
} from "../../api/storeApi";
import { setStoreData } from "./storeDcSlice";
import MaterialTable from "./MaterialTable";

const DataTable = () => {
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getData();
    dispatch(setStoreData(response));
    setTableData(response);
  };

  const handleCreate = async (newValues) => {
    await dispatch(addNewRowData(newValues));
    fetchData();
  };

  const handleUpdate = async (id, newValues) => {
    await dispatch(updateRowData(id, newValues));
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteRowData(id));
      fetchData();
    }
  };

  return (
    <MaterialTable
      data={tableData}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
};

export default DataTable;
