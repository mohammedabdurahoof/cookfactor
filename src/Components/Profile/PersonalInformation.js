import React, { useState } from 'react'
import Axios from '../../Axios/Axios'
import validator from 'validator'


function PersonalInformation(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    var phone = localStorage.getItem('phoneNumber')

    const savInfo = ()=>{
        if (validator.isEmail(email)) {
        Axios.post('/CurrentUser/SaveUserInfo.php',{
            "mobile": phone,
            "version": "1",
            "name": name,
            "email": email
        }).then((res)=>{
            console.log(res.data);
            props.refresh()
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        setError(true)
    }
    }

    return (
        <div className="tab-pane   active " id="myInfo" role="tabpanel" ariaLabel="myInfo">
            <h5 className="tab-head">Edit my info</h5>
            <div className="account cf-border mobile">
                <div className="account-details">
                    <h5>{props.user.name}</h5>
                    <p>{props.user.email}</p>
                    <p>{phone}</p>
                </div>
            </div>
            <div className="edit-my-info" id="userNewForm">
                <p style={{ color: '#787777', fontWeight: '500' }}>Please fill the details to continue</p>
                <div className="form-1-div mb-4">
                    <input type="text" name="username" className="form-1-input " placeholder={props.user.name} onChange={(e)=>setName(e.target.value)} />
                    {/* <label className="form-1-label">Your Name</label> */}
                </div>
                <div className="form-1-div mb-3">
                    <input type="email" name="email" className="form-1-input " placeholder={props.user.email} onChange={(e)=>setEmail(e.target.value)} />
                    {/* <label className="form-1-label">Email address</label> */}
                </div>
                {error && <p style={{ color: 'red' }}>Please enter a valid Email</p>}
                <input type="submit" name="submit" value="Save" className="edit-my-info-button " onClick={savInfo} />
            </div>
        </div>
    )
}

export default PersonalInformation
