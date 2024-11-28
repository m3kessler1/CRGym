import axios from 'axios';

export const registerUser = async(data:any)=>{
  console.log("Submitted Data:", data);
       try{
          const response = axios.post(`${process.env.REACT_APP_USER_URL}/register`,data);
          return response;
       }catch(error){
          console.log("Logging Failed: ",error);
          throw error;
       }
};


