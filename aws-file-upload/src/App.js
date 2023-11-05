import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false,
    errorMessage: '', // Initialize error message state
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    this.setState({ errorMessage: '' }); // Clear any previous error message

    if (this.state.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.state.selectedFile, this.state.selectedFile.name);

      // Set the custom Content-Type header
      const config = {
        headers: {
          'Content-Type': 'application/pdf',
        },
      };

      // Make the POST request using axios with the specified endpoint and content type
      axios
        .post("https://bsi6jz1ywb.execute-api.us-east-1.amazonaws.com/v1/upload", formData, config)
        .then(() => {
          this.setState({ selectedFile: null });
          this.setState({ fileUploadedSuccessfully: true });
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message }); // Handle any errors
        });
    } else {
      this.setState({ errorMessage: 'Please choose a file before uploading.' });
    }
  };

  fileData = () => {
    if (this.state.selectedFile) {
      // Create a Date object from lastModified property
      const lastModified = new Date(this.state.selectedFile.lastModified);
      
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified: {lastModified.toDateString()}
          </p>
        </div>
      );
    } else if (this.state.fileUploadedSuccessfully) {
      return (
        <div>
          <br />
          <h4>Your file has been successfully uploaded!</h4>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose a file and then press the Upload button</h4>
          {this.state.errorMessage && ( // Display error message if it exists
            <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
          )}
        </div>
      );
    };
  };
  

  render() {
    return (
      <div className='container'>
        <h2>AWS File Upload System</h2>
        <h3>Upload your File with React and Serverless API on the go!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button id="upload-button" onClick={this.onFileUpload}>Upload</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
