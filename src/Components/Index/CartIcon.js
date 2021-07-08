import React from 'react'

function CartIcon() {
    return (
        <a href="cart.html">
            <div className="floating-cart">
                <i className="bi bi-basket "></i>
                <div className="cart-count">5</div>
            </div>
        </a>
    )
}

export default CartIcon
