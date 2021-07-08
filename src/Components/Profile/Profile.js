import React from 'react'

function Profile() {
    return (
        <div className="container">
            <div className="row mt-5 " id="tabs">
                <div className="col-lg-4 col-md-4 col-12 ">
                    <div className="row">
                        <div className="account cf-border web">
                            <div className="account-details">
                                <h5>Name</h5>
                                <p>example@gmail.com</p>
                                <p>+91 9343895110</p>
                            </div>
                        </div>

                        <div className="nav  tab-section cf-border" role="tablist" aria-orientation="vertical">
                            <a className="nav-link active" id="my-info" data-toggle="pill" href="#myInfo" role="tab"
                                aria-controls="myInfo" aria-selected="true">
                                <div className="tab-button">
                                    <span className="mobile-tab mobile"><i className="bi bi-person"></i></span>
                                    <span className="web-tab">
                                        <p>Personal Information</p>
                                        <i className="bi bi-chevron-right"></i>
                                    </span>
                                </div>
                            </a>

                            <a className="nav-link  " data-toggle="pill" href="#v-pills-profile" role="tab"
                                aria-controls="v-pills-profile" aria-selected="false">
                                <div className="tab-button">
                                    <span className="mobile-tab mobile"><i className="bi bi-shop fs"></i></span>
                                    <span className="web-tab">
                                        <p>My Orders</p>
                                        <i className="bi bi-chevron-right"></i>
                                    </span>
                                </div>
                            </a>

                            <a className="nav-link  " data-toggle="pill" href="#myAddresses" role="tab"
                                aria-controls="myAddresses" aria-selected="false">
                                <div className="tab-button">
                                    <span className="mobile-tab mobile"><i className="bi bi-geo-alt fs"></i></span>
                                    <span className="web-tab">
                                        <p>My Addresses</p>
                                        <i className="bi bi-chevron-right"></i>
                                    </span>
                                </div>
                            </a>

                            <a className="nav-link  " data-toggle="pill" href="#v-pills-settings" role="tab"
                                aria-controls="v-pills-settings" aria-selected="false">
                                <div className="tab-button">
                                    <span className="mobile-tab mobile"><i className="bi bi-heart fs"></i></span>
                                    <span className="web-tab">
                                        <p>Favourites</p>
                                        <i className="bi bi-chevron-right"></i>
                                    </span>
                                </div>
                            </a>
                            <button className="mobile"><i className="bi bi-power "></i></button>
                        </div>
                        <div className="log-out cf-border web">
                            <button>Logout</button>
                        </div>
                    </div>
                </div>



                <div id="orderModal" className="modal">
                    <div className="modal-content">
                        <div className="order-modal">
                            <div className="container">
                                <div className="order-modal-top">
                                    <div className="order-modal-status">
                                        <p className="order-modal-status-main">Order Status</p>
                                        <p className="order-modal-status-text">Delivered</p>
                                    </div>
                                    <button className="close-btn"><i className="bi bi-x"></i></button>
                                </div>
                                <div className="order-summary">
                                    <div className="order-summary-table">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="head-table">
                                                    <a href="/">
                                                        <p className="bold">AFGHAN CHICKEN</p>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>QTY:</p>
                                                    <p className="bold"> 1</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>Price:</p>
                                                    <p className="bold">₹1</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>Cleaning:</p>
                                                    <p className="bold">₹0</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>Skin Removal:</p>
                                                    <p className="bold">₹0</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <p>Cutting:</p>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>Biriyani Cut</p>
                                                    <p className="bold">₹0.0</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order-summary-total">
                                            <p>Total Price : ₹262</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-box-main">
                                    <p className="order-info">Order Info</p>
                                    <div className="order-box-main-container">
                                        <p className="order-box-main-head">Order No</p>
                                        <p className="order-no-main-text">2021-000009</p>
                                    </div>
                                    <div className="order-box-main-container">
                                        <p className="order-box-main-head">Total Amount</p>
                                        <p className="order-no-main-text">₹ 262</p>
                                    </div>
                                    <div className="order-box-main-container">
                                        <p className="order-box-main-head">Order On</p>
                                        <p className="order-no-main-text">13/02/2020</p>
                                    </div>
                                    <div className="order-box-main-container">
                                        <p className="order-box-main-head">Payment Method</p>
                                        <p className="order-no-main-text">COD</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="orderModal" className="modal">
                    <div className="modal-content ">
                        <div className="order-modal ">
                            <div className="container">
                                <div className="order-modal-top">
                                    <div className="order-modal-status">
                                        <p className="order-modal-status-main">Order Status</p>
                                        <p className="order-modal-status-text">Delivered</p>
                                    </div>
                                    <button className="close-btn"><i className="bi bi-x"></i></button>
                                </div>
                                <div className="order-summary">
                                    <div className="order-summary-table">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="head-table">
                                                    <a href="/">
                                                        <p className="bold">AFGHAN CHICKEN</p>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>QTY:</p>
                                                    <p className="bold"> 1</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>Price:</p>
                                                    <p className="bold">₹262</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>Cleaning:</p>
                                                    <p className="bold">₹8</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>Skin Removal:</p>
                                                    <p className="bold">₹30</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <p>Cutting:</p>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p>Biriyani Cut</p>
                                                    <p className="bold">₹0.0</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order-summary-total">
                                            <p>Total Price : ₹300</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-box-main">
                                    <p className="order-info">Order Info</p>
                                    <div className="order-box-main-container">
                                        <p className="order-box-main-head">Order No</p>
                                        <p className="order-no-main-text">2021-000009</p>
                                    </div>
                                    <div className="order-box-main-container">
                                        <p className="order-box-main-head">Total Amount</p>
                                        <p className="order-no-main-text">₹ 300</p>
                                    </div>
                                    <div className="order-box-main-container">
                                        <p className="order-box-main-head">Order On</p>
                                        <p className="order-no-main-text">13/02/2020</p>
                                    </div>
                                    <div className="order-box-main-container">
                                        <p className="order-box-main-head">Payment Method</p>
                                        <p className="order-no-main-text">COD</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>






                <div className="col-md-8 margin-bottom-tab">

                    {/* <!-- Tabs content --> */}
                    <div className="tab-content">
                        <div className="tab-pane   active " id="myInfo" role="tabpanel" aria-labelledby="myInfo">
                            <h5 className="tab-head">Edit my info</h5>
                            <div className="account cf-border mobile">
                                <div className="account-details">
                                    <h5>Name</h5>
                                    <p>example@gmail.com</p>
                                    <p>+91 9343895110</p>
                                </div>
                            </div>
                            <form className="edit-my-info" id="userNewForm">
                                <p style={{color: '#787777', fontWeight: '500'}}>Please fill the details to continue</p>
                                <div className="form-1-div mb-4">
                                    <input type="text" name="username" className="form-1-input " placeholder=" " />
                                    <label className="form-1-label">Your Name</label>
                                </div>
                                <div className="form-1-div mb-3">
                                    <input type="email" name="email" className="form-1-input " placeholder=" " />
                                    <label className="form-1-label">Email address</label>
                                </div>
                                <input type="submit" name="submit" value="Save" className="edit-my-info-button " />
                            </form>
                        </div>

                        <div className="tab-pane " id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            <h5 className="tab-head">My Orders</h5>
                            <div className="row ">
                                <div className="col-md-6">
                                    <div className="order-box">
                                        <div className="container">
                                            <div className="order-box-top">
                                                <div className="order-no-top">
                                                    <p className="order-no-top-text">Order No:</p>
                                                    <p className="order-no-text">2021-000009</p>
                                                </div>
                                                <div className="delivery-status">
                                                    <p>Delivered</p>
                                                </div>
                                            </div>
                                            <div className="order-box-main">
                                                <div className="order-box-main-container">
                                                    <p className="order-box-main-head">Order No</p>
                                                    <p className="order-no-main-text">2021-000009</p>
                                                </div>
                                                <div className="order-box-main-container">
                                                    <p className="order-box-main-head">Total Amount</p>
                                                    <p className="order-no-main-text">₹ 262</p>
                                                </div>
                                                <div className="order-box-main-container">
                                                    <p className="order-box-main-head">Order On</p>
                                                    <p className="order-no-main-text">13/02/2020</p>
                                                </div>
                                                <div className="order-box-main-container">
                                                    <p className="order-box-main-head">Payment Method</p>
                                                    <p className="order-no-main-text">COD</p>
                                                </div>
                                            </div>
                                            <div className="order-box-bottom">
                                                <button className="order-summary-button">
                                                    Order Summary<i className="bi bi-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="order-box">
                                        <div className="container">
                                            <div className="order-box-top">
                                                <div className="order-no-top">
                                                    <p className="order-no-top-text">Order No:</p>
                                                    <p className="order-no-text">2021-000009</p>
                                                </div>
                                                <div className="delivery-status">
                                                    <p>Delivered</p>
                                                </div>
                                            </div>
                                            <div className="order-box-main">
                                                <div className="order-box-main-container">
                                                    <p className="order-box-main-head">Order No</p>
                                                    <p className="order-no-main-text">2021-000009</p>
                                                </div>
                                                <div className="order-box-main-container">
                                                    <p className="order-box-main-head">Total Amount</p>
                                                    <p className="order-no-main-text">₹ 262</p>
                                                </div>
                                                <div className="order-box-main-container">
                                                    <p className="order-box-main-head">Order On</p>
                                                    <p className="order-no-main-text">13/02/2020</p>
                                                </div>
                                                <div className="order-box-main-container">
                                                    <p className="order-box-main-head">Payment Method</p>
                                                    <p className="order-no-main-text">COD</p>
                                                </div>
                                            </div>
                                            <div className="order-box-bottom">
                                                <button className="order-summary-button">
                                                    Order Summary<i className="bi bi-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>

                        <div className="tab-pane " id="myAddresses" role="tabpanel" aria-labelledby="myAddresses">
                            <div className="address mb-3">
                                <h5 className="tab-head">My Addresses</h5>
                                <button className="delivery-button"><span className="material-icons">add_location_alt</span>Add New
                                    Address</button>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="delivery-box cf-border">
                                        <div className="select-icon">
                                            <i className="bi bi-check-square-fill"></i>
                                        </div>
                                        <div className="address-1">
                                            <h6>Kochi</h6>
                                        </div>
                                        <div className="address-2">
                                            <h6>Kaloor</h6>
                                        </div>
                                        <div className="address-3">
                                            <h6>jsndfi</h6>
                                        </div>
                                        <div className="Pincode">
                                            <h6>676122</h6>
                                        </div>
                                        <div className="delete-address">
                                            <button className="delete-address-btn">Delete</button>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="delivery-box cf-border">
                                        <div className="select-icon">
                                            <i className="bi bi-check-square-fill"></i>
                                        </div>
                                        <div className="address-1">
                                            <h6>Kochi</h6>
                                        </div>
                                        <div className="address-2">
                                            <h6>Kaloor</h6>
                                        </div>
                                        <div className="address-3">
                                            <h6>jsndfi</h6>
                                        </div>
                                        <div className="Pincode">
                                            <h6>676122</h6>
                                        </div>
                                        <div className="delete-address">
                                            <button className="delete-address-btn">Delete</button>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="delivery-box cf-border">
                                        <div className="select-icon">
                                            <i className="bi bi-check-square-fill"></i>
                                        </div>
                                        <div className="address-1">
                                            <h6>Kochi</h6>
                                        </div>
                                        <div className="address-2">
                                            <h6>Kaloor</h6>
                                        </div>
                                        <div className="address-3">
                                            <h6>jsndfi</h6>
                                        </div>
                                        <div className="Pincode">
                                            <h6>676122</h6>
                                        </div>
                                        <div className="delete-address">
                                            <button className="delete-address-btn">Delete</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="select-delivery modal">
                                <div className="modal-data cf-border">
                                    <h6 className="mb-4">Add New Address</h6>
                                    <div className="form-1-div ">
                                        <input type="" name="Address" className="form-1-input " placeholder="  " />
                                        <label className="form-1-label">Address Line 1</label>
                                    </div>
                                    <div className="form-1-div ">
                                        <input type="" name="Address" className="form-1-input " placeholder="  " />
                                        <label className="form-1-label">Address Line 2</label>
                                    </div>
                                    <div className="form-1-div ">
                                        <input type="" name="Address" className="form-1-input " placeholder="  " />
                                        <label className="form-1-label">Address Line 3</label>
                                    </div>
                                    <div className="form-1-div location-div ">
                                        <input type="" name="" className="form-1-input " placeholder="  " />
                                        <label className="form-1-label">Location</label>
                                        <span className="material-icons">gps_fixed</span>
                                    </div>
                                    <div className="pretty mt-2 p-svg p-curve">
                                        <input type="checkbox" />
                                        <div className="state p-success">
                                            {/* <!-- svg path --> */}
                                            <svg className="svg svg-icon" viewBox="0 0 20 20">
                                                <path
                                                    d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                                    style={{stroke: 'white',fill:'white'}}></path>
                                            </svg>
                                            <label>Set as Default Address</label>
                                        </div>
                                    </div>
                                    <div className="button-group d-flex ">
                                        <button className="save-btn">Save</button>
                                        <button className="cancel-btn">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                            <h5 className="tab-head">My Favourites</h5>
                            <div className="row ">
                                <div className="col-md-6 col-12 mb-4">
                                    <a href="/">
                                        <div className="product-box">
                                            <div className="product-image" style={{ backgroundImage: "url('images/image1.jpg')" }}>
                                            </div>
                                            <div className="product-desc">
                                                <div className="product-title">
                                                    <h5>CHICKEN GIZZARD-WHOLE FRESH </h5>
                                                </div>
                                                <div className="product-price">
                                                    <h6>₹<span>150</span></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="fav-remove ">
                                        <button className="fav-remove-button cf-border ">Remove from Favourites</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
