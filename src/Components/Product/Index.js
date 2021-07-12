import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Header from '../Header'
import Product from './Product'
import Axios from '../../Axios/Axios'

function Index() {
    const [item,setItem] = useState({})
    let { id } = useParams()
    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')
        var uid = localStorage.getItem('uid')
        if(phone){
            Axios.post('/Item/Retrieve.php', {
                "mobile": phone,
                "version": "1",
                "id": id
            }).then((res)=>{
                console.log(res.data.Data);
                setItem(res.data.Data)
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            Axios.post('/Item/Retrieve.php', {
                "mobile": '',
                'uid':uid,
                "version": "1",
                "id": id
            }).then((res)=>{
                console.log(res.data.Data);
                setItem(res.data.Data)
            }).catch((err)=>{
                console.log(err);
            })
        }
        
    },[])

    return (
        <>
            <Header />
            <Product item={item}/>
        </>
    )
}

export default Index