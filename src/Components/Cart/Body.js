import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from '../../Axios/Axios'

function Body() {
    const [quantity, setQuantity] = useState(0)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState('')
    const history = useHistory()

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
        return new Promise((resolve, reject) => {
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
                    "cooking": item.cooking_type_reference ? item.cooking_type_reference : "0",
                    "marination": item.marination_type_reference ? item.marination_type_reference : "0",
                    "cutting": item.cutting_type_reference ? item.cutting_type_reference : "0",
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
            let oldQuantity = quantity
            oldQuantity[index] = parseFloat(quantity[index]) + parseFloat(item.increment_qty)
            setQuantity(oldQuantity)
            document.getElementById(`number${index}`).value = oldQuantity[index]
            console.log(quantity);
            addToCart(oldQuantity[index], item).then(() => {
                refresh()
            })
        } else {
            if (quantity == item.min_order) {
                document.getElementById('delete-confirm').className = 'modal-view active'
                itemDetiles = item
            } else {

                let oldQuantity = quantity
                oldQuantity[index] = parseFloat(quantity[index]) - parseFloat(item.increment_qty)
                setQuantity(oldQuantity)
                document.getElementById(`number${index}`).value = oldQuantity[index]
                console.log(quantity);
                addToCart(oldQuantity[index], item).then(() => {
                    refresh()
                })
            }
        }
    }

    var itemDetiles;
    const deleteItemCall = (item) => {
        document.getElementById('delete-confirm').className = 'modal-view active'
        itemDetiles = item
    }

    const deleteItem = () => {
        document.getElementById('delete-confirm').className = 'modal-view'
        addToCart(0, itemDetiles).then(() => {
            refresh()
        })
    }

    const cancelDelete = () => {

        document.getElementById('delete-confirm').className = 'modal-view'
    }
    return (
        <>
        <div class="modal-view" id="delete-confirm">
            <div class="delete-confirm" >
                <div class="modal-data">
                    <h6>Do You Want to Delete?</h6>
                    <div class="button-group d-flex ">
                        <button class="conf-btn del-btn" onClick={deleteItem} >Delete</button>
                        <button class="cancel-btn del-btn" onClick={cancelDelete} >Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <div className=" container" id="container"  >
            {
                cart.length ?
                    <div className="row ">
                        <div className="cart-footer"  id='cart-footer' style={{ width: '87vw' }}>
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
                                                    <button onClick={() => { deleteItemCall(item) }} ><i className="fas fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div className="cart-product-details">
                                                <div className="product-details-cart">
                                                    <p className="cart-product-name">
                                                        <div onClick={() => history.push(`/product/${item.item_reference}`)}> {item.name}</div>
                                                    </p>
                                                    <p className="gross-weight">Item Quantity : {parseFloat(item.quantity)} </p>
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
                                </div>
                            )
                        })
                    }

                </div>
            </div>


        </div>
            
        </>
    )
}

export default Body
