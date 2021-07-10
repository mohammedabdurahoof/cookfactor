import React from 'react'
import Carousel from "react-material-ui-carousel"

import {
    Card,
    CardMedia,
    Grid
} from '@material-ui/core';

function Project(props) {
    if (props.newProp) console.log(props.newProp)


    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="">
                <Grid item xs={12} >
                    <CardMedia
                        className="Media"
                        image={props.item}
                    >
                    </CardMedia>

                </Grid>
            </Grid>
        </Card>
    )
}



function Banner(props) {
    const items = []
    props.item && props.item.forEach(element => {
        if(element.offer_item === true){
            items.push(element.image)
        }
    });
    //console.log(props.banner);
    return (
        <div style={{ height: '100%' }} >
            <Carousel
                className="Example"
                autoPlay={true}
                animation='fade'
                indicators={true}
                timeout={500}
                cycleNavigation={true}
                navButtonsAlwaysVisible={false}
                navButtonsAlwaysInvisible={false}
                //next={(now, previous) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                //prev={(now, previous) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                // onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`)}

            >
                {
                    items.map((item, index) => {
                        return <Project item={item} key={index} />
                    })
                }
            </Carousel>
        </div>

    )
}

export default Banner
