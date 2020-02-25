import React from "react";
import {Link} from "react-router-dom"

import "./revdep-component-styles.css"

export const RevDep = (props) => {
  
const packages = props.packages

// If depends exists --> look for match in the other packages
// When name is found in other packagages depends --> Create link for reverse dependency
const revDepItems = packages.map(packag => 
      {
          if(packag.depends && packag.depends.find(depend => depend === props.params)){
            return (
              <li>
                <Link to={`/${packag.name}`}>{packag.name}</Link>
              </li>
              )  
            }   
    })

    return (
        <div className='revdep-container'>
          <div className='title'>
            {revDepItems ? (<h2>Reverse Dependencies</h2>) : null}
          </div>
              <div className='revdep'>
                <ul>
                    {revDepItems}
                </ul>
              </div>
        </div>
    )

  }

  export default RevDep