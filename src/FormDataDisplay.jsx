import React from 'react';

const FormDataDisplay = ({ formDataList }) => {
  return (
    <div className="formData">
      <h2>Submitted Data</h2>
      {formDataList.map((formData, index) => (
        <div key={index} className="formDataList">
          <h3>Form {index + 1}</h3>
          <pre>
            {formData.map((item, idx) => (
              <span key={idx}>{item.category}: {item.data}<br /></span>
            ))}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default FormDataDisplay;
