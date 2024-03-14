import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

import { getBrands, getCategories, getSubsectors } from "../../api/api";
import { addNewRowData, updateRowData } from "../../api/storeApi";
import { useDispatch } from "react-redux";
const moment = require("moment");

const AddRowPopup = ({ isPopupOpen, onClose, onOpen, rowData }) => {
  const currentDate = moment().format("MM/DD/YYYY");
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subsectors, setSubsectors] = useState([]);
  const [formData, setFormData] = useState(
    rowData || {
      custID: "",
      dateFrom: "",
      dateTo: "",
      dcID: "",
      storeID: "",
      fraction: "",
      category: "",
      subSector: "",
      brand: "",
      gtin: "",
      createdBy: "Admin",
      createdDate: currentDate,
      modifiedBy: "Admin",
      modifiedDate: currentDate,
    }
  );

  useEffect(() => {
    fecthData();
    setFormData((prevFormData) => ({
      ...prevFormData,
      modifiedBy: prevFormData.createdBy,
      modifiedDate: prevFormData.createdDate,
    }));
  }, [formData.createdBy, formData.createdDate]);

  const fecthData = async () => {
    const brandData = await getBrands();
    setBrands(brandData);
    const categoryData = await getCategories();
    setCategories(categoryData);
    const subSectorData = await getSubsectors();
    setSubsectors(subSectorData);
  };

  const handleChange = (name, value) => {
    let formattedValue = value;
    if (name === "dateFrom" || name === "dateTo") {
      formattedValue = moment(value, "YYYY-MM-DD").format("YYYY-MM-DD");
    }
    setFormData({ ...formData, [name]: formattedValue });
  };

  // const handleChange = (name, value) => {
  //   let formattedValue = value;
  //   if (name === "dateFrom" || name === "dateTo") {
  //     formattedValue = moment(value, "YYYY-MM-DD").format("MM/DD/YYYY");
  //   }
  //   setFormData({ ...formData, [name]: formattedValue });
  // };

  // const handleSelectChange = (name, value) => {
  //   handleChange(name, value);
  // };

  // const handleFiledChange = (e) => {
  //   const { name, value } = e.target;
  //   handleChange(name, value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit clicked");
    console.log(rowData);
    if (rowData) {
      console.log("updateRowData called");
      await dispatch(updateRowData(rowData.id, formData));
      onClose();
    } else {
      console.log("addnewrowdata called");
      await dispatch(addNewRowData(formData));
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isPopupOpen} handler={onOpen}>
        <DialogHeader>{rowData ? "Edit Row" : "Add New Row"}</DialogHeader>
        <DialogBody divider={true} className="h-[24rem] overflow-x-auto">
          <form autoComplete="off" className="flex flex-col gap-4">
            <Input
              label="custID"
              name="custID"
              type="number"
              size="md"
              required
              value={formData.custID}
              //onChange={handleFiledChange}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <Input
              label="dateFrom"
              name="dateFrom"
              type="date"
              size="md"
              value={formData.dateFrom}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <Input
              label="dateTo"
              name="dateTo"
              type="date"
              size="md"
              value={formData.dateTo}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <Input
              label="dcID"
              name="dcID"
              type="number"
              size="md"
              required
              value={formData.dcID}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <Input
              label="storeID"
              name="storeID"
              type="number"
              size="md"
              required
              value={formData.storeID}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <Input
              label="fraction"
              name="fraction"
              type="number"
              size="md"
              required
              value={formData.fraction}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <Select
              label="SubSector"
              name="subsector"
              value={formData.subSector}
              onChange={(value) => handleChange("subSector", value)}
            >
              {subsectors?.map((subsector) => (
                <Option key={subsector.id} value={subsector.name}>
                  {subsector.name}
                </Option>
              ))}
            </Select>
            <Select
              label="category"
              name="category"
              value={formData.category}
              onChange={(value) => handleChange("category", value)}
              required
            >
              {categories?.map((category) => (
                <Option key={category.id} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Select
              label="brand"
              name="brand"
              value={formData.brand}
              onChange={(value) => handleChange("brand", value)}
            >
              {brands?.map((brand) => (
                <Option key={brand.id} value={brand.name}>
                  {brand.name}
                </Option>
              ))}
            </Select>
            <Input
              label="GTIN"
              name="gtin"
              type="number"
              size="md"
              value={formData.gtin}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            {/* <Input
              label="created  BY"
              name="createdBy"
              type="text"
              size="md"
              value={formData.createdBy}
             onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <Input
              label="crated date"
              name="createdDate"
              type="date"
              readOnly
              disabled
              size="md"
              value={formData.createdDate}
            /> */}
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="blue-gray" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddRowPopup;
