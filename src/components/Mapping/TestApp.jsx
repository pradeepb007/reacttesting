import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const TestApp = () => {
  const ErrorFallback = ({ error }) => {
    // we can customize the UI as we want
    return (
      <div style="color:red">
        <h2>
          Oops! An error occurred
          <br />
          <br />
          {error.message}
        </h2>
        {/* Additional custom error handling */}
      </div>
    );
  };

  const logError = (error) => {
    setErrorMessage(error.message);
    console.error(error);
    // we can also send the error to a logging service
  };

  const handleResetError = () => {
    console.log("Error boundary reset");
    setErrorMessage("");
    //additional logic to perform code cleanup and state update actions
  };

  const UserProfile = ({ user }) => {
    return (
      <div>
        <h2>User Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.personalID.email}</p>
      </div>
    );
  };

  const user = {
    name: "Shruti Apte",
    //missing personalID.email property on purpose
  };

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <ErrorBoundary
      onError={logError}
      onReset={handleResetError}
      FallbackComponent={ErrorFallback}
    >
      <UserProfile user={user} />
    </ErrorBoundary>
  );
};

export default TestApp;
