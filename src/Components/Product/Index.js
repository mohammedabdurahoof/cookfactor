import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Header from '../Header'
import Product from './Product'
import Axios from '../../Axios/Axios'

function Index() {
    const [item, setItem] = useState({})
    const [price, setPrice] = useState(0)
    const [itemCart, setItemCart] = useState({})
    let { id } = useParams()
    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')
        var uid = localStorage.getItem('uid')
        if (phone) {
            Axios.post('/Item/Retrieve.php', {
                "mobile": phone,
                "version": "1",
                "id": id
            }).then((res) => {
                console.log(res.data.Data);
                setItem(res.data.Data)
                setPrice(res.data.Data.price * res.data.Data.min_order)
                Axios.post('/CurrentUser/GetCart.php', {
                    "mobile": phone,
                    "version": "1"
                }).then((respones) => {
                    console.log(respones.data);
                    respones.data.Data.forEach(element => {
                        if (res.data.Data.item_reference === element.item_reference) {
                            console.log('same');
                            setItemData(element)
                            setPrice(element.quantity * res.data.Data.price)
                        } else {
                            console.log('not same');
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        } else {
            Axios.post('/Item/Retrieve.php', {
                "mobile": '',
                'uid': uid,
                "version": "1",
                "id": id
            }).then((res) => {
                console.log(res.data.Data);
                setItem(res.data.Data)
                setPrice(res.data.Data.price * res.data.Data.min_order)
                Axios.post('/CurrentUser/GetCart.php', {
                    "mobile": '',
                    "version": "1",
                    'uid': uid
                }).then((respones) => {
                    console.log(respones.data);
                    respones.data.Data.forEach(element => {
                        if (res.data.Data.item_reference === element.item_reference) {
                            console.log('same');
                            setItemData(element)
                            setPrice(element.quantity * res.data.Data.price)
                        } else {
                            console.log('not same');
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        }


    }, [])


    const setItemData = (itm) => {
        console.log('ok same');
        document.getElementById('quantity').className += " active"
        document.getElementById('viewCart').className += " active"
        document.getElementById('addToCart').className += " active"
        var itemDet = {
            cutting: itm.cutting_type_reference,
            quantity: itm.quantity,
            skin_removal: itm.skin_removal,
            cooking: itm.cooking_type_reference,
            cleaning: itm.cleaning,
            marination: itm.marination_type_reference
        }
        setItemCart(itemDet)
    }

    return (
        <>
            {Object.keys(item).length ? <><Header />
                <Product item={item} price={price} setPrice={setPrice} itemDetiles={itemCart} /></> : <div class="center-loading">
                <div class="loading-anim"></div>
            </div>}

        </>
    )
}

export default Index