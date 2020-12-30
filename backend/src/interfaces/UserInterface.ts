export interface UserInterface {
    fullName: string;
    email:string;
    phone:string;
    bvn:string;
    password: string;
    isAdmin: boolean;
    id: string;
  }
  
  export interface DatabaseUserInterface {
    fullName: string;
    email:string;
    phone:string;
    bvn:string;
    password: string;
    isAdmin: boolean;
    _id: string;
  }