import React from 'react';
//  Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
//  Error Message component to display error message
const ErrorMessage = (props) => {
    return (
        <div>
            <div className="mt-5 text-center">
                {/* Error message */}
                <div className="alert alert-danger">
                    <h5 className="font-weight-normal m-0">{props.errorMessage}</h5>
                </div>
                {/* Button to return to Loan */}
                <div>
                    <button className="btn btn-primary pl-4 pr-4" onClick={props.displayForm}>
                        <h5 className="font-weight-normal m-0">Return To Form</h5>
                    </button>
                </div>
            </div>
        </div>
    )
};
//  export default
export default ErrorMessage;