import React from 'react';
//  Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import '../Sidebar.css';
//  Sidebar component that holds cached amounts and tenure
const Sidebar = (props) => {
    //  Variable to hold a list of cards having cached amount and tenure
    let cacheAmountDisplay = null;
    //  If only amounts and tenure is cached
    if(props.cacheAmountList) {
        cacheAmountDisplay = (
            <div>
                {
                    //  Runs a loop over each cached value and creates a card interface
                    Object.keys(props.cacheAmountList).map((key, index) => {
                        return (
                            <div className="pb-3 pr-3 pl-3" key={key}>
                                {/* card */}
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-around">
                                            {/* Amount */}
                                            <div className="text-center">
                                                <h4 className="font-weight-normal m-0">Amount</h4>
                                                <hr className="mt-1 mb-2"/>
                                                <h5 className="font-weight-normal">₦{props.cacheAmountList[key].amount}</h5>
                                            </div>
                                            {/* Duration */}
                                            <div className="text-center">
                                                <h4 className="font-weight-normal m-0">Tenure</h4>
                                                <hr className="mt-1 mb-2"/>
                                                <h5 className="font-weight-normal">{props.cacheAmountList[key].duration} mos</h5>
                                            </div>
                                        </div>
                                        <div className="form-group text-center mt-2 mb-0">
                                            {/* Button to display details */}
                                            <button className="btn btn-primary btn-block font-weight-bold" onClick={props.getLoanDetails.bind(this, props.cacheAmountList[key].amount, props.cacheAmountList[key].duration)}>
                                                Show
                                            </button>
                                            {/* Button to delete from cache */}
                                            <button className="btn btn-danger btn-block font-weight-bold" onClick={props.deleteCacheAmount.bind(this, key)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
    //  Main return - returns entire sidebar
    return (
        <div id="sidebarMenu" className="sidebar">
            <div className="h-100 d-flex flex-column">
                <div className="p-2 d-flex align-items-center justify-content-center h-60px text-light bg-secondary">
                    <h3 className="font-weight-normal m-0">Previously Searched</h3>
                    {/* Collapse sidebar displayed only in mobile view */}
                    <h4 className="collapse-sidebar">
                        <div onClick={props.collapseSidebar} className="close">&times;</div>
                    </h4>
                </div>
                {/* Display for cached amounts and duration */}
                <div className="flex-grow-1 overflow-auto pt-3">
                    {cacheAmountDisplay}
                </div>
            </div>
        </div>
    );
};
//  default export
export default Sidebar;
