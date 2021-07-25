import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import validator from 'validator'
import Axios from '../Axios/Axios'
import logo from '../assets/images/logo.jpg'

function NewUser() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [userNameError, setUserNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const history = useHistory()

    const submit = () => {
        if (validator.isEmail(email)) {
            Axios.post("CurrentUser/SaveUserInfo.php", {
                "mobile": localStorage.getItem('phoneNumber'),
                "version": "1",
                "name": userName,
                "email": email
            }).then((res) => {
                console.log(res.data);
                setUserNameError(false)
                history.push('/')
            }).catch((err) => {
                console.log(err);
                setUserNameError(true)
            })
            setEmailError(false);
        } else {
            setEmailError(true);
        }

    }

    return (
        <div className="form-1">
            <div className="logo-form">
                <img src="" alt='' />
            </div>
            <div className="form-register" id="userNewForm">
                    <div className="logo-img">
                        <img src={logo} alt="logo" />
                    </div>

                <h1 className="form-1-title">Enter your details </h1>

                <div className="form-1-div">
                    <input type="text" name="username" className="form-1-input " placeholder=" "
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                    <label className="form-1-label">Your Name</label>
                </div>
                {userNameError && <p style={{ color: 'red' }}>Please enter a valid username</p>}

                <div className="form-1-div">
                    <input type="email" name="email" className="form-1-input " placeholder=" "
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <label className="form-1-label">Email address</label>
                </div>
                {emailError && <p style={{ color: 'red' }}>Please enter a valid Email address</p>}

                <input type="submit" name="submit" value="Continue" onClick={submit} className="form-1-button " />
            </div>
        </div>
    )
}

export default NewUser
