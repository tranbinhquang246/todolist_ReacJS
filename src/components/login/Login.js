import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import img_login from '../../assets/img_login.webp'
import md5 from "md5"
import axios from 'axios'


function Login() {

    const navigate = useNavigate();
    const [emailInput, setEmailinput] = useState('');

    const [passwordInput, setPasswordinput] = useState('');

    const [alertInfo, setAlertInfo] = useState('');

    const handleChangeEmail = e => {
        setEmailinput(e.target.value);
    }

    const handleChangePassword = e => {
        setPasswordinput(e.target.value);
    }

    function ValidateEmail(mail) 
        {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
            return (false)
        }

    const handleClickLogin = async () => {    

        if (emailInput === '' || passwordInput === '') {
            setAlertInfo("Please enter all fields");
        } else if(ValidateEmail(emailInput)===false) {
            setAlertInfo("Email is not valid");
        }else{
            axios.post('http://localhost:8080/login', {
                "email": emailInput,
                "password": md5(passwordInput)
            })
                .then(function (response) {
                    if(response.data === "Login failed. Password is incorrect"){
                        setAlertInfo(response.data);
                    }else{
                        setAlertInfo(" ");
                        setEmailinput('');
                        setPasswordinput('',{email: emailInput});
                        navigate('/home', {
                            state: {
                                email: emailInput
                        }});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

    }
  return (
    <div className="md:flex justify-center items-center h-screen w-screen bg-gradient-to-b from-slate-500 to-orange-300" >
        <div className="md:flex justify-center items-center w-3/5 h-4/5 bg-background-login rounded-xl">
            <img className="w-1/3 h-1/2" src={img_login} alt="Login" />
            <div className="w-1/3 h-full flex flex-col items-center justify-center  ">
                <span className="text-2xl font-poppins p-5 font-medium normal-nums antialiased">Member Login</span>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
                        value={emailInput} onChange={handleChangeEmail}/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"
                        value={passwordInput} onChange={handleChangePassword} />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="button" onClick={handleClickLogin}>
                            Log In
                        </button>
                    </div>
                    <p className="text-red-600 mt-3 font-poppins text-sm font-bold">{alertInfo}</p>
                    <div className="mt-8 w-full font-poppins text-sm" >
                        <Link to="/signin" className="hover:text-blue-500 cursor-pointer">Create a new account</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login