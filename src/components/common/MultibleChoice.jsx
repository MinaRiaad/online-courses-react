import React, { useState,useEffect } from 'react';

export default function Tags({options,name,label,error,onChange,...rest}) {
const handleSelect=(event)=>{
  const categories=[]
  for (var option of event.target.selectedOptions) {
    if (option.selected) {
      categories.push(option.value+"");
    }
  }
  onChange(categories);
}

  return (
    <div className="form-group row select">
        <label htmlFor={name}>{label}</label>
        <div className="col-md-8">
        <select class="custom-select form-control" onChange={handleSelect} multiple id={name} name={name} {...rest}>
          <option disabled>Cateories</option>
          {options.map(item => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
        </div>
    </div>
  );
}

