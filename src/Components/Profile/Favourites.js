import React, { useEffect, useState } from 'react'
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
    return (
        <div className="tab-pane" id="v-pills-settings" role="tabpanel" ariaLabel="v-pills-settings-tab">
            <h5 className="tab-head">My Favourites</h5>
            <div className="row ">
                {
                    favourite.map((itm, key) => {
                        return (
                            <div className="col-md-6 col-12 mb-4">
                                <a href="/">
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
                                </a>
                                <div className="fav-remove ">
                                    <button className="fav-remove-button cf-border ">Remove from Favourites</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Favourites
