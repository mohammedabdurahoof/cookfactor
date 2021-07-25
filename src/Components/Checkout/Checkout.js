import React, { forwardRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Slider from "react-slick";
import Axios from '../../Axios/Axios'
import DatePicker from "react-datepicker";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "react-datepicker/dist/react-datepicker.css";


const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 20,
        height: 20,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#A6CC3B',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 20,
            height: 20,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#A6CC3B',
        },
    },
});

// Inspired by blueprintjs
function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}






function Checkout() {
    const [addresses, setAddresses] = useState([])
    const [deliverySlots, setDeliverySlots] = useState([])
    const [items, setItems] = useState([])
    const [total, setTotal] = useState([])
    const [overAlltotal, setOverAllTotal] = useState([])
    const [payment, setPayment] = useState('COD')
    const [pickup, setPickup] = useState(true)
    const [selectedAddress, setSelectedAddress] = useState(1)
    const [selectedDeliverySlot, setSelectedDeliverySlot] = useState(1)
    const [startDate, setStartDate] = useState(new Date());
    const [res, setRes] = useState([])
    const history = useHistory()

    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [address3, setAddress3] = useState('')
    const [pincode, setPincode] = useState('')
    const [error, setError] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState(false)
    const todayDate = new Date()

    useEffect(() => {
        refresh()
        console.log(res);
        //setDeliverySlots(res.DeliverySlots)
    }, [])

    const refresh = () => {
        var phone = localStorage.getItem('phoneNumber')
        if (phone) {
            Axios.post('/CurrentUser/GetCheckoutData.php', {
                "mobile": phone,
                "version": "1"
            }).then((res) => {
                console.log(res.data);
                setRes(res.data.Data)
                setAddresses(res.data.Data.Addresses)
                setItems(res.data.Data.Items)
                var itm = res.data.Data.Items
                var allSum = []
                for (let i = 0; i < itm.length; i++) {
                    var tax = itm[i].tax
                    var amount = 0
                    tax.forEach(tax => {
                        amount += tax.amount
                    })
                    var sum = itm[i].quantity * itm[i].price + parseFloat(itm[i].cleaning_charge) + parseFloat(itm[i].skin_removal_charge) + parseFloat(itm[i].cutting_charge) + amount
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
    }


    const setDefault = (e) => {
        console.log(e.target.checked);
        if (e.target.checked == true) {

            setDefaultAddress(true)
        } else {
            setDefaultAddress(false)
        }
    }

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
                refresh()
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log('fill');
            setError(true)
        }
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

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <FormControlLabel value="Home Delivery" control={<StyledRadio />} onChange={() => {
            onClick()
            setPickup(false)
        }
        } label={<span>Home Delivery</span>} />
    ));

    const ExampleCustomInputPen = forwardRef(({ value, onClick }, ref) => (
        <i class="fas fa-pen" onClick={() => {
            onClick()
            setPickup(false)
        }} ></i>
    ));

    const selectAddress = (id, index) => {

        setSelectedAddress(id)
        var current = document.getElementsByClassName("address-box cf-border active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        document.getElementById(`ad-${index}`).className += " active"
    }

    const isWeekday = (date) => {
        const day = date.toDateString();
        var today = new Date().toDateString()
        var tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow = tomorrow.toDateString()
        var nextday = new Date()
        nextday.setDate(nextday.getDate() + 2);
        nextday = nextday.toDateString()
        return day == today || day == tomorrow || day == nextday
    }

    return (
        <div className="container">
            <div className="row ">
                <div className="cart-footer" style={{ width: '87vw' }}>
                    <div className="place-order cart-footer-container"  >
                        <div className="place-order-price">
                            <p>₹{overAlltotal}</p>
                        </div>
                        <div className="place-order-button" style={{ cursor: 'pointer' }} onClick={placeOrder}><p>Place Order</p></div>
                    </div>
                </div>
            </div>
            <div className="check-out-head">
                <h3>Checkout</h3>
            </div>
            <div className="row">
                <div className="col-lg-8 col-md-12 mb-3">
                    <div className="delivery-type-box cf-border">
                        <div className="delivery-type-box-content">
                            <div className="option-box">
                                <RadioGroup row defaultValue="Pickup From Store" name="customized-radios">
                                    <FormControlLabel value="Pickup From Store" control={<StyledRadio />} onClick={() => setPickup(true)} label={<span>Pickup From Store</span>} />
                                    <div className="al-right">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => {
                                                setStartDate(date)
                                                console.log(deliverySlots);
                                                var availableSlot=[]
                                                res.DeliverySlots.forEach(element => {
                                                    var exp_time = date
                                                    exp_time.setHours(element.expire_hour)
                                                    exp_time.setMinutes(element.expire_min)
                                                    console.log(exp_time);
                                                    if (todayDate > exp_time) {
                                                        return true
                                                    } else {
                                                        availableSlot.push(element)
                                                        return false
                                                    }
                                                });
                                                setDeliverySlots(availableSlot)
                                            }}
                                            customInput={<ExampleCustomInput />}
                                            filterDate={isWeekday}
                                            withPortal />
                                    </div>
                                </RadioGroup>


                            </div>
                        </div>
                    </div>
                    {!pickup && <div className="delivery-slot">
                        <h4 className="sub-head row">Delivery Slots({startDate.toDateString()})<DatePicker
                                            selected={startDate}
                                            onChange={(date) => {
                                                setStartDate(date)
                                                console.log(deliverySlots);
                                                var availableSlot=[]
                                                res.DeliverySlots.forEach(element => {
                                                    var exp_time = date
                                                    exp_time.setHours(element.expire_hour)
                                                    exp_time.setMinutes(element.expire_min)
                                                    console.log(exp_time);
                                                    if (todayDate > exp_time) {
                                                        return true
                                                    } else {
                                                        availableSlot.push(element)
                                                        return false
                                                    }
                                                });
                                                setDeliverySlots(availableSlot)
                                            }}
                                            customInput={<ExampleCustomInputPen />}
                                            filterDate={isWeekday}
                                            withPortal /></h4>
                        {deliverySlots.length ? <Slider {...settings1} className="delivery-slot-boxes">
                            {
                                deliverySlots.map((slot) => {
                                    return (
                                        <button className="delivery-slot-box cf-border" onClick={(e) => {
                                            setSelectedDeliverySlot(slot.deliveryslot_reference)
                                            var current = document.getElementsByClassName("delivery-slot-box active")
                                            console.log(slot.deliveryslot_reference);
                                            if (current.length > 0) {
                                                current[0].className = current[0].className.replace(" active", "");
                                            }
                                            e.target.className += " active";
                                        }} >{slot.description} </button>

                                    )

                                })
                            }
                        </Slider> : <h6 style={{color:'red'}} >No delivery slots available for today</h6>}
                    </div>}
                    {!pickup && <div className="address-block">
                        <div className="myaddress">
                            <h4 className="sub-head">My Addresses</h4>
                            <button className="delivery-button" onClick={(e) => showAddAddress(e)} ><span className="material-icons">add_location_alt</span>Add New Address</button>
                        </div>
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
                        <Slider {...settings2} className="address-boxes">
                            {
                                addresses.map((address, index) => {
                                    return (
                                        <div className={address.default_address === true ? 'address-box cf-border active' : 'address-box cf-border'} id={`ad-${index}`} style={{ width: '250px', inlineSize: '1' }} onClick={() => {
                                            selectAddress(address.address_reference, index)
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
                    </div>}
                    <div className="payment-block cf-border">
                        <div className="option-box">
                            <RadioGroup row defaultValue="Cash on Delivery" name="customized-radios">
                                <FormControlLabel value="Cash on Delivery" control={<StyledRadio />} onClick={() => setPayment('COD')} label={<span>Cash on Delivery</span>} />
                                <div className="al-right">
                                    <FormControlLabel value="Pay Online" control={<StyledRadio />} onClick={() => setPayment('POG')} label={<span>Pay Online</span>} />
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="summary">
                        <h4 className="">Summary</h4>
                    </div>

                    {
                        items.map((item, index) => {
                            return (
                                <div className="order-summary-table mt-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="head-table">
                                                <p className="bold">{item.name}</p>
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
                                        {item.cleaning && <div className="col-md-6 col-6">
                                            <div className="order-summary-table-content">
                                                <p >Cleaning:</p>
                                                <p className="bold">₹{item.cleaning_charge}</p>
                                            </div>
                                        </div>}
                                        {item.skin_removal && <div className="col-md-6 col-6">
                                            <div className="order-summary-table-content">
                                                <p >Skin Removal:</p>
                                                <p className="bold">₹{item.skin_removal_charge}</p>
                                            </div>
                                        </div>}
                                        {item.cutting_type_name && <><div className="col-md-6 col-6">
                                            <p>Cutting:</p>
                                        </div>
                                            <div className="col-md-6 col-6">
                                                <div className="order-summary-table-content">
                                                    <p> {item.cutting_type_name}</p>
                                                    <p className="bold">₹{item.cutting_charge}</p>
                                                </div>
                                            </div></>}
                                        {item.tax.length ? <><div className="col-md-6 col-6">
                                            <p>Tax:</p>
                                        </div>
                                            {
                                                item.tax.map((tax) => {
                                                    return (
                                                        <div className="col-md-6 col-6">
                                                            <div className="order-summary-table-content">
                                                                <p> {tax.description}</p>
                                                                <p className="bold">₹{tax.amount}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </> : ''}
                                        <div className="order-summary-total">
                                            <p>Total Price : ₹{total[index]}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default Checkout
