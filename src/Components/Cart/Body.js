import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from '../../Axios/Axios'

function Body() {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState('')
    const history = useHistory()

    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')
        var uid = localStorage.getItem('uid')
        if (phone) {
            Axios.post('/CurrentUser/GetCart.php', {
                "mobile": phone,
                "version": "1"
            }).then((res) => {
                setCart(res.data.Data)
                var sum = 0
                res.data.Data.forEach(item => {
                    sum += item.quantity * item.price
                });
                setTotal(sum);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            Axios.post('/CurrentUser/GetCart.php', {
                "mobile": '',
                "version": "1",
                'uid': uid
            }).then((res) => {
                setCart(res.data.Data)
                var sum = 0
                res.data.Data.forEach(item => {
                    sum += item.quantity * item.price
                });
                setTotal(sum);
            }).catch((err) => {
                console.log(err);
            })
        }

    }, [])



    const deleteItem = (item) => {
        var phone = localStorage.getItem('phoneNumber')
        var uid = localStorage.getItem('uid')
        if (phone) {
            Axios.post('/CurrentUser/AddToCart.php', {
                "mobile": phone,
                "version": "1",
                "id": item.item_reference,
                "quantity": 0,
                "cooking": item.cooking_type_name,
                "marination": item.marination_type_name,
                "cutting": item.cutting_type_name,
                "skin_removal": item.skin_removal,
                "cleaning": item.cleaning
            }).then((res) => {
                console.log(res.data);
                Axios.post('/CurrentUser/GetCart.php', {
                    "mobile": phone,
                    "version": "1"
                }).then((res) => {
                    setCart(res.data.Data)
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        } else {
            Axios.post('/CurrentUser/AddToCart.php', {
                "mobile": '',
                'uid': uid,
                "version": "1",
                "id": item.item_reference,
                "quantity": 0,
                "cooking": item.cooking_type_name,
                "marination": item.marination_type_name,
                "cutting": item.cutting_type_name,
                "skin_removal": item.skin_removal,
                "cleaning": item.cleaning
            }).then((res) => {
                console.log(res.data);
                Axios.post('/CurrentUser/GetCart.php', {
                    "mobile": '',
                    'uid': uid,
                    "version": "1"
                }).then((res) => {
                    setCart(res.data.Data)
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        }

    }


    console.log(cart);
    return (
        <div className=" container" id="container"  >
            <div className="row ">
                <div className="cart-footer" style={{ width: '87%' }}>
                    <div className="cart-footer-container">
                        <p className="total-price">&#8377;{total}</p>
                        <div style={{ cursor: "pointer" }} onClick={() => history.push('/check-out')} className="cart-footer-button">Checkout<i className="bi bi-arrow-right pl-2"></i></div> </div>
                </div>
            </div>
            <div className="cart">
                <div className="check-out-head">
                    <h3>My cart</h3>
                </div>
                <div className="row">

                    {
                        cart.map((item, index) => {
                            return (
                                <div className="col-lg-4 col-md-6 " >
                                    <div className="cart-box">
                                        <div className="container">
                                            <div className="cart-image" style={{ backgroundImage: `url(${item.image})` }}>
                                                <div className="cart-delete">
                                                    <button onClick={() => { deleteItem(item) }} ><i className="fas fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div className="product-details-cart">
                                                <p className="cart-product-name">
                                                    <a href="product.html"> {item.name}</a>
                                                </p>
                                                <p className="gross-weight">Gross Weight : {parseFloat(item.quantity) * parseFloat(item.increment_qty)} kg </p>
                                            </div>
                                            <div className="cart-box-end">
                                                <div className="quantity">
                                                    <button className="quantity__minus" style={{ width: '100px' }} id="decrementButton" onClick={() => history.push(`/product/${item.item_reference}`)}><span  >Edit</span></button>
                                                </div>
                                                <div>
                                                    <p className="cart-price">
                                                        &#8377;{item.quantity * item.price}
                                                    </p>
                                                </div>
                                            </div>
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

export default Body
