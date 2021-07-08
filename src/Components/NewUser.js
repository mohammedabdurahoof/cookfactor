import React from 'react'

function NewUser() {
    return (
        <div className="form-1">
            <div className="logo-form">
                <img src="" alt='' />
            </div>
            <form className="form-register" id="userNewForm">
                <h1 className="form-1-title">Enter your details </h1>

                <div className="form-1-div">
                    <input type="text" name="username" className="form-1-input " placeholder=" " />
                    <label className="form-1-label">Your Name</label>
                </div>

                <div className="form-1-div">
                    <input type="email" name="email" className="form-1-input " placeholder=" " />
                    <label className="form-1-label">Email address</label>
                </div>

                <input type="submit" name="submit" value="Continue" className="form-1-button " />
            </form>
        </div>
    )
}

export default NewUser
