import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CategoryContext } from '../../store/Context'

function Product(props) {
    const history = useHistory()
    var items = props.item

    return (
        <div>
            {
                props.item.length ? <div className="product-section">
                <div className="row">
                    <div className="section-title">
                        <h3>{props.SectionTitle}</h3>
                    </div>
                    <div className="product-div d-flex " id="items-div">

                        {
                            items && items.map((item, index) => {
                                return (
                                    <div className="col-lg-4 col-md-6 col-12" key={index} >
                                        <div onClick={() => history.push(`/product/${item.item_reference}`)}>
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
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div> : <div class="center-loading">
                    <div class="loading-anim"></div>
                </div>
            }
            
        </div>
    )
}

export default Product
