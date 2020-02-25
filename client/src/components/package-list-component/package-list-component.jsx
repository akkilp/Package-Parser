import React from "react";
import {Link} from "react-router-dom"
import "./package-list-component-styles.css"

// Return left side of the page
// Maps all the packages using react-router-dom

function PackageList(props) {

    const {packages} = props

    return (
    <div className="package-list-container">
        <div className="fade-away-top"/>
        <div className="package-list">
                <ul>
                    {/* Making sure packages are found, cant do .map to undefined */}
                    {packages ? ( 
                        packages.map(listPackage => 
                            <li>
                                <Link to={`/${listPackage.name}`}>{listPackage.name}</Link>
                            </li>
                        ) 
                        ) : null
                    }
                </ul>
        </div>
        <div className="fade-away-bot"/>
    </div>
    );
}

export default PackageList;
