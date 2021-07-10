import React, { useContext } from 'react'
import Slider from "react-slick";
import {CategoryContext} from '../../store/Context'

function Categories(props) {
    const {setCategory} = useContext(CategoryContext)
    var activeClass = (e,index) => {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        e.target.className += " active";
        let span = document.getElementById(index)
        setCategory(span.innerHTML)
    }

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
                                <button className="categories-button cf-border" onClick={(e) => activeClass(e,index)}><span id={index} hidden >{category.category_reference}</span>{category.description}</button>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
}

export default Categories
