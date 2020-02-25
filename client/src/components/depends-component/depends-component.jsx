import React from "react";
import {Link} from "react-router-dom"

import "./depends-component-styles.css"

export const Depends= (props) => {
  
  const depends = props.depends;
  const find = props.find;
  const packages = props.packages;

  const dependItems = 

      // If depends are found --> map, else return null
      depends ? (
        depends.map((item)=>{
          // Depends with alternatives are marked with "|"
          // If such are found, depends are split
          if(item.indexOf('|')> -1){
            let items = item.split('|')
            // Declare entry
            let entry ;
            // Declare array for rest
            let rest = [];
            // Items are mapped through, looking for a matching entry
            // When entry is found, link is created for it
            // Rest are printed as text next to the entry
            items.map((item,i) =>{if(find(packages, item.trim())){entry=item.trim()} else rest.push(item)
          })
          return(
            <li>
                <Link to={`/${entry}`}>{entry}</Link>{rest.map((item,i) =>{
                  if(entry === undefined && i==0){
                    return item
                  }
               else return (" | " + item) })}
            </li>
          )
          } 
          // If '|' not found --> Return the item as link
          else {
            return(
              <li>
                <Link to={`/${item}`}>{item}</Link>
              </li>
            )
          }
        })
      ) : null
    
  return(
      <div className="dep-container">
        <div className="title">
         <h2>Dependencies</h2>
        </div>
          <div className="dependencies">
            <ul>
               {dependItems}
            </ul>
          </div>
      </div>
  )
}

