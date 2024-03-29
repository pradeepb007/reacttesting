import React, { useRef } from "react";

const UploadExcel = ({ color, children, handleFileChange, isDataLoading }) => {
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div>
      <Button
        variant="outlined"
        color={color}
        size="small"
        onClick={handleClick}
      >
        {isDataLoading ? "Loading..." : children}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadExcel;
