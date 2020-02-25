import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import PackageList from "./components/package-list-component/package-list-component"
import Package from "./components/package-component/package-component"
import Upload from './components/upload-component/upload-component'




class App extends Component {

  // Packages state is being updated when /GET route is requested
  constructor(props){
    super(props);
    this.state = {
      packages: null
    };
  }

  render() {  
  const {packages} = this.state;

    return (
      // React Router is being used to make links for packages
      <Router>
        <div className="App">
          <div className="left-container">
            <Upload callApi ={this.callApi} setPackages={p=>{this.setState(p)}}/>
            <PackageList packages ={packages}/>
          </div>
        
        {/*Switch is being used to jump between packages */}
          <Switch>
            <Route path="/:currentParams">
              {/* Package-component is generated for every package returned from backend API */}
              <Package packages={packages}/>
            </Route>
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
