import React, { useEffect, useState } from "react";
import TableComponent from "../Common/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { getData, updateRowData, deleteRowData } from "../../api/storeApi";
import { setStoreData } from "./storeDcSlice";
import AddRowPopup from "../Common/AddRowPopup";

const StoreToDc = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [tableheadings, setTableHeadings] = useState([]);
  const tableData = useSelector((state) => state.storeData.storeData);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await getData();
    dispatch(setStoreData(response));
    setTableHeadings(Object.keys(response[0]));
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleOpenPopup = () => {
    console.log("called");
    setRowData(null);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleEdit = async (rowData) => {
    console.log("test", rowData);
    setIsPopupOpen(true);
    setRowData(rowData);
    await dispatch(updateRowData(rowData.id, rowData));
    fetchData(); // Reload data after editing
  };

  const handleDelete = async (rowData) => {
    await dispatch(deleteRowData(rowData.id));
    fetchData(); // Reload data after deleting
  };

  return (
    <div className="container mx-auto">
      <button onClick={handleOpenPopup}>Add New Record</button>
      <TableComponent
        tableheadings={tableheadings}
        tableData={tableData}
        OnEdit={handleEdit}
        OnDelete={handleDelete}
      />
      {isPopupOpen && (
        <AddRowPopup
          onClose={handleClosePopup}
          onOpen={handleOpenPopup}
          isPopupOpen={isPopupOpen}
          rowData={rowData || null}
        />
      )}
    </div>
  );
};

export default StoreToDc;
