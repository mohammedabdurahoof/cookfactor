import React from 'react'
import { useHistory } from 'react-router-dom'

function CartIcon(props) {
    const history = useHistory()
    return (
        <div onClick={()=>history.push('/cart')} style={{cursor:'pointer'}}>
            <div className="floating-cart">
                <i className="bi bi-basket "></i>
                <div className="cart-count">{props.cart.length}</div>
            </div>
        </div>
    )
}

export default CartIcon
