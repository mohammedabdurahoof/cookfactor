import React from 'react'

function Header() {
    return (
        <header>
            <div className="container">
                <div className="back">
                    <a href="index.html"><i className="bi bi-arrow-left"></i><span className="web">Back to home</span></a>
                    <h1 className="check-out-logo">Name</h1>
                </div>
            </div>
        </header>
    )
}

export default Header
