import React, { Suspense } from "react";
import StoreToDcTable from "../components/Mapping/StoreToDcTable";

function Mapping() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading......</div>}>
        <StoreToDcTable />
      </Suspense>
    </div>
  );
}

export default Mapping;
