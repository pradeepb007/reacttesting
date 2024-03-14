import React, { Suspense } from "react";
import StoreToDc from "../components/Mapping/StoreToDc";

function Mapping() {
  return (
    <Suspense fallback={<div>Loading......</div>}>
      <StoreToDc />
    </Suspense>
  );
}

export default Mapping;
