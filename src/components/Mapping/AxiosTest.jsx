import React, { useState, useEffect } from "react";
import { getData } from "../../api/storeApi";

import { useDispatch, useSelector } from "react-redux";
import { setStoreData } from "./storeDcSlice";
const AxiosTest = () => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState();
  const tableData = useSelector((state) => state.storeData.storeData);
  const fetchData = async () => {
    const response = await getData();
    dispatch(setStoreData(response));
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, tableData]);
  return (
    <div>
      AxiosTest
      {tableData && tableData.map((item) => <p>{item.custID}</p>)}
    </div>
  );
};

export default AxiosTest;
