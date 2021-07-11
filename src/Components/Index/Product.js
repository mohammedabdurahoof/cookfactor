import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CategoryContext } from '../../store/Context'

function Product(props) {
    const history = useHistory()
    const { category } = useContext(CategoryContext)
    var items=[]
    if(category){
        console.log('ji');
        props.item.forEach(element => {
            if(element.category_reference === category){
                items.push(element)
            }
        });
    }else{
        console.log('err');
        items = props.item
    }
    console.log(items);
    return (
        <div>
            <div className="product-section">
                <div className="row">
                    <div className="section-title">
                        <h3>Popular products</h3>
                    </div>
                    <div className="product-div d-flex " id="items-div">

                        {
                            items && items.map((item, index) => {
                                return (
                                    <div className="col-lg-4 col-md-4 col-12" key={index} >
                                        <div onClick={() => history.push(`/product/${item.item_reference}`)}>
                                            <div className="product-box">
                                                <div className="product-image" style={{ backgroundImage: `url(${item.image})` }} ></div>
                                                <div className="product-desc">
                                                    <div className="product-title">
                                                        <h5>{item.name} </h5>
                                                    </div>
                                                    <div className="product-price">
                                                        <h6>₹<span>{item.actual_price}</span></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
