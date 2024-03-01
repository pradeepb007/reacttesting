import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../Common/ErrorFallback";
import TableData from "./TableData";
import TestApp from "./TestApp";

function Mapping() {
  return (
    // <ErrorBoundary fallback={<ErrorFallback />}>
    //   <Suspense fallback={<div>Loading......</div>}>
    //     <TableData />
    //   </Suspense>
    // </ErrorBoundary>
    <TestApp />
  );
}

export default Mapping;
