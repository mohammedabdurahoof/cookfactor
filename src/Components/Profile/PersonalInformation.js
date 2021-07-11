import React, { useState } from 'react'
import Axios from '../../Axios/Axios'

function PersonalInformation() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const savInfo = ()=>{
    var phone = localStorage.getItem('phoneNumber')
        Axios.post('/CurrentUser/SaveUserInfo.php',{
            "mobile": phone,
            "version": "1",
            "name": name,
            "email": email
        }).then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="tab-pane   active " id="myInfo" role="tabpanel" ariaLabel="myInfo">
            <h5 className="tab-head">Edit my info</h5>
            <div className="account cf-border mobile">
                <div className="account-details">
                    <h5>Name</h5>
                    <p>example@gmail.com</p>
                    <p>+91 9343895110</p>
                </div>
            </div>
            <div className="edit-my-info" id="userNewForm">
                <p style={{ color: '#787777', fontWeight: '500' }}>Please fill the details to continue</p>
                <div className="form-1-div mb-4">
                    <input type="text" name="username" className="form-1-input " placeholder=" " onChange={(e)=>setName(e.target.value)} />
                    <label className="form-1-label">Your Name</label>
                </div>
                <div className="form-1-div mb-3">
                    <input type="email" name="email" className="form-1-input " placeholder=" " onChange={(e)=>setEmail(e.target.value)} />
                    <label className="form-1-label">Email address</label>
                </div>
                <input type="submit" name="submit" value="Save" className="edit-my-info-button " onClick={savInfo} />
            </div>
        </div>
    )
}

export default PersonalInformation
