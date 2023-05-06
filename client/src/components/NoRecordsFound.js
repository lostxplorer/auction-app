import React from "react";

const NoRecordsFound = props => {
  const {
    topHeight,
    middleHeight,
    hideCard,
    description,
    message,
    showMessage,
    boldMessage,
    position
  } = props;

  const top = topHeight ? topHeight : "9vh";
  const middle = middleHeight ? middleHeight : "520px";

  const root = {
    minHeight: position === "top" ? top : middle
  };

  return (
    <div
      className={`${
        !hideCard ? "card mb-5" : ""
      } d-flex align-items-center justify-content-center flex-column`}
      style={root}
    >
      {!showMessage && !message && <strong>No records found</strong>}
      <strong>{message && message}</strong>
      {boldMessage && <strong>{boldMessage}</strong>}
      {description && (
        <div className="text-center m-1">
          <p>{description}</p>
        </div>
      )}

    </div>
  );
};

export default NoRecordsFound;
