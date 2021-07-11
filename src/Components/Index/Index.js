import React, { useEffect, useState } from 'react'

import Axios from '../../Axios/Axios'
// import { v4 as uuidv4 } from 'uuid';

import Header from './Header';
import CartIcon from './CartIcon';
import Banner from './Banner';
import Categories from './Categories';
import Product from './Product';
import Category from '../../store/Context';

function Index() {
    const [cart, setCart] = useState([])
    const [category, setCategory] = useState([])
    const [item, setItem] = useState([])
    const [userInfo, setUserInfo] = useState([])
    // const [bannerItem, setBannerItem] = useState(null)


    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')
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
            }).catch((err) => {
                console.log(err)
            })
        } else {
            console.log('Not log in');
        }
        // var uid;
        // uid = uuidv4()
        // Axios.post("/CurrentUser/RegisterUID.php",{
        //     "mobile": "",
        //     "version": "1",
        //     'uid':uid
        // }).then((response) => {
        //     console.log(response.data.Status);
        // }).catch((err)=>{
        //     console.log('err')
        // })
    }, [])

    return (
        <Category>
            <div className='container'>
                <Header user={userInfo} item={item} />
                <CartIcon cart={cart} />
                <Banner item={item}/>
                <Categories category={category} />
                <Product item={item} />
            </div>
        </Category>
    )
}

export default Index
