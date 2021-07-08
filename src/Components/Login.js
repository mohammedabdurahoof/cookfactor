import React from 'react'

function Login() {
    return (
        <div className="form-1">
            <div className="logo-form">
                <img src="" alt=''/>
            </div>
            <div className="form-register" id="loginFormInput">
                <form className="" >
                    <h1 className="form-1-title">Sign-In or Register </h1>

                    <div className="form-1-div firstform">
                        <input type="tel" name="phone" className="form-1-input " placeholder=" " id="mobile-number" />
                        <label className="form-1-label">Mobile Number</label>
                    </div>
                    <div className="form-1-div secondform">
                        <input type="num" name="otp" className="form-1-input" placeholder=" " />
                        <label className="form-1-label">Enter OTP</label>
                    </div>
                    <div id="recaptcha-div"></div>
                    <p style={{margin: '1rem 0'}}>By continuing, you agree to our <a href="/">terms and conditions</a></p>
                    {/* <!-- <input type="submit" name="submit" value="Continue" className="form-1-button "> --> */}

                    <div className="form-btn-div secondform">
                        <button className=" form-1-button" >Login</button>
                    </div>
                </form>
                <div className="form-btn-div firstform">
                    <button className="form-1-button request-otp-btn" onclick="login()">Request OTP</button>
                </div>
            </div>

        </div>
    )
}

export default Login
