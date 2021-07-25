import React, { useEffect, useState } from 'react'
import Axios from '../../Axios/Axios'

function MyOrders() {
    const [order, setOrder] = useState([])
    const [total, setTotal] = useState([])
    const [summary, setSummary] = useState({})


    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')

        Axios.post(('/CurrentUser/GetOrders.php'), {
            "mobile": phone,
            "version": "1",
            "status_code": "I"
        }).then((res) => {
            console.log(res.data);
            setOrder(res.data.Data.Orders);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const showOderSummary = (id) => {
        var phone = localStorage.getItem('phoneNumber')
        Axios.post(('/CurrentUser/GetOrder.php'), {
            "mobile": phone,
            "version": "1",
            "id": id
        }).then((res) => {
            console.log(res.data.Data);
            setSummary(res.data.Data)
            var itm = res.data.Data.Items
            var allSum = []
            for (let i = 0; i < itm.length; i++) {
                var tax = itm[i].tax
                var amount = 0
                if (tax) {
                    tax.forEach(tax => {
                        amount += tax.amount
                    })
                }
                var sum = itm[i].quantity * itm[i].price + parseFloat(itm[i].cleaning_charge) + parseFloat(itm[i].skin_removal_charge) + parseFloat(itm[i].cutting_charge) + amount
                console.log(sum);
                allSum.push(sum)
            }
            console.log(allSum);
            setTotal(allSum)
            document.getElementById('orderModal').style.display = 'block'
        }).catch((err) => console.log(err))
    }


    console.log(summary.Items);

    return (<>
        <div id="orderModal" class="modal">
            <div class="modal-content ">
                <div class="order-modal ">
                    <div class="container">
                        <div class="order-modal-top">
                            <div class="order-modal-status">
                                <p class="order-modal-status-main">Order Summary</p>
                            </div>
                            <button class="close-btn" onClick={() => {
                                document.getElementById('orderModal').style.display = 'none'

                            }}><i class="bi bi-x"></i></button>
                        </div>
                        {summary.Items && summary.Items.map((item, index) => {
                            return (
                                <div class="order-summary">
                                    <div class="order-summary-table">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="head-table">
                                                    <a href="">
                                                        <p class="bold">{item.item_name}</p>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-6">
                                                <div class="order-summary-table-content">
                                                    <p>QTY:</p>
                                                    <p class="bold"> {item.quantity}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-6">
                                                <div class="order-summary-table-content">
                                                    <p>Price:</p>
                                                    <p class="bold">₹{item.price}</p>
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
                                            
                                        </div>
                                        <div class="order-summary-total">
                                            <p>Total Price : ₹{total[index]}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div class="order-box-main">
                            <p class="order-info">Order Info</p>
                            <div class="order-box-main-container">
                                <p class="order-box-main-head">Order No</p>
                                <p class="order-no-main-text">{summary.order_no}</p>
                            </div>
                            <div class="order-box-main-container">
                                <p class="order-box-main-head">Total Amount</p>
                                <p class="order-no-main-text">₹ {summary.total}</p>
                            </div>
                            <div class="order-box-main-container">
                                <p class="order-box-main-head">Order On</p>
                                <p class="order-no-main-text">{summary.order_date}</p>
                            </div>
                            <div class="order-box-main-container">
                                <p class="order-box-main-head">Payment Method</p>
                                <p class="order-no-main-text">{summary.payment_type}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="tab-pane " id="v-pills-profile" role="tabpanel" ariaLabel="v-pills-profile-tab">
            <h5 className="tab-head">My Orders</h5>
            {order.length ? <div className="row ">
                {
                    order.map((ord, index) => {
                        return (
                            <div className="col-md-12 col-lg-6">
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
                                            <button className="order-summary-button" onClick={() => showOderSummary(ord.order_reference)} >
                                                Order Summary<i className="bi bi-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


            </div> : <h4>"No Order yet"</h4>}



        </div></>
    )
}

export default MyOrders
