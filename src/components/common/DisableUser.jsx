import React, { useState } from 'react';

const DisableUser = ({onDisable,user}) => {
    
    const [className, setClassName] = useState("");
    const style=user.disabled ? "btn btn-success btn-sm" :"btn btn-danger btn-sm";
    setClassName(style);
    return ( 
        <button
          onClick={onDisable}
          className={className}
        >
          Disable
        </button>
    );
}
 
export default DisableUser;