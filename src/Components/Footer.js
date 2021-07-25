import React from 'react'
import { Link } from 'react-router-dom'
import appleBadge from '../assets/images/apple-badge.png'
import googlePlayBadge from '../assets/images/google-play-badge.png'

function Footer() {
    return (
        <footer class="footer">
            <div class="container">
                <div class="row pt-5">
                    <ul class="col-lg-3 col-md-6 col-12 mb-3">
                        <li class="footer-group__header">Need some help</li>
                        <li class="footer-group__item"><Link to="/comingsoon" class="footer-group__link">help</Link></li>
                        <li class="footer-group__item"><Link to="/comingsoon" class="footer-group__link">delivery and return policies</Link></li>
                        <li class="footer-group__item"><Link to="/comingsoon" class="footer-group__link">customer service</Link></li>
                        <li class="footer-group__item"><Link to="/comingsoon" class="footer-group__link">FAQ</Link></li>
                    </ul>
                    <ul class="col-lg-3 col-md-6 col-12 mb-3">
                        <li class="footer-group__header">About Agent Kitchen</li>
                        <li class="footer-group__item"><Link to="/comingsoon" class="footer-group__link">About us</Link></li>
                        <li class="footer-group__item"><Link to="/comingsoon" class="footer-group__link">Terms and condition</Link></li>
                        <li class="footer-group__item"><Link to="/comingsoon" class="footer-group__link">Contact us</Link></li>
                    </ul>
                    <ul class="col-lg-3 col-md-6 col-12 mb-3">
                        <li class="footer-group__header">Social Links</li>
                        <div class="social">
                            <a href="https://www.facebook.com/cookfactor.in/"><div class="social-icon"><i class="bi bi-facebook"></i></div></a>

                            <a href="https://instagram.com/cookfactor.in?utm_medium=copy_link"><div class="social-icon"><i class="bi bi-instagram"></i></div></a>

                        </div>

                    </ul>
                    <ul class="col-lg-3 col-md-6 col-12 mb-3">
                        <div class="app-link">
                            <a href="#"><img src={googlePlayBadge} /></a>
                        </div>
                        <div class="app-link">
                            <a href="#"><img class="apple" src={appleBadge} /></a>
                        </div>


                    </ul>
                </div>

                <div class="footer-footnote">
                    <div class="footnote__copyright">&copy; Copyright Agent Kitchen 2021</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
