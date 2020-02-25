import React from "react";

import {useParams} from "react-router-dom";

import "./package-component-styles.css"

import {Depends} from '../depends-component/depends-component'
import {Description} from '../desc-component/desc-component'
import {RevDep} from '../revdep-component/revdep-component'


const Package = (props) => {
  
    // UseParams to get address
    let { currentParams } = useParams()
    let { packages } = props;
  
    // State is being pushed to component as props and wanted package is found by comparing it 
    // to the address parameters offered by React-router
    function find(packages , currentParams) {
      return packages.find(p => p.name == currentParams);
    }
  
    return (
        <div className="package-container">
            {/* Print params as package name
                if packages not found --> print packages 404 */}
            <h1>{currentParams}</h1>

            {packages ?(
                find(packages, currentParams) ? (
                    <div className="info-container">
                        {/* Find is being used to locate the right package and then by adding.wantedData we can get the details */}
                        <Description description={find(packages, currentParams).description}/>
                        <Depends depends={find(packages, currentParams).depends} find={find} packages={packages}/>
                        <RevDep depends={find(packages, currentParams).depends} packages={packages} params={currentParams}/>
                    </div>
                ) : <h1>Package not found</h1>
            ) : null }

        </div>
    )
  }

  
  



export default Package;


