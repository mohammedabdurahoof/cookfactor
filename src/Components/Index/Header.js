import React from 'react'
import { useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from '../../Axios/Axios';






function Header(props) {
    const history = useHistory()
    console.log(props.userInfo);
    const item = props.item
    var phone = localStorage.getItem('phoneNumber')
    var uid = localStorage.getItem('uid')

    const search = (value) => {
        if(phone){
            Axios.post('/CurrentUser/Search.php', {
                "mobile": phone,
                "version": "1",
                "q": value
            }).then((res) => {
                //console.log(res.data.Data.Item[0].item_reference);
                history.push(`/product/${res.data.Data.Item[0].item_reference}`)
            }).catch((err) => {
                console.log(err);
            })
        }else{
            Axios.post('/CurrentUser/Search.php', {
                "mobile": '',
                'uid':uid,
                "version": "1",
                "q": value
            }).then((res) => {
                //console.log(res.data.Data.Item[0].item_reference);
                history.push(`/product/${res.data.Data.Item[0].item_reference}`)
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <header className="header home scroll" >
            <div className="navhome container">
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-12 ">
                        <div className="logo ">
                            <h1 onClick={() => history.push('/')} style={{ cursor: 'pointer' }} >Cook Factor</h1>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7 col-9 ">
                        <div className="search-box">
                            <div className="form-group has-search">
                                <button type="submit" className="form-control-feedback search-btn">
                                    <i className="bi bi-search"></i>
                                </button>
                                <Autocomplete
                                    className="form-control search-input"
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    onChange={(e, v) => search(v)}
                                    options={item.map((option) => option.name)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            //label="Search input"
                                            margin="dense"
                                            //variant="outlined"
                                            InputProps={{ ...params.InputProps, type: 'search', disableUnderline: true }}
                                        />
                                    )}
                                />
                                {/* <input type="text" className="form-control search-input" placeholder="Search" /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-3">
                        <div className="nav-menu">
                            {
                                phone ? <div className="profile">
                                    <div onClick={() => history.push('/profile')} style={{ cursor: 'pointer' }} className="profile-link">
                                        <div className="profile-box">

                                        </div>
                                        <p>{props.user.name}</p>
                                    </div>
                                </div> :
                                    <div onClick={() => history.push('/login')} style={{ cursor: 'pointer' }} className="profile-link">

                                        <p>Login</p>
                                        <button className=" log-in" >
                                            <i className="bi bi-box-arrow-in-right"></i>
                                        </button>
                                    </div>

                            }




                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
