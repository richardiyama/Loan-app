import React from 'react';
  import { usePaystackPayment } from 'react-paystack';
  import '../style.css'


  
  const config = {
      reference: (new Date()).getTime(),
      email: "user@example.com",
      amount: 1000,
      publicKey: 'pk_test_f04d5963636867191bb9156989fa3864890029ae',
  };
  

  // you can call this function anything
  const onSuccess = (reference) => {
    //const history = useHistory()
    // Implementation for whatever you want to do with reference and after success call.
    window.location.href = "/loan-application"
    
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const PaystackHookExample = () => {
      const initializePayment = usePaystackPayment(config);

      return (
        <div>
            <button onClick={() => {
                initializePayment(onSuccess, onClose)
                
            }}>Process card details</button>
        </div>
      );
  };
  
  function PaystackValidate() {
    return (
      
      <div className='wrapper'>
               <div className='form-wrapper'>
           <p>Please click the button below to process your card details</p>

           <br/>

           <br/>
        
        <PaystackHookExample />
        </div>
      </div>
    );
  }
  
  export default PaystackValidate;