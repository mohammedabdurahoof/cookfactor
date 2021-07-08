import React from 'react'

function Header() {
    return (
        <header className="header home">
            <div className="navhome">
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-12 ">
                        <div className="logo ">
                            <a href="index.html"><h1>Name</h1></a>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7 col-9 ">
                        <div className="search-box">
                            <form className="form-group has-search">
                                <button type="submit" className="form-control-feedback search-btn">
                                    <i className="bi bi-search"></i>
                                </button>
                                <input type="text" className="form-control search-input" placeholder="Search" />
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-3">
                        <div className="nav-menu">
                            <div className="profile">
                                <a href="profile.html" className="profile-link">
                                    <div className="profile-box">

                                    </div>
                                    <p>Name</p>
                                </a>
                            </div>

                            <button className=" log-in" style={{ display: 'none' }}>
                                <i className="bi bi-box-arrow-in-right"></i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
