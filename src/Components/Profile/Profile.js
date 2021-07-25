import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import PersonalInformation from './PersonalInformation';
import MyAddresses from './MyAddresses';
import MyOrders from './MyOrders';
import Favourites from './Favourites';
import firebase from '../../firebase/config';
import { useHistory } from 'react-router-dom';
import Axios from '../../Axios/Axios'
import Footer from '../Footer'


function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,

    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function Profile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);


    const history = useHistory()
    const [user, setUser] = useState([])
    const [address, setAddress] = useState([])
    var phone = localStorage.getItem('phoneNumber')

    useEffect(() => {
        refresh()
    }, [])

    const refresh = () => {
        var phone = localStorage.getItem('phoneNumber')
        Axios.post('/CurrentUser/GetProfile.php', {
            "mobile": phone,
            "version": "1"
        }).then((res) => {
            setUser(res.data.Data.UserInfo)
            setAddress(res.data.Data.Addresses)
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const addActiveClass = (e) => {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        e.target.className += " active";
    }

    const logoutClick = () => {
        document.getElementById('delete-confirm').className = 'modal-view active'
    }

    const logout = () => {
        document.getElementById('delete-confirm').className = 'modal-view'

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('logout');
            localStorage.removeItem('phoneNumber')
            history.push('/')
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const cancellogout =()=>{
        document.getElementById('delete-confirm').className = 'modal-view'
    }

    return (
        <>
            <div class="modal-view" id="delete-confirm">
                <div class="delete-confirm" >
                    <div class="modal-data">
                        <h6>Do You Want to Logout?</h6>
                        <div class="button-group d-flex ">
                            <button class="conf-btn del-btn" onClick={logout} >Yes</button>
                            <button class="cancel-btn del-btn" onClick={cancellogout} >No</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className={classes.root}>
                    <div className="col-lg-4 col-md-4 col-12 tab ">
                        <div className="row">
                            <div className="account cf-border web mt-5">
                                <div className="account-details" style={{ overflow: 'hidden' }}>
                                    <h5>{user.name}</h5>
                                    <p>{user.email}</p>
                                    <p>{phone}</p>
                                </div>
                            </div>


                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                className='nav  tab-section cf-border'
                                TabIndicatorProps={{ style: { background: '#fff' } }}
                            >

                                <Tab label={
                                    <a className="nav-link  active" onClick={(e) => addActiveClass(e)} >
                                        <div className="tab-button">
                                            <span className="mobile-tab mobile"><i className="bi bi-shop fs"></i></span>
                                            <span className="web-tab">
                                                <p>My Orders</p>
                                                <i className="bi bi-chevron-right"></i>
                                            </span>
                                        </div>
                                    </a>
                                } {...a11yProps(1)} />
                                <Tab label={
                                    <a className="nav-link" onClick={(e) => addActiveClass(e)} >
                                        <div className="tab-button">
                                            <span className="mobile-tab mobile"><i className="bi bi-person"></i></span>
                                            <span className="web-tab">
                                                <p>Personal Information</p>
                                                <i className="bi bi-chevron-right"></i>
                                            </span>
                                        </div>
                                    </a>
                                } {...a11yProps(0)} />
                                <Tab label={
                                    <a className="nav-link  " onClick={(e) => addActiveClass(e)} >
                                        <div className="tab-button">
                                            <span className="mobile-tab mobile"><i className="bi bi-geo-alt fs"></i></span>
                                            <span className="web-tab">
                                                <p>My Addresses</p>
                                                <i className="bi bi-chevron-right"></i>
                                            </span>
                                        </div>
                                    </a>
                                } {...a11yProps(2)} />
                                <Tab label={
                                    <a className="nav-link  " onClick={(e) => addActiveClass(e)} >
                                        <div className="tab-button">
                                            <span className="mobile-tab mobile"><i className="bi bi-heart fs"></i></span>
                                            <span className="web-tab">
                                                <p>Favourites</p>
                                                <i className="bi bi-chevron-right"></i>
                                            </span>
                                        </div>
                                    </a>
                                } {...a11yProps(3)} />
                                <button className="mobile" onClick={logoutClick}><i className="bi bi-power "></i></button>
                            </Tabs>
                            <div className="log-out cf-border web mb-5">
                                <button onClick={logoutClick} >Logout</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 margin-bottom-tab">

                        {/* <!-- Tabs content --> */}
                        <div className="tab-content mt-4">

                            <TabPanel value={value} index={0}>
                                <MyOrders />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <PersonalInformation user={user} refresh={refresh} />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <MyAddresses address={address} refresh={refresh} />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <Favourites />
                            </TabPanel>

                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}
