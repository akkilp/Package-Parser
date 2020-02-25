import React from "react";

import "./desc-component-styles.css"

export const Description = (props) => {
  
    return (
        <div className='desc-container'>
            <div className='title'>
                <h2>Description</h2>
            </div>               
            <div className="description">
                <p>{props.description}</p>
            </div>
        </div>
    )

}

