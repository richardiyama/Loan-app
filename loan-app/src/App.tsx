import React, { useContext } from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import AdminPage from './Pages/AdminPage';
import Login from './Pages/Login';
import Profile from './Pages/PaystackValidate';
import Footer from './Components/Footer'
import LoanApp from './Pages/LoanApp'

import { myContext } from './Pages/Context';
import Registration from './Pages/Registration';
import PaystackValidate from './Pages/PaystackValidate';

function App() {
  const ctx = useContext(myContext);
 
  return (
    <BrowserRouter>
    <NavBar />
      <Switch>
        <Route path='/' exact component={Homepage}></Route>  
        
       
           
        {
            ctx ? (
              <>
                {ctx.isAdmin ? <Route path='/admin' component={AdminPage}></Route> : null}
                 
                <Route path='/loan-application' component={LoanApp}></Route>
                <Route path='/loan-request' component={PaystackValidate}></Route> 
              </>
            ) : (
              <>
              

                <Route path='/login' component={Login}></Route>  
                <Route path='/register' component={Registration}></Route>  
              </>  
            )
        }
        
    </Switch>
    <Footer/>
    </BrowserRouter>
  );
}
export default App;
