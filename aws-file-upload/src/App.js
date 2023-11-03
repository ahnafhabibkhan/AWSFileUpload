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

    const formData = new FormData();
    formData.append('file', this.state.selectedFile, this.state.selectedFile.name);

    // Make the API request using axios
    axios
      .post("https://sk48x8co83.execute-api.us-east-1.amazonaws.com/prod/file-upload", formData)
      .then(() => {
        this.setState({ selectedFile: null });
        this.setState({ fileUploadedSuccessfully: true });
      });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified: {this.state.selectedFile.lastModifiedDate.toDateString()}
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
    }
  };

  componentDidMount() {
    // Use componentDidMount for setting up event listeners
    document.getElementById('upload-button').addEventListener('click', this.onFileUpload);
  }

  render() {
    return (
      <div className='container'>
        <h2>AWS File Upload System</h2>
        <h3>Upload your File with React and Serverless API on the go!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button id="upload-button">Upload</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
