import React from 'react';
//  Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import '../LoanHeader.css';
// Loan Header component
const Header = (props) => {
    return (
        <div className="p-2 bg-primary text-light d-flex align-items-center justify-content-center h-60px">
            {/* Burger menu icon displayed in mobile view to extend sidebar */}
            <div className="burger mr-2 cursor-pointer" onClick={props.extendSidebar}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <h2 className="font-weight-normal m-0">Loan Amount Details</h2>
        </div>
    );
};
//  default export
export default Header;