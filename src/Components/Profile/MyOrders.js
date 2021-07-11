import React, { useEffect, useState } from 'react'
import Axios from '../../Axios/Axios'

function MyOrders() {
    const [order, setOrder] = useState([])
    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')

        Axios.post(('/CurrentUser/GetOrders.php'), {
            "mobile": phone,
            "version": "1",
            "status_code": "C"
        }).then((res) => {
            setOrder(res.data.Data.Orders);
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <div className="tab-pane " id="v-pills-profile" role="tabpanel" ariaLabel="v-pills-profile-tab">
            <h5 className="tab-head">My Orders</h5>
            <div className="row ">
                {
                    order.map((ord) => {
                        return (
                            <div className="col-md-6">
                                <div className="order-box">
                                    <div className="container">
                                        <div className="order-box-top">
                                            <div className="order-no-top">
                                                <p className="order-no-top-text">Order No:</p>
                                                <p className="order-no-text">{ord.order_no}</p>
                                            </div>
                                            <div className="delivery-status">
                                                <p>{ord.status}</p>
                                            </div>
                                        </div>
                                        <div className="order-box-main">
                                            <div className="order-box-main-container">
                                                <p className="order-box-main-head">Order No</p>
                                                <p className="order-no-main-text">{ord.order_no}</p>
                                            </div>
                                            <div className="order-box-main-container">
                                                <p className="order-box-main-head">Total Amount</p>
                                                <p className="order-no-main-text">₹ {ord.total}</p>
                                            </div>
                                            <div className="order-box-main-container">
                                                <p className="order-box-main-head">Order On</p>
                                                <p className="order-no-main-text">{ord.order_date}</p>
                                            </div>
                                            <div className="order-box-main-container">
                                                <p className="order-box-main-head">Payment Method</p>
                                                <p className="order-no-main-text">COD</p>
                                            </div>
                                        </div>
                                        <div className="order-box-bottom">
                                            <button className="order-summary-button">
                                                Order Summary<i className="bi bi-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                
            </div>



        </div>
    )
}

export default MyOrders
