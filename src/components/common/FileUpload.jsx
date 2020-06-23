import React from 'react';

const FileUpload = ({name,rest,error,onChange}) => {
    return (
        <div className="form-group row">
            <div className="col-md-6"> 
                <label htmlFor="media" className="col-md-4 col-form-label text-md-right">media</label>
                <input 
                    type="file" 
                    id="media"
                    name="media"
                    onChange={onChange}
                    className="form-control" 
                    multiple={true}
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
     );
}
 
export default FileUpload;