import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from '../../Axios/Axios'

function Favourites() {
    const [favourite, setFavourite] = useState([])
    useEffect(() => {
        var phone = localStorage.getItem('phoneNumber')

        Axios.post(('/CurrentUser/GetFavourites.php'), {
            "mobile": phone,
            "version": "1"
        }).then((res) => {
            console.log(res.data);
            setFavourite(res.data.Data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    const removeFavourites = (id)=>{
        var phone = localStorage.getItem('phoneNumber')
        Axios.post(('/CurrentUser/SetFavourite.php'), {
            "mobile": phone,
            "version": "1",
            "status": false,
            "id": id
        }).then((res) => {
            console.log(res.data);
            Axios.post(('/CurrentUser/GetFavourites.php'), {
                "mobile": phone,
                "version": "1"
            }).then((res) => {
                console.log(res.data);
                setFavourite(res.data.Data);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="tab-pane">
            <h5 className="tab-head">My Favourites</h5>
            {favourite.length ? <div className="row ">
                {
                    favourite.map((itm, key) => {
                        return (
                            <div className="col-lg-6 col-md-12 mb-4">
                                <Link to={"/product/"+itm.item_reference}>
                                    <div className="product-box">
                                        <div className="product-image" style={{ backgroundImage: `url(${itm.image})` }}>
                                        </div>
                                        <div className="product-desc">
                                            <div className="product-title">
                                                <h5>{itm.name} </h5>
                                            </div>
                                            <div className="product-price">
                                                <h6>₹<span>{itm.price}</span></h6>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="fav-remove ">
                                    <button className="fav-remove-button cf-border " onClick={()=>removeFavourites(itm.item_reference)} >Remove from Favourites</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>:<h4>"No item in Favourites"</h4>}
        </div>
    )
}

export default Favourites
