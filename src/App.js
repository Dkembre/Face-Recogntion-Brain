import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
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
      imageUrl: '',
      box: {},
      route: 'Signin'
    }
  }
  caculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
   }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.caculateFaceLocation(response))) 
    .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render () {
    return (
      <div className="App">
        <>
        <div>...</div>
        <ParticlesBg type="cobweb" bg={true} />
        </>
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route === 'Signin' 
        ? <Signin onRouteChange={this.onRouteChange}/> 
        : <div>
        <Logo /> 
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition  box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
    }
      </div>
    );
  }
}

export default App;
