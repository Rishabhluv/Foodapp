import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Login() {
    let navigate = useNavigate();
    const [credential, setcredential] = useState({email:"",password:""})
    const handleclick = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({email:credential.email,password:credential.password})
        })
        const json = await response.json();
        console.log(json);
        if(!json.success){
            alert("Invalid User Credential");
        }
        if(json.success){
            localStorage.setItem("userEmail",credential.email);
            localStorage.setItem("authToken",json.authtoken);
            console.log(localStorage.getItem("authToken"))
           navigate("/");
        }

    }
    const onchange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
    return (
        <>
            < div className='container'>

                <form onSubmit={handleclick}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credential.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={onchange} name='password' value={credential.password}/>
                    </div>
                    <button type="submit" className=" m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className='m-3 btn btn-danger'>I am a new User</Link>
                </form>
            </div>
        </>
    )
}

export default Login
