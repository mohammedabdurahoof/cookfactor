import React from 'react'
import Slider from "react-slick";

function Checkout() {
    var settings1 = {
        infinite: false,
        swipeToSlide: true,
        speed: 50,
        centerMode: false,
        variableWidth: true
    };

    var settings2 = {
        infinite: false,
        swipeToSlide: true,
        centerMode: false,
        speed: 50,
        variableWidth: true
    };

    return (
        <div className="container">
            <div className="check-out-head">
                <h3>Checkout</h3>
            </div>
            <div className="row">
                <div className="col-lg-8 col-md-12 mb-3">
                    <div className="delivery-type-box cf-border">
                        <div className="delivery-type-box-content">
                            <div className="option-box">
                                <label className="cont-box first"><span>Pickup From Store</span>
                                    <input type="radio" checked="checked" name="delivery" />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="cont-box "><span>Home Delivery</span>
                                    <input type="radio" name="delivery" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="delivery-slot">
                        <h4 className="sub-head">Delivery Slots(Mon, 21 Feb 2021)</h4>
                        <Slider {...settings1} className="delivery-slot-boxes">
                            <button className="delivery-slot-box cf-border">Immediate </button>
                            <button className="delivery-slot-box cf-border">Morning Slot (07:00AM - 10:00AM)</button>
                            <button className="delivery-slot-box cf-border">Afternoon Slot (11:00AM - 02:00PM)</button>
                            <button className="delivery-slot-box cf-border">Evening Slot (04:00PM - 07:00PM)</button>
                        </Slider>
                    </div>
                    <div className="address-block">
                        <div className="myaddress">
                            <h4 className="sub-head">My Addresses</h4>
                            <button className="delivery-button"><span className="material-icons">add_location_alt</span>Add New Address</button>
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
                                            <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{ stroke: 'white', fill: 'white' }}></path>
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
                        <Slider {...settings2} className="address-boxes">
                            <div className="address-box cf-border " style={{width: '250px'}} >
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
                            </div>
                            <div className="address-box cf-border " style={{width: '250px'}} >
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
                            </div>
                            <div className="address-box cf-border " style={{width: '250px'}} >
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
                            </div>
                            <div className="address-box cf-border " style={{width: '250px'}} >
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
                            </div>
                        </Slider>
                    </div>
                    <div className="payment-block cf-border">
                        <div className="option-box">
                            <label className="cont-box first"><span>Cash on Delivery</span>
                                <input type="radio" checked="checked" name="pay" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="cont-box "><span>Pay Online</span>
                                <input type="radio" name="pay" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="summary">
                        <h4 className="">Summary</h4>
                    </div>
                    <div className="order-summary-table">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="head-table">
                                    <a href="/"><p className="bold">AFGHAN CHICKEN</p></a>
                                </div>
                            </div>
                            <div className="col-md-6 col-6">
                                <div className="order-summary-table-content">
                                    <p >QTY:</p>
                                    <p className="bold"> 1</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-6">
                                <div className="order-summary-table-content">
                                    <p >Price:</p>
                                    <p className="bold">₹262</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-6">
                                <div className="order-summary-table-content">
                                    <p >Cleaning:</p>
                                    <p className="bold">₹8</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-6">
                                <div className="order-summary-table-content">
                                    <p >Skin Removal:</p>
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
                            <div className="order-summary-total">
                                <p>Total Price : ₹300</p>
                            </div>
                        </div>
                    </div>
                    <div className="place-order" >
                        <div className="place-order-price">
                            <p>₹300</p>
                        </div>
                        <a className="place-order-button" href="success.html"><p>Place Order</p></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
