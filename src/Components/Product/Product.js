import React from 'react'
import './Product.css'

function Product(props) {
    return (
        <div className="container " id="container">
            <div className="go-to-cart-button">
                <div className="go-to-cart-button-content">
                    <p>Added to Cart</p>
                    <p><a href="cart.html">View Cart <i className="bi bi-chevron-right"></i></a></p>
                </div>
            </div>
            <div className="product-page-sec ">
                <div className="row ">
                    <div className="col-12 mb-3  col-md-5">
                        <div id="product-image">
                            <div className="product-page-image-big"
                                style={{background: `url(${props.item.image})  no-repeat center`, backgroundSize: 'cover'}}>
                                <button className="fav-btn"><i id="favBtn" className=" bi-heart"></i></button>
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

                                <button className="option-button option-button-clean active">No</button>
                                <button className="option-button option-button-clean"><i
                                    className="bi bi-check2 pr-2"></i>Yes</button>
                            </div>
                        </div>
                        <div className="product-page-option mb-3">
                            <h5>Remove Skin?</h5>
                            <div className="d-flex mt-3">
                                <button className="option-button option-button-skin active">No</button>
                                <button className="option-button option-button-skin"><i
                                    className="bi bi-check2 pr-2"></i>Yes</button>
                            </div>
                        </div>
                        <div className="product-page-option mb-3">
                            <h5>Choose a Cutting?</h5>
                            <div className="d-flex mt-3">
                                <button className="option-button option-button-cut active">None</button>
                                <button className="option-button option-button-cut"><i className="bi bi-check2 pr-2"></i>Curry
                                    Cut</button>
                                <button className="option-button option-button-cut"><i className="bi bi-check2 pr-2"></i>Biriyani
                                    Cut</button>
                            </div>
                        </div>
                        <div className="product-page-option mb-3">
                            <h5>Choose a Marination?</h5>
                            <div className="d-flex mt-3">
                                <button className="option-button option-button-mar active">None</button>
                                <button className="option-button option-button-mar"><i
                                    className="bi bi-check2 pr-2"></i>Masala</button>
                                <button className="option-button option-button-mar"><i
                                    className="bi bi-check2 pr-2"></i>BBQ</button>
                            </div>
                        </div>
                        <div className="product-page-cart d-flex justify-content-space-between mt-5">
                            <h5 className=""> &#8377;<span>300</span></h5>
                            <div className="quantity">
                                <button className="quantity__minus" id="decrementButton"><span>-</span></button>
                                <input name="quantity" type="text" className="quantity__input" id="number" value="1" />
                                <button className="quantity__plus" id="incrementButton"><span>+</span></button>
                            </div>
                            <button className="cart-button add-to-cart" id="addToCart">Add to Cart</button>

                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Product
