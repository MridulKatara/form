import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const FormDataDisplay = ({ formDataList }) => {
  return (
    <div className="formData">
      <h2>Submitted Data</h2>
      {formDataList.map((formData, index) => (
        <div key={uuidv4()} className="formDataList">
          <h3>Form {index + 1}</h3>
          <pre>
            {formData.map((item) => {
              const itemId = uuidv4();
              let displayData = item.data;

              if (item.category === 'password') {
                displayData = '*'.repeat(item.data.length);
              }

              return (
                <span key={itemId}>{item.fieldName}: {displayData}<br /></span>
              );
            })}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default FormDataDisplay;
