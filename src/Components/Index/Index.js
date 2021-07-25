import React, { useEffect, useState } from 'react'

import Axios from '../../Axios/Axios'
import { v4 as uuidv4 } from 'uuid';

import Header from './Header';
import CartIcon from './CartIcon';
import Banner from './Banner';
import Categories from './Categories';
import Product from './Product';
import Category from '../../store/Context';
import Footer from '../Footer';

function Index() {
    const [cart, setCart] = useState([])
    const [category, setCategory] = useState([])
    const [item, setItem] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [title, setTitle] = useState('')


    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')
        var uid = localStorage.getItem('uid')
        if (phone) {
            Axios.post("/CurrentUser/Home.php", {
                "mobile": phone,
                "version": "1"
            }).then((response) => {
                console.log(response.data.Data);
                var data = response.data.Data
                setCart(data.Cart)
                setCategory(data.Category)
                setItem(data.Item)
                setUserInfo(data.UserInfo)
                setTitle(data.SectionTitle)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            console.log('Not log in');
            if (!uid) {
                var uuid = uuidv4()
                console.log('new');
                localStorage.setItem('uid', uuid)
            }
            console.log(uid);
            Axios.post("/CurrentUser/RegisterUID.php", {
                "mobile": '',
                "version": "1",
                'uid': uid
            }).then((response) => {
                console.log(response.data.Status);
                Axios.post("/CurrentUser/Home.php", {
                    "mobile": '',
                    "version": "1",
                    'uid': uid
                }).then((response) => {
                    console.log(response.data.Data);
                    var data = response.data.Data
                    setCart(data.Cart)
                    setCategory(data.Category)
                    setItem(data.Item)
                    setTitle(data.SectionTitle)
                    setUserInfo(data.UserInfo)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log('err')
            })
        }

    }, [])

    category.sort(function (a, b) {
        return a.sort_order - b.sort_order;
    });

    item.sort(function (a, b) {
        return a.sort_order - b.sort_order;
    });
    return (
        <Category>
            {
                item.length ? <>
                    <Header user={userInfo} item={item} />

                    <div className='container' style={{ marginTop: '100px' }}>
                        <CartIcon cart={cart} />
                        <Banner item={item} />
                        <Categories category={category} />
                        <Product item={item} SectionTitle={title} />
                    </div>

                    <Footer />
                </> : <div class="center-loading">
                    <div class="loading-anim"></div>
                </div>
            }

        </Category>

    )
}

export default Index
