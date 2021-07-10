import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from '../Axios/Axios'


function OtpLogin() {
    const [otp, setOtp] = useState('')
    const [error, setError] = useState(false)
    const history = useHistory()

    const onSubmitOtp = (e) => {
        e.preventDefault();
        let otpInput = otp;
        let optConfirm = window.confirmationResult;
        // console.log(codee);
        optConfirm
            .confirm(otpInput)
            .then(function (result) {
                // User signed in successfully.
                // console.log("Result" + result.verificationID);
                //let user = result.user;
                var phone = localStorage.getItem('phoneNumber')
                Axios.post('/CurrentUser/Register.php', {
                    "mobile": phone,
                    "version": "1"
                }).then((res) => {
                    console.log(res.data)
                    setError(false);
                    var data = res.data
                    if (data.EmailSpecified === false) {
                        history.push('/new-user')
                    } else {
                        history.push('/')
                    }
                }).catch((err) => {
                    console.log(err);
                })
            })
            .catch(function (error) {
                console.log(error);
                console.log("Incorrect OTP");
                setError(true)
            });
    };

    return (
        <div className="form-1">
            <div className="logo-form">
                <img src="" alt='' />
            </div>
            <div className="form-register" id="loginFormInput">
                <h1 className="form-1-title">Sign-In or Register </h1>

                <div className="form-1-div">
                    <input type="num" name="otp" className="form-1-input" placeholder=" "
                        onChange={(e) => {
                            setOtp(e.target.value);
                        }}
                    />
                    <label className="form-1-label">Enter OTP</label>
                </div>
                {error && <p style={{ color: 'red' }}>Please enter a valid OTP</p>}

                <input type="submit" name="submit" value="Continue" className="form-1-button " onClick={onSubmitOtp} />
            </div>
        </div>
    )
}

export default OtpLogin
