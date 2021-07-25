import React, { useState } from 'react'
import Axios from '../../Axios/Axios'


function MyAddresses(props) {
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [address3, setAddress3] = useState('')
    const [pincode, setPincode] = useState('')
    const [error, setError] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState(false)

    var showAddAddress = (e) => {
        document.getElementById('select-delivery').className += " active"
    }

    var cancelAddress = () => {
        document.getElementById('select-delivery').classList.remove("active")
    }

    var addActive = (e, item, index) => {
        console.log('hi');

        var current = document.getElementsByClassName("delivery-box cf-border active");
        if (current[0]) {
            current[0].className = current[0].className.replace(" active", "");

        }
        document.getElementById(`ad-${index}`).className += " active"
        //e.target.className += " active"

        // resetAddress(item,true,true)
    }


    const deleteAddress = (item) => {
        resetAddress(item, false)
    }

    const resetAddress = (item, status, defad) => {
        var phone = localStorage.getItem('phoneNumber')
        Axios.post('/CurrentUser/SaveAddress.php', {
            "mobile": phone,
            "version": "1",
            "id": 0,
            "address_line1": item.address_line1,
            "address_line2": item.address_line2,
            "address_line3": item.address_line3,
            "pin_code": item.pin_code,
            "latitude": item.latitude,
            "longitude": item.longitude,
            "default_address": defad ? defad : item.default_address, // or false to not set the address as default
            "status": status //or false To Delete the Address
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    var saveAddress = () => {
        if (address1 && address2 && address3 && pincode) {
            console.log('ok');
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
                "default_address": defaultAddress, // or false to not set the address as default
                "status": true //or false To Delete the Address
            }).then((res) => {
                console.log(res.data);
                props.refresh()
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log('fill');
            setError(true)
        }
    }

    const setDefault = (e) => {
        console.log(e.target.checked);
        if (e.target.checked == true) {

            setDefaultAddress(true)
        } else {
            setDefaultAddress(false)
        }
    }

    return (
        <div className="tab-pane " id="myAddresses" role="tabpanel" ariaLabel="myAddresses">
            <div className="address mb-3">
                <h5 className="tab-head">My Addresses</h5>
                <button className="delivery-button" onClick={(e) => showAddAddress(e)} ><span className="material-icons">add_location_alt</span>Add New
                    Address</button>
            </div>
            {props.address.length ? <div className="row">
                {
                    props.address.map((itm, k) => {
                        return (
                            <div className="col-lg-6 col-md-12">
                                <div className={itm.default_address ? 'delivery-box cf-border active' : 'delivery-box cf-border'} id={`ad-${k}`} onClick={(e) => addActive(e, itm, k)} >
                                    <div className="select-icon">
                                        <i className="bi bi-check-square-fill"></i>
                                    </div>
                                    <div className="address-1">
                                        <h6>{itm.address_line1}</h6>
                                    </div>
                                    <div className="address-2">
                                        <h6>{itm.address_line2}</h6>
                                    </div>
                                    <div className="address-3">
                                        <h6>{itm.address_line3}</h6>
                                    </div>
                                    <div className="Pincode">
                                        <h6>{itm.pin_code}</h6>
                                    </div>
                                    <div className="delete-address">
                                        <button className="delete-address-btn" onClick={() => deleteAddress(itm)} >Delete</button>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }


            </div>:<h4>"No Address added"</h4>}
            <div className="select-delivery modal" id='select-delivery'>
                <div className="modal-data cf-border">
                    <h6 className="mb-4">Add New Address</h6>
                    {error && <p style={{ color: 'red' }} className='mb-3'>Please fill all information</p>}
                    <div className="form-1-div ">
                        <input type="" name="Address" className="form-1-input " placeholder="  " onChange={(e) => setAddress1(e.target.value)} required />
                        <label className="form-1-label">Address Line 1</label>
                    </div>
                    <div className="form-1-div ">
                        <input type="" name="Address" className="form-1-input " placeholder="  " onChange={(e) => setAddress2(e.target.value)} required />
                        <label className="form-1-label">Address Line 2</label>
                    </div>
                    <div className="form-1-div ">
                        <input type="" name="Address" className="form-1-input " placeholder="  " onChange={(e) => setAddress3(e.target.value)} required />
                        <label className="form-1-label">Address Line 3</label>
                    </div>
                    <div className="form-1-div ">
                        <input type="" name="Pincode" className="form-1-input " placeholder="  " onChange={(e) => setPincode(e.target.value)} required />
                        <label className="form-1-label">Pincode</label>
                    </div>
                    <div className="pretty mt-2 p-svg p-curve">
                        <input type="checkbox" name="address" id="address" onChange={(e) => setDefault(e)} />
                        {/* <input type='' onClick={(e) => setDefault(e)} /> */}
                        <div className="state p-success">
                            {/* <!-- svg path --> */}
                            <svg className="svg svg-icon" viewBox="0 0 20 20">
                                <path
                                    d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                    style={{ stroke: 'white', fill: 'white' }}></path>
                            </svg>
                            <label>Set as Default Address</label>
                        </div>
                    </div>
                    <div className="button-group d-flex ">
                        <button className="save-btn" onClick={saveAddress}>Save</button>
                        <button className="cancel-btn" onClick={cancelAddress}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAddresses
