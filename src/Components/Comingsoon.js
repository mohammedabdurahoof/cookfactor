import React from 'react'
import { useEffect } from 'react';

function Comingsoon() {
    useEffect(() => {
        document.body.style.background = "#254441";
        return () => {
            document.body.style.background = null;
        }
    }, [])
    
    return (
        <div className="body">
            <div className="wrapper">
                <h1>coming soon<span className="dot">.</span></h1>


            </div>
        </div>

    )
}

export default Comingsoon
