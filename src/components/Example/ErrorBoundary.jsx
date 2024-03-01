// components/ErrorBoundary.js

import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  const handleOnError = (error) => {
    console.error("Error caught by ErrorBoundary:", error);
    setError(error);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          onError: handleOnError,
        });
      })}
    </React.Fragment>
  );
};

export default ErrorBoundary;
