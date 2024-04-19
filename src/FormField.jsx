import React from 'react';

const FormField = ({ field, onChange, onRemove }) => {
  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'integer':
      case 'email':
      case 'password':
      case 'date':
      case 'price':
        return (
          <>
            <input 
              type={field.type === 'password' ? 'password' : 'text'}
              placeholder={`Enter ${field.type}`}
              value={field.data} 
              onChange={(e) => onChange(field.id, e, 'data')} 
            />
            <button onClick={() => onRemove(field.id)}>✖</button>
          </>
        );
      case 'details':
        return (
          <>
            <textarea
              placeholder="Enter details"
              value={field.data}
              onChange={(e) => onChange(field.id, e, 'data')}
            ></textarea>
            <button onClick={() => onRemove(field.id)}>✖</button>
          </>
        );
      case 'radio':
        return (
          <select
            value={field.data}
            onChange={(e) => onChange(field.id, e, 'data')}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderField()}
      <select 
        value={field.type} 
        onChange={(e) => onChange(field.id, e, 'type')}
      >
        <option value="text">Text</option>
        <option value="integer">Integer</option>
        <option value="email">Email</option>
        <option value="password">Password</option>
        <option value="details">Details</option>
        <option value="date">Date</option>
        <option value="price">Price</option>
        <option value="radio">Dropdown</option>
      </select>
    </div>
  );
};

export default FormField;
