import React, { Component } from "react";

import "./upload-component-styles.css"
import UploadIcon from "./upload.png"

class Upload extends Component {

    constructor(props){
        super(props);
        this.state = {
          selectedFile: null
        };
      }   
    

    // Updates the state with the selected file in <input>
    onChangeHandler=event=>{
      this.setState({
        selectedFile: event.target.files[0]
      })
    }
      
    // When Submit button is pressed, backend API is requested with POST(upload file and define path),
    // followed by GET request(get the data)
    onClickHandler = () => {
        
      const data = new FormData() 
      data.append('file', this.state.selectedFile)
      fetch('http://localhost:3333/upload',{
        method: 'POST',
        body: data
      }).then(() =>{
        return this.callApi()
      }).then(res => {console.log(res)
        // Set state in parent component
        this.props.setPackages({packages: res[0]})
      })
    }
       
    // Fetch the data from backend
    callApi = async () => {
      const response = await fetch('http://localhost:3333/packages');
      const body = await response.json();
        if (response.status !== 200) throw Error(body.message);   
      return body;
    };

    render(){
        return (
            <div className="upload-container">
                <div className="file-container">
                    <img src={UploadIcon}/>
                    <input type="file" name="file" className="input-button" onChange={this.onChangeHandler}/>
                </div>
                <button type="button"  onClick={this.onClickHandler}><span className="effect-up">Up</span><span className="effect-down">load</span></button> 
            </div>
        );
    }
}

export default Upload;
