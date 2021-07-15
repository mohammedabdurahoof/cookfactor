import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from '../../Axios/Axios'

function Body() {
    const [quantity, setQuantity] = useState(0)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState('')
    const history = useHistory()
    var phone = localStorage.getItem('phoneNumber')
    var uid = localStorage.getItem('uid')

    useEffect(() => {
        refresh()

    }, [])

    const refresh = () => {
        var phone = localStorage.getItem('phoneNumber')
        var uid = localStorage.getItem('uid')
        if (phone) {
            Axios.post('/CurrentUser/GetCart.php', {
                "mobile": phone,
                "version": "1"
            }).then((res) => {
                setCart(res.data.Data)
                console.log(res.data);
                var sum = 0
                var quntiarrey = []
                res.data.Data.forEach(item => {
                    sum += item.quantity * item.price
                    quntiarrey.push(item.quantity)
                });
                setTotal(sum);
                setQuantity(quntiarrey);
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
                console.log(res.data);
                var sum = 0
                var quntiarrey = []
                res.data.Data.forEach(item => {
                    sum += item.quantity * item.price
                    quntiarrey.push(item.quantity)
                });
                setTotal(sum);
                setQuantity(quntiarrey);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const addToCart = (count, item) => {
        return new Promise((resolve,reject)=>{
            console.log(count);
            console.log(item);
            var phone = localStorage.getItem('phoneNumber')
            var uid = localStorage.getItem('uid')
            if (phone) {
                Axios.post('/CurrentUser/AddToCart.php', {
                    "mobile": phone,
                    "version": "1",
                    "id": item.item_reference,
                    "quantity": count,
                    "cooking": item.cooking_type_name,
                    "marination": item.marination_type_name,
                    "cutting": item.cutting_type_name,
                    "skin_removal": item.skin_removal,
                    "cleaning": item.cleaning
                }).then((res) => {
                    console.log(res.data);
                    resolve()
                }).catch((err) => {
                    console.log(err);
                    reject()
                })
            } else {
                Axios.post('/CurrentUser/AddToCart.php', {
                    "mobile": '',
                    'uid': uid,
                    "version": "1",
                    "id": item.item_reference,
                    "quantity": count,
                    "cooking": item.cooking_type_name,
                    "marination": item.marination_type_name,
                    "cutting": item.cutting_type_name,
                    "skin_removal": item.skin_removal,
                    "cleaning": item.cleaning
                }).then((res) => {
                    console.log(res.data);
                   resolve()
                }).catch((err) => {
                    console.log(err);
                    reject()
                })
            }
        })
        
    }

    const setItemQuantity = (item, index, plus) => {
        if (plus) {
            var oldQuantity = quantity
            oldQuantity[index] = parseFloat(quantity[index]) + parseFloat(item.increment_qty)
            setQuantity(oldQuantity)
            document.getElementById(`number${index}`).value = oldQuantity[index]
            console.log(quantity);
            addToCart(oldQuantity[index], item)
        } else {
            if (quantity == item.min_order) {
                alert('Do you want remove this item from cart')
                setQuantity(0)
                deleteItem(item)
            } else {

                var oldQuantity = quantity
                oldQuantity[index] = parseFloat(quantity[index]) - parseFloat(item.increment_qty)
                setQuantity(oldQuantity)
                document.getElementById(`number${index}`).value = oldQuantity[index]
                console.log(quantity);
                addToCart(oldQuantity[index], item)
            }
        }
        // if (phone) {
        //     Axios.post('/CurrentUser/AddToCart.php', {
        //         "mobile": phone,
        //         "version": "1",
        //         "id": item.item_reference,
        //         "quantity": quantity[index],
        //         "cooking": item.cooking_type_name,
        //         "marination": item.marination_type_name,
        //         "cutting": item.cutting_type_name,
        //         "skin_removal": item.skin_removal,
        //         "cleaning": item.cleaning
        //     }).then((res) => {
        //         console.log(res.data);
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // } else {
        //     Axios.post('/CurrentUser/AddToCart.php', {
        //         "mobile": '',
        //         'uid': uid,
        //         "version": "1",
        //         "id": item.item_reference,
        //         "quantity": quantity[index],
        //         "cooking": item.cooking_type_name,
        //         "marination": item.marination_type_name,
        //         "cutting": item.cutting_type_name,
        //         "skin_removal": item.skin_removal,
        //         "cleaning": item.cleaning
        //     }).then((res) => {
        //         console.log(res.data);
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // }
    }


    const deleteItem = (item) => {
        alert('Do you want delete this item from cart')
        addToCart(0, item).then(()=>{
            refresh()
        })
    }


    return (
        <div className=" container" id="container"  >
            {
                cart.length ?
                    <div className="row ">
                        <div className="cart-footer" style={{ width: '87%' }}>
                            <div className="cart-footer-container">
                                <p className="total-price">&#8377;{total}</p>
                                <div style={{ cursor: "pointer" }} onClick={() => history.push('/check-out')} className="cart-footer-button">Checkout<i className="bi bi-arrow-right pl-2"></i></div> </div>
                        </div>
                    </div> : <h4 className='cart-title' >"No Item in cart"</h4>
            }
            <div className="cart">
                <div className="check-out-head">
                    <h3>My cart</h3>
                </div>
                <div className="row">

                    {
                        cart.map((item, index) => {
                            return (
                                <div className="col-lg-4 col-md-6 "  >
                                    <div className="cart-box">
                                        <div className="container">
                                            <div className="cart-image" style={{ backgroundImage: `url(${item.image})` }}>
                                                <div className="cart-delete">
                                                    <button onClick={() => { deleteItem(item) }} ><i className="fas fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div className="product-details-cart">
                                                <p className="cart-product-name">
                                                    <div onClick={() => history.push(`/product/${item.item_reference}`)}> {item.name}</div>
                                                </p>
                                                <p className="gross-weight">Gross Weight : {parseFloat(item.quantity) * parseFloat(item.increment_qty)} kg </p>
                                            </div>
                                            <div className="cart-box-end">
                                                <div className="quantity active"  >
                                                    <button className="quantity__minus" onClick={() => setItemQuantity(item, index)} ><span>-</span></button>
                                                    <input name="quantity" type="text" className="quantity__input" id={`number${index}`} value={quantity[index]} />
                                                    <button className="quantity__plus" onClick={() => setItemQuantity(item, index, 'plus')} ><span>+</span></button>
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
