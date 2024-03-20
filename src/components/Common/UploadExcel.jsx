import React, { useRef } from "react";

const UploadExcel = ({ color, children }) => {
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
        {children}
      </Button>
      <input type="file" ref={fileInputRef} style={{ display: "none" }} />
    </div>
  );
};

export default UploadExcel;
