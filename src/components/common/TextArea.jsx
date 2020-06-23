import React from 'react'; 

const TextArea = ({name,label,error,...rest}) => { 
  
  return (
    <div className="form-group row">
        <label htmlFor={name} className="col-md-4 col-form-label text-md-right">{label}</label>
        <div className="col-md-6">
          <textarea
            {...rest}
            id={name}
            name={name}
            className="form-control"
          />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  ); 
} 

export default TextArea;
