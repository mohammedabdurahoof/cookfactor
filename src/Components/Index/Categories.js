import React from 'react'
import Slider from "react-slick";

function Categories() {

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
                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Ready to cook</button>
                    </div>

                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Chicken</button>
                    </div>

                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Mutton</button>
                    </div>

                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Fish</button>
                    </div>

                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Beef</button>
                    </div>


                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Buffalo</button>
                    </div>


                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Spring Chicken</button>
                    </div>


                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Pickel</button>
                    </div>


                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Duck</button>
                    </div>

                    <div className="categories-div">
                        <button className="categories-button cf-border  ">Quail</button>
                    </div>


                </Slider>
            </div>
    );
}

export default Categories
