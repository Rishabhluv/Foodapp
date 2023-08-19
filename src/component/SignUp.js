import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    let navigate = useNavigate();
    const [credential, setcredential] = useState({name:"",email:"",password:"",geolocation:""})
    const handleclick = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password,location:credential.geolocation})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken)
            navigate("/login")
        }else{
            alert("Enter Valid Credential")
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credential.name} onChange={onchange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credential.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={onchange} name='password' value={credential.password}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" onChange={onchange} name='geolocation' value={credential.geolocation}/>
                    </div>
                    <button type="submit" className=" m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
                </form>
            </div>
        </>
    )
}

export default SignUp
