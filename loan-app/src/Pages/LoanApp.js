import React, {Component} from 'react';
import '../App.css';
//  Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
//  Child components
import Sidebar from './Sidebar';
import LoanHeader from './LoanHeader'
import Loan  from'./Loan';
import LoanDetails from './LoanDetails';
import ErrorMessage from "./ErrorMessage";
//  Axios for AJAX calls
import Axios from 'axios';

class LoanApp extends Component {
    constructor(props) {
        super(props);
        //  State
        this.state = {
            //  Values
            loanAmount: 500,
            loanDuration: 6,
            loanDetails: null,
            errorMessage: 'Something went wrong. Please try again.',
            cacheAmountList: JSON.parse(localStorage.getItem('loan-amount-cache')),

            //  Flags
            displayFlag: 0
        };
    };
    //  Function to get details from cache or API
    getLoanDetails = (loanAmount, loanDuration) => {
        if(loanAmount && loanDuration) {
            //  Pre loader
            this.setState({displayFlag: 1});
            //  Check if details exist in cache, if yes display without calling API
            if(localStorage.getItem('loan-amount-cache')) {
                if(this.state.cacheAmountList[loanAmount + '-' + loanDuration]) {
                    this.setState({loanDetails: this.state.cacheAmountList[loanAmount + '-' + loanDuration].data});
                    this.setState({displayFlag: 2});
                    return;
                }
            }
            //  Call API for details
            let url = 'https://ftl-frontend-test.herokuapp.com/interest?amount='+loanAmount+'&numMonths='+loanDuration;
            Axios.get(url).then(response => {
                //  Check response for error, if error change displayFlag and display error
                if(response.data.status) {
                    this.setState({errorMessage: 'Invalid Request'});
                    this.setState({displayFlag: 3});
                }
                //  If valid response, change displayFlag and display details
                else {
                    //  Cache response
                    let loanAmountCache = {};
                    if(localStorage.getItem('loan-amount-cache')) {
                        loanAmountCache = JSON.parse(localStorage.getItem('loan-amount-cache'));
                    }
                    loanAmountCache[loanAmount + '-' + loanDuration] = {
                        'amount': loanAmount,
                        'duration': loanDuration,
                        'data': response.data
                    };
                    localStorage.setItem('loan-amount-cache', JSON.stringify(loanAmountCache));
                    //  Set state to update sidebar
                    this.setState({cacheAmountList: JSON.parse(localStorage.getItem('loan-amount-cache'))});
                    //  Display details
                    this.setState({loanDetails: response.data});
                    this.setState({displayFlag: 2});
                }
            }).catch(error => {
                //  If API fails, display error
                this.setState({errorMessage: error.message});
                this.setState({displayFlag: 3});
            });
        }
    };
    //  Function to delete an amount from cache
    deleteCacheAmount = (objKey) => {
        //  Update local storage and set state to update sidebar
        let cacheAmountList = JSON.parse(localStorage.getItem('loan-amount-cache'));
        delete cacheAmountList[objKey];
        localStorage.setItem('loan-amount-cache', JSON.stringify(cacheAmountList));
        this.setState({cacheAmountList: JSON.parse(localStorage.getItem('loan-amount-cache'))});
    };
    //  Set state for changed loan amount in Loan
    changeLoanAmount = (e) => {
        this.setState({loanAmount: e.target.value});
    };
    //  Set state for changed loan duration in Loan
    changeLoanDuration = (e) => {
        this.setState({loanDuration: e.target.value});
    };
    //  Change displayFlag to take user back to Loan
    displayForm = () => {
        this.setState({displayFlag: 0});
    };
    //  Function to extend sidebar in mobile view
    extendSidebar = () => {
        let sidebar = document.getElementById('sidebarMenu');
        sidebar.classList.toggle('show-sidebar');
        sidebar.classList.toggle('hide-sidebar');
    };
    //  Function to collapse sidebar in mobile view
    collapseSidebar = () => {
        let sidebar = document.getElementById('sidebarMenu');
        sidebar.classList.toggle('hide-sidebar');
        sidebar.classList.toggle('show-sidebar');
    };
    //  Render
    render() {
        //  Variable to hold content as per displayFlag
        let displayContent = null;
        //  For displayFlag - 0, Show LoanAmountForm component
        if(this.state.displayFlag === 0) {
            displayContent = (
                <Loan
                    getLoanDetails={this.getLoanDetails}
                    changeLoanAmount={(event) => this.changeLoanAmount(event)}
                    changeLoanDuration={(event) => this.changeLoanDuration(event)}
                    loanAmount={this.state.loanAmount}
                    loanDuration={this.state.loanDuration}>
                </Loan>
            );
        }
        //  For displayFlag - 1, Show Preloader
        else if(this.state.displayFlag === 1) {
            displayContent = (
                <div>
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            );
        }
        //  For displayFlag - 2, Show LoanDetails component - Loan Details
        else if(this.state.displayFlag === 2) {
            displayContent = (
                <LoanDetails
                    loanDetails={this.state.loanDetails}
                    displayForm={this.displayForm}>
                </LoanDetails>
            );
        }
        //  For displayFlag - 0, Show ErrorMessage component - Error
        else if(this.state.displayFlag === 3) {
            displayContent = (
                <ErrorMessage
                    errorMessage={this.state.errorMessage}
                    displayForm={this.displayForm}>
                </ErrorMessage>
            );
        }
        //  Return layout
        return(
            <div>
                {/* Sidebar */}
                <Sidebar
                    cacheAmountList={this.state.cacheAmountList}
                    getLoanDetails={this.getLoanDetails}
                    deleteCacheAmount={this.deleteCacheAmount}
                    collapseSidebar={this.collapseSidebar}
                >
                </Sidebar>
                {/* Main content */}
                <div className="content">
                    {/* Header */}
                    <LoanHeader
                        extendSidebar={this.extendSidebar}
                    >
                    </LoanHeader>
                    {/* Loan / LoanDetails / ErrorMessage / PreLoader */}
                    <div className="container-fluid">
                        {displayContent}
                    </div>
                </div>
            </div>
        )
    }
}
//  default export
export default LoanApp;