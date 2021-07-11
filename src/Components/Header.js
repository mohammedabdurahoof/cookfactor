import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from '../Axios/Axios'

function Header() {
    const history = useHistory()
    const [userName, setUserName] = useState('')
    useEffect(()=>{
        var phone = localStorage.getItem('phoneNumber')
        Axios.post('/CurrentUser/GetProfile.php',{
            "mobile": phone,
            "version": "1"
        }).then((res)=>{
            console.log(res.data.Data.UserInfo.name);
            setUserName(res.data.Data.UserInfo.name)
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    return (
        <header>
            <div className="container">
                <div className="back">
                    <div onClick={()=>history.push('/')} style={{cursor:'pointer'}} ><i className="bi bi-arrow-left"></i><span className="web">Back to home</span></div>
                    <h1 className="check-out-logo">{userName}</h1>
                </div>
            </div>
        </header>
    )
}

export default Header
