import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import validator from 'validator'
import firebase from '../firebase/config'



function Login() {
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(false)
    const history = useHistory()


    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: function (response) {
                    console.log("Captcha Resolved");
                    onSignInSubmit();
                },
                defaultCountry: "IN",
            }
        );
    };

    const onSignInSubmit = (e) => {
        e.preventDefault();
        if (validator.isMobilePhone(phone)) {
            setUpRecaptcha();
            let phoneNumber = "+91" + phone;
            console.log(phoneNumber);
            let appVerifier = window.recaptchaVerifier;
            firebase
                .auth()
                .signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(function (confirmationResult) {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    // console.log(confirmationResult);
                    console.log("OTP is sent");
                    setError(false);
                    localStorage.setItem('phoneNumber','+91'+phone)
                    history.push('/otp-login')


                })
                .catch(function (error) {
                    console.log(error);
                    setError(true)
                });
        } else {
            setError(true)
        }
    };

    

    return (
        <div>

            <div className="form-1">
                <div className="logo-form">
                    <img src="" alt='' />
                </div>
                <div className="form-register" id="loginFormInput">
                    <h1 className="form-1-title">Sign-In or Register </h1>

                    <div className="form-1-div firstform">
                        <input type="tel" name="phone" className="form-1-input " placeholder=" " id="mobile-number"
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                        <label className="form-1-label">Mobile Number</label>
                    </div>
                    <div className="form-1-div secondform">
                        <input type="num" name="otp" className="form-1-input" placeholder=" " />
                        <label className="form-1-label">Enter OTP</label>
                    </div>
                    {error && <p style={{ color: 'red' }}>Please enter a valid phone number</p>}
                    <p style={{ margin: '1rem 0' }}>By continuing, you agree to our <a href="/">terms and conditions</a></p>


                    <div className="form-btn-div secondform">
                        <button className=" form-1-button" >Login</button>
                    </div>

                    <div className="form-btn-div firstform">
                        <button className="form-1-button request-otp-btn" onClick={onSignInSubmit}>Request OTP</button>
                    </div>


                </div>

            </div>
            <div id='recaptcha-container'></div>

        </div>
    )
}

export default Login

