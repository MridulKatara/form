import React, { useState } from 'react';
import './App.css';
import FormField from './FormField';
import FormDataDisplay from './FormDataDisplay';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [formDataList, setFormDataList] = useState([]);
  const [inputFields, setInputFields] = useState([{ 
    id: uuidv4(), 
    fieldName: '', 
    data: '', 
    type: '' 
  }]);

  const handleChange = (id, event, type) => {
    const updatedFields = inputFields.map(field => 
      field.id === id ? { ...field, [type]: event.target.value } : field
    );
    setInputFields(updatedFields);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { 
      id: uuidv4(), 
      fieldName: '', 
      data: '', 
      type: '' 
    }]);
  };

  const handleRemoveField = (id) => {
    const updatedFields = inputFields.filter(field => field.id !== id);
    setInputFields(updatedFields);
  };

  const handleSubmit = () => {
    const isFormValid = inputFields.every(field => {
      if (field.data.trim() === '') {
        return false; 
      }
      switch (field.type) {
        case 'text':
          return true;
        case 'integer':
          return /^[0-9]+$/.test(field.data) && field.data.length <= 10;    
        case 'email':
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(field.data);
        case 'password':
          return /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(field.data);
        case 'details':
          return true;
        case 'date':
          return /^\d{2}\/\d{2}\/\d{4}$/.test(field.data);
        case 'price':
          return /^[0-9]*(\.[0-9]{1,2})?$/.test(field.data);
        default:
          return true;
      }
    });

    if (!isFormValid) {
      alert('Please enter valid data for each field.');
      return;
    }

    const categorizedData = inputFields.map(field => {
      let category = '';
      let displayData = field.data;

      switch (field.type) {
        case 'text':
          category = 'name';
          break;
        case 'integer':
          if (field.data.length === 2 && parseInt(field.data, 10) < 100) {
            category = 'age';
            displayData = ` ${field.data}`;
          } else if (field.data.length === 10) {
            category = 'mobile';
            displayData = ` ${field.data}`;
          } else if (field.data.length > 2 && field.data.length < 10) {
            category = 'pin';
            displayData = ` ${field.data}`;
          } else {
            category = 'integer';
          }
          break;
        case 'email':
          category = 'email';
          break;
        case 'password':
          category = 'password';
          displayData = '*'.repeat(field.data.length);
          break;
        case 'details':
          category = 'details';
          break;
        case 'date':
          category = 'date';
          const parts = field.data.split('/');
          displayData = `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`;
          break;
        case 'price':
          category = 'price';
          displayData = `price ${field.data}`;
          break;
        default:
          category = 'text';
      }

      return {
        category,
        fieldName: field.fieldName,
        data: displayData
      };
    });

    setFormDataList(prevData => [...prevData, categorizedData]);
    setInputFields([{ 
      id: uuidv4(), 
      fieldName: '', 
      data: '', 
      type: '' 
    }]);
  };

  return (
    <div className="App">
      <h1 className="heading">GVERN Forms</h1>
      <form>
        {inputFields.map((field) => (
          <FormField 
            key={field.id}
            field={field}
            onChange={handleChange}
            onRemove={handleRemoveField}
          />
        ))}
        <button type="button" onClick={handleAddField} className="add-button" style={{ backgroundColor: 'green' }}>Add Fields</button>
        <button type="button" onClick={handleSubmit} className="submit-button">Submit</button>
      </form>
      <FormDataDisplay formDataList={formDataList} />
    </div>
  );
}

export default App;
