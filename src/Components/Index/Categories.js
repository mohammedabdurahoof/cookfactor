import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import Slider from "react-slick";
import { CategoryContext } from '../../store/Context'

function Categories(props) {
    const history = useHistory()
    
    var settings = {
        infinite: false,
        swipeToSlide: true,
        centerMode: false,
        speed: 50,
        edgeFriction: 0.15,
        variableWidth: true
    };
    return (

        <div className="categories" >
            <Slider {...settings} className="categories-content" id="categories">
                {
                    props.category && props.category.map((category, index) => {
                        return (
                            <div className="categories-div" key={index} >
                                <span id={index} hidden >{category.category_reference}</span>
                                <button className="categories-button cf-border" onClick={() => history.push(`/category/${category.category_reference}`)} >{category.description}</button>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
}

export default Categories
