import React, {useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const host = "http://localhost:5000";
  const [credential, setCredential] = useState({name:"", email:"", password:"", cpassword:""}); 
  let navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {name,email,password} = credential;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
      //save the auth token and redirect
      localStorage.setItem('token',json.authToken);
      props.showAlert("Account Created Successfully","success")
      navigate("/");
    }
    else{
      props.showAlert("Invalid Entry","danger")
    }
  }

  const onChange = (e)=>{
    setCredential({...credential, [e.target.name]: e.target.value })
}

  return (
    <div className='container mt-2'>
      <h2>Create your Account</h2>
      <form onSubmit={handleSubmit} >
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name = "name" onChange={onChange} aria-describedby="emailHelp"/>
          
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name = "email" onChange={onChange} aria-describedby="emailHelp"/>
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password"  minLength={5} required onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword"  minLength={5} required onChange={onChange} />
        </div>
      
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
