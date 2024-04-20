import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './FormField.css';

const FormField = ({ field, onChange, onRemove }) => {
  const handleFieldChange = (e, type) => {
    onChange(field.id, e, type);
  };

  return (
    <div key={field.id} className="form-field">
      <input 
        type="text" 
        placeholder="Enter field name" 
        className="field-name-input"
        value={field.fieldName} 
        onChange={(e) => handleFieldChange(e, 'fieldName')} 
      />
      <input 
        type="text" 
        placeholder="Enter data" 
        className="data-input"
        value={field.data} 
        onChange={(e) => handleFieldChange(e, 'data')} 
      />
      <select 
        value={field.type} 
        onChange={(e) => handleFieldChange(e, 'type')}
        className="type-select"
      >
        <option value="" disabled>Select data type</option>
        <option value="text">Text</option>
        <option value="integer">Integer</option>
        <option value="email">Email</option>
        <option value="password">Password</option>
        <option value="details">Details</option>
        <option value="date">Date</option>
        <option value="price">Price</option>
      </select>
      <button onClick={() => onRemove(field.id)} className="remove-button">X</button>
    </div>
  );
};

export default FormField;
