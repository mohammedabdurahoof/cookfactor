import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Axios from '../../Axios/Axios'
import Carousel from "react-material-ui-carousel"
import { Card, CardMedia, Grid } from '@material-ui/core'
// import { useHistory } from 'react-router-dom';



function Product(props) {
    const [quantity, setQuantity] = useState(null)
    const [cleaning, setCleaning] = useState(false)
    const [skinRemove, setSkinRemove] = useState(false)
    const [cooking, setCooking] = useState('0')
    const [marination, setMarination] = useState('0')
    const [cutting, setCutting] = useState('0')
    const [fav, setFav] = useState(false)

    var item = props.item

    function Project(props) {
        if (props.newProp) console.log(props.newProp)
        const history = useHistory()
        console.log(props);
        return (
            <div className="product-page-image-big"
                style={{ background: `url(${props.item.image})  no-repeat center`, backgroundSize: 'cover' }}>
                {phone && <button className={fav ? 'fav-btn active' : 'fav-btn'} onClick={(e) => setFavourite(e, item)} ><i id="favBtn" className=" bi-heart"></i></button>}
            </div>
        )
    }


    const history = useHistory()

    console.log(props.item.image);
    var images = props.item.images
    var items = []
    if (props.item.image) {
        items.push({ image: props.item.image })
        props.item.images.forEach(element => {
            items.push(element)
        });

    }

    var phone = localStorage.getItem('phoneNumber')
    var uid = localStorage.getItem('uid')

    const setFavourite = (e, item) => {
        var id = item.item_reference
        console.log(fav);
        if (fav) {
            e.target.className = " fav-btn";
            setFav(false)
            Axios.post('/CurrentUser/SetFavourite.php', {
                "mobile": phone,
                "version": "1",
                "status": false,
                "id": id
            }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            e.target.className += " active";
            setFav(true)
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

    }

    const addToCart = (count) => {
        console.log(count);
        return new Promise((resolve, reject) => {
            if (phone) {
                Axios.post('/CurrentUser/AddToCart.php', {
                    "mobile": phone,
                    "version": "1",
                    "id": props.item.item_reference,
                    "quantity": count,
                    "cooking": cooking,
                    "marination": marination,
                    "cutting": cutting,
                    "skin_removal": skinRemove,
                    "cleaning": cleaning
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
                    "id": props.item.item_reference,
                    "quantity": count,
                    "cooking": cooking,
                    "marination": marination,
                    "cutting": cutting,
                    "skin_removal": skinRemove,
                    "cleaning": cleaning
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

    const addActiveClass = (e, classes) => {
        var current = document.getElementsByClassName(classes);
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        e.target.className += " active";
    }

    const setItemQuantity = (qun, plus) => {
        if (plus) {
            var newQuantity = parseFloat(qun) + parseFloat(props.item.increment_qty)
            setQuantity(newQuantity)
            addToCart(newQuantity)
            props.setPrice(parseFloat(props.item.price) * (parseFloat(qun) + parseFloat(props.item.increment_qty)))
        } else {
            if (qun == props.item.min_order) {
                document.getElementById('delete-confirm').className = 'modal-view active'
            } else {
                var newQuantity = parseFloat(qun) - parseFloat(props.item.increment_qty)
                props.setPrice(parseFloat(props.item.price) * (parseFloat(qun) - parseFloat(props.item.increment_qty)))
                setQuantity(newQuantity)
                addToCart(newQuantity)
            }

        }
    }


    const addToCartClick = (e, min_order) => {
        setQuantity(min_order)
        addToCart(min_order).then(() => {
            document.getElementById('quantity').className += " active"
            document.getElementById('viewCart').className += " active"
            e.target.className += " active"
        })
    }

    const classSet = (item, type, classes) => {
        if (item === type) {
            var current = document.getElementsByClassName(`${classes} active`);
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            return `${classes} active`
        } else {
            return classes
        }

    }

    const deleteItem = () => {
        document.getElementById('viewCart').className = 'go-to-cart-button'
        document.getElementById('quantity').className = 'quantity'
        document.getElementById('addToCart').className = 'cart-button add-to-cart'
        document.getElementById('delete-confirm').className = 'modal-view'
        setQuantity(0)
        addToCart(0)
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
            <div className="container " id="container">

                <div className="go-to-cart-button" id='viewCart' >

                    <div className="go-to-cart-button-content">
                        <p>Added to Cart</p>
                        <p><div onClick={() => history.push('/cart')} style={{ cursor: 'pointer' }} >View Cart <i className="bi bi-chevron-right"></i></div></p>
                    </div>
                </div>

                <div className="product-page-sec ">
                    <div className="row ">
                        <div className="col-12 mb-3  col-md-6 col-lg-5">
                            <div id="product-image">
                                <div >
                                    <Carousel
                                        className="Example"
                                        autoPlay={false}
                                        animation='fade'
                                        indicators={true}
                                        timeout={300}
                                        cycleNavigation={true}
                                        navButtonsAlwaysVisible={false}
                                        navButtonsAlwaysInvisible={true}
                                    //next={(now, previous) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                                    //prev={(now, previous) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                                    // onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`)}

                                    >
                                        {
                                            items.map((item, index) => {
                                                return <Project item={item} key={index} />
                                            })
                                        }
                                    </Carousel>
                                </div>
                            </div>
                            <h5 className="product-page-title" id="product-title">
                                {props.item.name}
                            </h5>
                            <div className="product-page-price">
                                <h6><span className=" pr-2" /><span id="og-price" />₹{props.item.price}/{props.item.unit_of_measurement}</h6>
                            </div>
                            <div className="product-page-desc" id="product-description">
                                <p>{props.item.description}</p>
                            </div>
                        </div>



                        <div className="col-12 col-md-6 col-lg-7 var">
                            {
                                props.item.cleaning ? <div className="product-page-option mb-3" id="productOption">
                                    <h5>Do you want to clean?</h5>
                                    <div className="d-flex mt-3">

                                        <button className={classSet(props.itemDetiles.cleaning, false, "option-button option-button-clean")} onClick={(e) => {
                                            addActiveClass(e, 'option-button option-button-clean active')
                                            setCleaning(false)
                                        }} >No</button>
                                        <button className={classSet(props.itemDetiles.cleaning, true, "option-button option-button-clean")} onClick={(e) => {
                                            addActiveClass(e, 'option-button option-button-clean active')
                                            setCleaning(true)
                                        }}><i
                                            className="bi bi-check2 pr-2"></i>Yes</button>
                                    </div>
                                </div> : ""
                            }



                            {
                                props.item.skin_removal ? <div className="product-page-option mb-3">
                                    <h5>Remove Skin?</h5>
                                    <div className="d-flex mt-3">
                                        <button className={classSet(props.itemDetiles.skin_removal, false, "option-button option-button-skin")} onClick={(e) => {
                                            addActiveClass(e, 'option-button option-button-skin active')
                                            setSkinRemove(false)
                                        }} >No</button>
                                        <button className={classSet(props.itemDetiles.skin_removal, true, "option-button option-button-skin")} onClick={(e) => {
                                            addActiveClass(e, 'option-button option-button-skin active')
                                            setSkinRemove(true)
                                        }} ><i
                                            className="bi bi-check2 pr-2"></i>Yes</button>
                                    </div>
                                </div> : ""
                            }

                            {
                                props.item.cooking ? <div className="product-page-option mb-3" id="productOption">
                                    <h5>Do you want to cook?</h5>
                                    <div className="d-flex mt-3">

                                        <button className="option-button option-button-cook active" onClick={(e) => {
                                            addActiveClass(e, 'option-button option-button-cook active')
                                            setCooking('0')
                                        }} >None</button>
                                        {
                                            props.item.cooking_types.map((item, key) => {
                                                return (
                                                    <button className={classSet(props.itemDetiles.cooking, item.cooking_type_reference, "option-button option-button-cut")} onClick={(e) => {
                                                        addActiveClass(e, 'option-button option-button-cut active')
                                                        setCutting(item.cooking_type_reference)
                                                    }}><i className="bi bi-check2 pr-2"></i>{item.description}</button>
                                                )
                                            })
                                        }
                                    </div>
                                </div> : ""
                            }

                            {
                                props.item.cutting ? <div className="product-page-option mb-3">
                                    <h5>Choose a Cutting?</h5>
                                    <div className="d-flex mt-3">
                                        <button className="option-button option-button-cut active" onClick={(e) => {
                                            addActiveClass(e, 'option-button option-button-cut active')
                                            setCutting('0')
                                        }}>None</button>
                                        {
                                            props.item.cutting_types.map((item, key) => {
                                                return (
                                                    <button className={classSet(props.itemDetiles.cutting, item.cutting_type_reference, 'option-button option-button-cut')} onClick={(e) => {
                                                        addActiveClass(e, 'option-button option-button-cut active')
                                                        setCutting(item.cutting_type_reference)
                                                    }}><i className="bi bi-check2 pr-2"></i>{item.description}</button>
                                                )
                                            })
                                        }
                                    </div>
                                </div> : ""
                            }

                            {
                                props.item.marination ? <div className="product-page-option mb-3">
                                    <h5>Choose a Marination?</h5>
                                    <div className="d-flex mt-3">
                                        <button className="option-button option-button-mar active" onClick={(e) => {
                                            addActiveClass(e, 'option-button option-button-mar active')
                                            setMarination('0')
                                        }} >None</button>
                                        {
                                            props.item.marination_types.map((item, key) => {
                                                return (
                                                    <button className={classSet(props.itemDetiles.marination, item.marination_type_reference, "option-button option-button-cut")} onClick={(e) => {
                                                        addActiveClass(e, 'option-button option-button-cut active')
                                                        setCutting(item.marination_type_reference)
                                                    }}><i className="bi bi-check2 pr-2"></i>{item.description}</button>
                                                )
                                            })
                                        }
                                    </div>
                                </div> : ""
                            }




                            <div className="product-page-cart d-flex justify-content-space-between mt-5">
                                <h5 className=""> &#8377;<span>{props.price}</span></h5>

                                <div className="quantity" id='quantity'  >
                                    <button className="quantity__minus" id="decrementButton" onClick={() => setItemQuantity(quantity ? quantity : props.itemDetiles.quantity)} ><span>-</span></button>
                                    <input name="quantity" type="text" className="quantity__input" id="number" value={quantity ? quantity : props.itemDetiles.quantity} />
                                    <button className="quantity__plus" id="incrementButton" onClick={() => setItemQuantity(quantity ? quantity : props.itemDetiles.quantity, 'plus')} ><span>+</span></button>
                                </div>
                                <button className="cart-button add-to-cart" id="addToCart" onClick={e => addToCartClick(e, props.item.min_order)} >Add to Cart</button>

                            </div>
                        </div>



                    </div>
                </div>
                {props.item.related_items && props.item.related_items.length ? <div className="product-section">
                    <div className="row">
                        <div className="section-title col-12">
                            <h3>Related products</h3>
                        </div>
                        <div className="product-div d-flex " id="items-div">
                            {console.log(props.item.related_items.length)}

                            {

                                props.item.related_items.map((item, index) => {
                                    return (
                                        <div className="col-lg-4 col-md-4 col-12" key={index} >
                                            <Link to={`/r_product/${item.item_reference}`}>
                                                <div className="product-box">
                                                    <div className="product-image" style={{ backgroundImage: `url(${item.image})` }} ></div>
                                                    <div className="product-desc">
                                                        <div className="product-title">
                                                            <h5>{item.name} </h5>
                                                        </div>
                                                        <div className="product-price">
                                                            <h6>₹<span>{item.price}</span></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div> : ''}
            </div>
        </>
    )
}

export default Product
