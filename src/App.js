import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
window.process = {
  env: {
    NODE_ENV: 'development'
  }
}

const app = new Clarifai.App({
  apiKey: '7993c2cb92854b2080a4ac1317ab4bbd'
});
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response)=>{
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      }) 
      .catch((err) => {
        
      });
  };

  render () {
    return (
      <div className="App">
        <>
        <div>...</div>
        <ParticlesBg type="cobweb" bg={true} />
        </>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition  imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
