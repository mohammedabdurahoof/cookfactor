import React from 'react'
import { useHistory } from 'react-router-dom'

function Success() {
    const history = useHistory()
    return (
        <div className="container">
            <div className="success-page">
                <div className="success-page-content ">
                    <div className="tick ">
                        <i className="fas fa-check"></i>
                    </div>
                    <h4>Order Success</h4>
                    {/* <p>Order Number :2021-0000009</p> */}
                    <a onClick={()=>history.push('/')} style={{cursor:'pointer'}} >Back to Home</a>
                </div>
            </div>
        </div>
    )
}

export default Success