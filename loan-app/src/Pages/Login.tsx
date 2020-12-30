import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import '../style.css';
import { useHistory } from "react-router-dom";



export default function Login() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const history = useHistory();
 

  const login = (e: any) => {

    e.preventDefault();

     const infors ={
          username,
          password
        }
        axios.post("https://rubikpa.herokuapp.com/login", infors,{
          
      headers: {'Content-Type' : 'application/json'},
      withCredentials: true
    }).then((res : AxiosResponse) => {
      if (res.data === "success") {
         
        history.push('/loan-request');
     }
    }, () => {
      console.log("Failure");
    })
  }

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
         <h2>Sign In</h2>
         <form onSubmit={login}> 
            

<div className='phone'>
               <label htmlFor="phone">Mobile Number</label>
               <input required type='text' name='username' onChange={e => setUsername(e.target.value)}/>

</div>


            <div className='password'>
               <label htmlFor="password">Password</label>
               <input required type='password' name='password' onChange={e => setPassword(e.target.value)}/>
              
</div>              
            <div className='submit'>
               <button type="submit" value="submit" name="submit">Login</button>
            </div>
       </form>
   </div>
</div>
)


}
