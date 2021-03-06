import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Axios from '../../Axios/Axios'

function Categories() {
    let { id } = useParams()

    const [items, setItems] = useState([])
    const history = useHistory()

    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')
        var uid = localStorage.getItem('uid')
        if (phone) {
            Axios.post('/CurrentUser/CategoryItem.php', {
                "mobile": phone,
                "version": "1",
                "id": id
            }).then((res) => {
                console.log(res.data)
                setItems(res.data.Data.Item)
            }).catch((err) => {
                console.log(err);
            })
        } else {
            Axios.post('/CurrentUser/CategoryItem.php', {
                "mobile": '',
                "version": "1",
                'uid': uid,
                'id': id
            }).then((res) => {
                console.log(res.data)
                setItems(res.data.Data.Item)
            }).catch((err) => {
                console.log(err);
            })
        }

    }, [])

    items.sort(function (a, b) {
        return a.sort_order - b.sort_order;
    });

    return (
        <div className='container'>
            {
                items.length ? <div className="product-section category-list">
                <div className="row">
                    <div className="section-title">
                        <h3>Popular products</h3>
                    </div>
                </div>
                <div className="product-div d-flex row" id="items-div">

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
                                                    <h6>???<span>{item.price}</span></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div> : <div class="center-loading">
                    <div class="loading-anim"></div>
                </div>
            }
            
        </div>
    )
}

export default Categories
