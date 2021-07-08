import React from 'react'

function OtpLogin() {
    return (
        <div className="form-1">
            <div className="logo-form">
                <img src="" alt='' />
            </div>
            <form className="form-register" id="loginFormInput">
                <h1 className="form-1-title">Sign-In or Register </h1>

                <div className="form-1-div">
                    <input type="num" name="otp" className="form-1-input" placeholder=" " />
                    <label className="form-1-label">Enter OTP</label>
                </div>

                <input type="submit" name="submit" value="Continue" className="form-1-button " />
            </form>
        </div>
    )
}

export default OtpLogin
