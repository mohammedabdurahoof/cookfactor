import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Slider from "react-slick";
import Axios from '../../Axios/Axios'

function Checkout() {
    const [addresses, setAddresses] = useState([])
    const [deliverySlots, setDeliverySlots] = useState([])
    const [items, setItems] = useState([])
    const [total, setTotal] = useState([])
    const [overAlltotal, setOverAllTotal] = useState([])
    const [payment, setPayment] = useState('COD')
    const [pickup, setPickup] = useState(true)
    const [selectedAddress, setSelectedAddress] = useState({})
    const [selectedDeliverySlot, setSelectedDeliverySlot] = useState('')
    const history = useHistory()

    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [address3, setAddress3] = useState('')
    const [pincode, setPincode] = useState('')

    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')
        if (phone) {
            Axios.post('/CurrentUser/GetCheckoutData.php', {
                "mobile": phone,
                "version": "1"
            }).then((res) => {
                console.log(res.data);
                setAddresses(res.data.Data.Addresses)
                setDeliverySlots(res.data.Data.DeliverySlots)
                setItems(res.data.Data.Items)
                var itm = res.data.Data.Items
                var allSum = []
                for (let i = 0; i < itm.length; i++) {
                    var sum = itm[i].quantity * itm[i].price + parseFloat(itm[i].cleaning_charge )+ parseFloat(itm[i].skin_removal_charge) + parseFloat(itm[i].cutting_charge)
                    console.log(sum);
                    allSum.push(sum)
                }
                console.log(allSum);
                setTotal(allSum)

                var overAll = 0
                allSum.forEach(item => {
                    overAll += item
                });
                setOverAllTotal(overAll)

            }).catch((err) => {
                console.log(err);
            })
        } else {
            history.push('/login')
        }

    }, [])

   // setTotal([...total, sum]);
    console.log(total);

    const placeOrder = () => {

        var phone = localStorage.getItem('phoneNumber')
        if (payment === 'COD') {
            console.log('COD');
            Axios.post('/CurrentUser/CreateOrder.php', {
                "mobile": phone,
                "version": "1",
                "delivery_type": pickup ? "P" : "D",
                "address_reference": pickup ? "0" : selectedAddress,
                "deliveryslot_reference": pickup ? "0" : selectedDeliverySlot,
                "payment_method": "COD"
            }).then((res) => {
                console.log(res.data);
                history.push('/success')
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log('OPG');
            Axios.post('/CurrentUser/InitPayment.php', {
                "mobile": phone,
                "version": "1",
                "delivery_type": pickup ? "P" : "D",
                "address_reference": pickup ? "0" : selectedAddress,
                "deliveryslot_reference": pickup ? "0" : selectedDeliverySlot,
                "payment_method": "PayOnline"
            }).then((res) => {
                console.log(res.data.Data.Summary.TransactionNo);
                window.location.replace(`https://api.teaknet.org/cookfactor/mobileapi/CurrentUser/MakePayment.php?transaction_no=${res.data.Data.Summary.TransactionNo}`)
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    var showAddAddress = (e) => {
        document.getElementById('select-delivery').className += " active"
    }

    var cancelAddress = () => {
        document.getElementById('select-delivery').classList.remove("active")
    }

    var saveAddress = () => {
        document.getElementById('select-delivery').classList.remove("active")
        var phone = localStorage.getItem('phoneNumber')
        Axios.post('/CurrentUser/SaveAddress.php', {
            "mobile": phone,
            "version": "1",
            "id": 0,
            "address_line1": address1,
            "address_line2": address2,
            "address_line3": address3,
            "pin_code": pincode,
            "latitude": "latitude",
            "longitude": "longitude",
            "default_address": true, // or false to not set the address as default
            "status": true //or false To Delete the Address
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

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
                                <label className="cont-box first"  ><span>Pickup From Store</span>
                                    <input type="radio" checked="checked" name="delivery" onClick={() => setPickup(true)} />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="cont-box "><span>Home Delivery</span>
                                    <input type="radio" name="delivery" onClick={() => setPickup(false)} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="delivery-slot">
                        <h4 className="sub-head">Delivery Slots({new Date().toDateString()})</h4>
                        <Slider {...settings1} className="delivery-slot-boxes">
                            {
                                deliverySlots.map((slot) => {
                                    return (
                                        <button className="delivery-slot-box cf-border" onClick={(e) => {
                                            setSelectedDeliverySlot(slot.description)
                                            var current = document.getElementsByClassName("delivery-slot-box active")
                                            console.log(current);
                                            if (current.length > 0) {
                                                current[0].className = current[0].className.replace(" active", "");
                                            }
                                            e.target.className += " active";
                                        }} >{slot.description} </button>

                                    )

                                })
                            }
                        </Slider>
                    </div>
                    <div className="address-block">
                        <div className="myaddress">
                            <h4 className="sub-head">My Addresses</h4>
                            <button className="delivery-button" onClick={(e) => showAddAddress(e)} ><span className="material-icons">add_location_alt</span>Add New Address</button>
                        </div>
                        <div className="select-delivery modal" id='select-delivery'>
                            <div className="modal-data cf-border">
                                <h6 className="mb-4">Add New Address</h6>
                                <div className="form-1-div ">
                                    <input type="" name="Address" className="form-1-input " placeholder="  " onChange={(e) => setAddress1(e.target.value)} />
                                    <label className="form-1-label"  >Address Line 1</label>
                                </div>
                                <div className="form-1-div ">
                                    <input type="" name="Address" className="form-1-input " placeholder="  " onChange={(e) => setAddress2(e.target.value)} />
                                    <label className="form-1-label">Address Line 2</label>
                                </div>
                                <div className="form-1-div ">
                                    <input type="" name="Address" className="form-1-input " placeholder="  " onChange={(e) => setAddress3(e.target.value)} />
                                    <label className="form-1-label">Address Line 3</label>
                                </div>
                                <div className="form-1-div location-div ">
                                    <input type="" name="" className="form-1-input " placeholder="  " onChange={(e) => setPincode(e.target.value)} />
                                    <label className="form-1-label">Pincode</label>
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
                                    <button className="save-btn" onClick={saveAddress} >Save</button>
                                    <button className="cancel-btn" onClick={cancelAddress} >Cancel</button>
                                </div>
                            </div>
                        </div>
                        <Slider {...settings2} className="address-boxes">
                            {
                                addresses.map((address) => {
                                    return (
                                        <div className="address-box cf-border " style={{ width: '250px', inlineSize: '1' }} onClick={(e) => {
                                            setSelectedAddress(address)
                                            var current = document.getElementsByClassName("address-box cf-border active");
                                            if (current.length > 0) {
                                                current[0].className = current[0].className.replace(" active", "");
                                            }
                                            e.target.className += " active";
                                        }} >
                                            <div className="select-icon">
                                                <i className="bi bi-check-square-fill"></i>
                                            </div>
                                            <div className="address-1">
                                                <h6>{address.address_line1}</h6>
                                            </div>
                                            <div className="address-2">
                                                <h6>{address.address_line2}</h6>
                                            </div>
                                            <div className="address-3">
                                                <h6>{address.address_line3}</h6>
                                            </div>
                                            <div className="Pincode">
                                                <h6>{address.pin_code}</h6>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                    <div className="payment-block cf-border">
                        <div className="option-box">
                            <label className="cont-box first"><span>Cash on Delivery</span>
                                <input type="radio" checked="checked" name="pay" onClick={() => setPayment('COD')} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="cont-box "><span>Pay Online</span>
                                <input type="radio" name="pay" onClick={() => setPayment('POG')} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="summary">
                        <h4 className="">Summary</h4>
                    </div>

                    {
                        items.map((item) => {
                            return (
                                <div className="order-summary-table mt-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="head-table">
                                                <a href="/"><p className="bold">{item.name}</p></a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="order-summary-table-content">
                                                <p >QTY:</p>
                                                <p className="bold"> {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="order-summary-table-content">
                                                <p >Price:</p>
                                                <p className="bold">₹{item.price}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="order-summary-table-content">
                                                <p >Cleaning:</p>
                                                <p className="bold">₹{item.cleaning_charge}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="order-summary-table-content">
                                                <p >Skin Removal:</p>
                                                <p className="bold">₹{item.skin_removal_charge}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <p>Cutting:</p>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="order-summary-table-content">
                                                <p> {item.cutting_type_name}</p>
                                                <p className="bold">₹{item.cutting_charge}</p>
                                            </div>
                                        </div>
                                        <div className="order-summary-total">
                                            <p>Total Price : ₹{total[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="place-order" >
                        <div className="place-order-price">
                            <p>₹{overAlltotal}</p>
                        </div>
                        <div className="place-order-button" style={{ cursor: 'pointer' }} onClick={placeOrder}><p>Place Order</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
