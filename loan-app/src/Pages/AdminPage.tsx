import React, { useEffect, useState, useContext } from 'react'
import Axios, { AxiosResponse } from 'axios'
import { myContext } from './Context';
import { UserInterface } from '../interfaces/interfaces';

export default function AdminPage() {
  const ctx = useContext(myContext);
  
  const [data, setData] = useState<UserInterface[]>();
  const [selectedUser, setSelectedUser] = useState<string>();
  useEffect(() => {
    Axios.get("https://rubikpa.herokuapp.com/getallusers", {
      withCredentials: true
    }).then((res : AxiosResponse) => {
      setData(res.data.filter((item : UserInterface) => {
        return item.fullName !== ctx.fullName
      }))
    })
  }, [ctx]);
  if (!data) {
    return null;
  }
  

  const deleteUser = () => {
    let userid : string;
    data.forEach((item: UserInterface) => {
      
      if (item.fullName === selectedUser) {
        userid = item.id;
      }
    })
    
    Axios.post("https://rubikpa.herokuapp.com/deleteuser", {
      id: userid!
    }, {
      withCredentials: true
    });
  }

  return (
    <div>
      <h1>Admin Page, Only Admin's Can See This!</h1>
      <select onChange={e => setSelectedUser(e.target.value)} name="deleteuser" id="deleteuser">
      <option id="Select a user">Select A User</option>
        {
          data.map((item : UserInterface) => {
            return (
              <option key={item.fullName} id={item.fullName}>{item.fullName}</option>
            )
          })
        }
      </select>
      <button onClick={deleteUser}>Delete User</button>
    </div>
  )
}
