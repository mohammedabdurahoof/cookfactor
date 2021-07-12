import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from '../../Axios/Axios'

function Product(props) {
    const [quantity, setQuantity] = useState(0)
    const [cleaning, setCleaning] = useState(false)
    const [skinRemove, setSkinRemove] = useState(false)
    const [marination, setMarination] = useState(false)
    const [cutting, setCutting] = useState(false)

    const history = useHistory()


    console.log(props.item);
    var phone = localStorage.getItem('phoneNumber')
    var uid = localStorage.getItem('uid')
    const setFavourite = (e, id) => {
        e.target.className += " active";
        Axios.post('/CurrentUser/SetFavourite.php', {
            "mobile": phone,
            "version": "1",
            "status": true,
            "id": id
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const addActiveClass = (e, classes) => {
        var current = document.getElementsByClassName(classes);
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        e.target.className += " active";
    }

    const setItemQuantity = (plus) => {
        if (plus) {
            console.log(parseFloat(props.item.increment_qty));
            setQuantity(quantity + parseFloat(props.item.increment_qty))
        } else {
            setQuantity(quantity - parseFloat(props.item.increment_qty))
        }
    }


    const addToCart = (e) => {
        if(phone){
            Axios.post('/CurrentUser/AddToCart.php', {
                "mobile": phone,
                "version": "1",
                "id": props.item.item_reference,
                "quantity": quantity,
                "cooking": props.item.cooking,
                "marination": marination,
                "cutting": cutting,
                "skin_removal": skinRemove,
                "cleaning": cleaning
            }).then((res) => {
                console.log(res.data);
                var se = document.getElementById('viewCart').className += " active"
                console.log(se);
                e.target.className += " active"
            }).catch((err) => {
                console.log(err);
            })
        }else{
            Axios.post('/CurrentUser/AddToCart.php', {
                "mobile": '',
                'uid':uid,
                "version": "1",
                "id": props.item.item_reference,
                "quantity": quantity,
                "cooking": props.item.cooking,
                "marination": marination,
                "cutting": cutting,
                "skin_removal": skinRemove,
                "cleaning": cleaning
            }).then((res) => {
                console.log(res.data);
                var se = document.getElementById('viewCart').className += " active"
                console.log(se);
                e.target.className += " active"
            }).catch((err) => {
                console.log(err);
            })
        }
        
    }

    return (
        <div className="container " id="container">
            <div className="go-to-cart-button" id='viewCart' >
                <div className="go-to-cart-button-content">
                    <p>Added to Cart</p>
                    <p><div onClick={()=>history.push('/cart')} style={{cursor:'pointer'}} >View Cart <i className="bi bi-chevron-right"></i></div></p>
                </div>
            </div>
            <div className="product-page-sec ">
                <div className="row ">
                    <div className="col-12 mb-3  col-md-5">
                        <div id="product-image">
                            <div className="product-page-image-big"
                                style={{ background: `url(${props.item.image})  no-repeat center`, backgroundSize: 'cover' }}>
                                <button className="fav-btn" onClick={(e) => setFavourite(e, props.item.item_reference)} ><i id="favBtn" className=" bi-heart"></i></button>
                            </div>
                        </div>
                        <h5 className="product-page-title" id="product-title">
                            {props.item.name}
                        </h5>
                        <div className="product-page-price">
                            <h6><span className=" pr-2" /><span id="og-price" />₹{props.item.actual_price}/{props.item.unit_of_measurement}</h6>
                        </div>
                        <div className="product-page-desc" id="product-description">
                            <p>{props.item.description}</p>
                        </div>
                    </div>



                    <div className="col-12 col-md-7 var">
                        <div className="product-page-option mb-3" id="productOption">
                            <h5>Do you want to clean?</h5>
                            <div className="d-flex mt-3">

                                <button className="option-button option-button-clean active" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-clean active')
                                    setCleaning(false)
                                }} >No</button>
                                <button className="option-button option-button-clean" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-clean active')
                                    setCleaning(true)
                                }}><i
                                    className="bi bi-check2 pr-2"></i>Yes</button>
                            </div>
                        </div>
                        <div className="product-page-option mb-3">
                            <h5>Remove Skin?</h5>
                            <div className="d-flex mt-3">
                                <button className="option-button option-button-skin active" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-skin active')
                                    setSkinRemove(false)
                                }} >No</button>
                                <button className="option-button option-button-skin" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-skin active')
                                    setSkinRemove(true)
                                }} ><i
                                    className="bi bi-check2 pr-2"></i>Yes</button>
                            </div>
                        </div>
                        <div className="product-page-option mb-3">
                            <h5>Choose a Cutting?</h5>
                            <div className="d-flex mt-3">
                                <button className="option-button option-button-cut active" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-cut active')
                                    setCutting(false)
                                    }}>None</button>
                                <button className="option-button option-button-cut" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-cut active')
                                    setCutting('Curry')
                                    }}><i className="bi bi-check2 pr-2"></i>Curry
                                    Cut</button>
                                <button className="option-button option-button-cut" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-cut active')
                                    setCutting('Biriyani')
                                    }}><i className="bi bi-check2 pr-2"></i>Biriyani
                                    Cut</button>
                            </div>
                        </div>
                        <div className="product-page-option mb-3">
                            <h5>Choose a Marination?</h5>
                            <div className="d-flex mt-3">
                                <button className="option-button option-button-mar active" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-mar active')
                                    setMarination(false)
                                    }} >None</button>
                                <button className="option-button option-button-mar" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-mar active')
                                    setMarination('Masala')
                                }}><i
                                    className="bi bi-check2 pr-2"></i>Masala</button>
                                <button className="option-button option-button-mar" onClick={(e) => {
                                    addActiveClass(e, 'option-button option-button-mar active')
                                    setMarination('BBQ')
                            }} ><i
                                    className="bi bi-check2 pr-2"></i>BBQ</button>
                            </div>
                        </div>
                        <div className="product-page-cart d-flex justify-content-space-between mt-5">
                            <h5 className=""> &#8377;<span>{props.item.actual_price * quantity}</span></h5>
                            <div className="quantity">
                                <button className="quantity__minus" id="decrementButton" onClick={() => setItemQuantity()} ><span>-</span></button>
                                <input name="quantity" type="text" className="quantity__input" id="number" value={quantity} />
                                <button className="quantity__plus" id="incrementButton" onClick={() => setItemQuantity('plus')} ><span>+</span></button>
                            </div>
                            <button className="cart-button add-to-cart" id="addToCart" onClick={e=>addToCart(e)} >Add to Cart</button>

                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Product
