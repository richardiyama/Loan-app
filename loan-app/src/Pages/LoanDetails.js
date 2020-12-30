import React from 'react';
//  Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
//  LoanDetails component to display details received from API
const LoanDetails = (props) => {
    return (
        <div className="m-md-5">
            <div className="max-width-form m-auto">
                {/* card-body */}
                <div className="card-body">
                    <div className="row">
                        {/* Principal Amount */}
                        <div className="col-md-6 col-xs-12 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="font-weight-normal m-0">Principal</h4>
                                    <hr/>
                                    <h4 className="font-weight-normal">₦ {props.loanDetails.principal.amount}</h4>
                                </div>
                            </div>
                        </div>
                        {/* Rate of interest */}
                        <div className="col-md-6 col-xs-12 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="font-weight-normal">Rate of Interest</h4>
                                    <hr/>
                                    <h4 className="font-weight-normal">{props.loanDetails.interestRate}</h4>
                                </div>
                            </div>
                        </div>
                        {/* Monthly installment amount */}
                        <div className="col-md-6 col-xs-12 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="font-weight-normal">Monthly Installment</h4>
                                    <hr/>
                                    <h4 className="font-weight-normal"> ₦ {props.loanDetails.monthlyPayment.amount}</h4>
                                </div>
                            </div>
                        </div>
                        {/* Number of payments */}
                        <div className="col-md-6 col-xs-12 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="font-weight-normal">No of Payments</h4>
                                    <hr/>
                                    <h4 className="font-weight-normal">{props.loanDetails.numPayments}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Button to return to LoanAmountForm */}
                    <div className="text-center">
                        <button className="btn btn-primary pl-4 pr-4" onClick={props.displayForm}>
                            <h5 className="font-weight-normal m-0">Return To Form</h5>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
//  default export
export default LoanDetails;