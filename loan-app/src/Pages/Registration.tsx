import React,{useState} from "react"
import axios, { AxiosResponse } from 'axios'
import { useHistory,Link } from "react-router-dom";
import '../style.css';



 
function Registration(){

    const [fullName, setFullname] = useState<string>("")
    const[email,setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [bvn, setBvn] = useState<string>("")
    const history = useHistory();
    const register = (e: any) => {

      e.preventDefault();

      

        const informations ={
          fullName,
          email,
          password,
          phone,
          bvn
        }
        axios.post("https://rubikpa.herokuapp.com/register", informations,{
          
          headers: {'Content-Type' : 'application/json'},
          withCredentials: true
          
        }).then((res : AxiosResponse) => {
          console.log(informations);
          if (res.data === "success") {
          history.push('/login');
          alert("We received your details")
          console.log(bvn)
         }if(res.data == "User Already Exists"){
          alert("User Already Exists")
         }if(res.data == "Improper Values"){
          alert("Improper Values")
         }

        })
      }
    
 

  

    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
           <h2>Sign Up</h2>
           <form onSubmit={register}>
             <div className='fullname'>
                 <label htmlFor="fullName">Full Name</label>
                 <input required type='text' name='fullName' onChange={e => setFullname(e.target.value)}/>
                  
</div>
              <div className='email'>
                 <label htmlFor="email">Email</label>
                 <input required type='email' name='email' onChange={e => setEmail(e.target.value)}/>

</div>

<div className='phone'>
                 <label htmlFor="phone">Mobile Number</label>
                 <input required type='text' name='phone' onChange={e => setPhone(e.target.value)}/>

</div>

<div className='bvn'>
                 <label htmlFor="bvn">Bvn</label>
                 <input required type='number' name='bvn' onChange={e => setBvn(e.target.value )}/>

</div>
              <div className='password'>
                 <label htmlFor="password">Password</label>
                 <input required type='password' name='password' onChange={e => setPassword(e.target.value)}/>
                
</div>              
              <div className='submit'>
                 <button type="submit" value="submit" name="submit">Register</button>
                 <p>Already Registered?<Link className="nav-link" to="/login">Login</Link></p>
              </div>
              </form>
     </div>
     
  </div>
 )


}

export default Registration