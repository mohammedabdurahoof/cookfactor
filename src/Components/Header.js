import React from 'react'
import { useHistory } from 'react-router-dom'

function Header() {
    const history = useHistory()
    return (
        <header>
            <div className="container">
                <div className="back">
                    <div onClick={()=>history.push('/')} style={{cursor:'pointer'}} ><i className="bi bi-arrow-left"></i><span className="web">Back to home</span></div>
                    <h1 className="check-out-logo">Name</h1>
                </div>
            </div>
        </header>
    )
}

export default Header
