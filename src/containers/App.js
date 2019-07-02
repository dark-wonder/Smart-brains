import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from '../components/Navigation/navigation.js';
import Logo from '../components/Logo/logo.js';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js';
import Rank from '../components/Rank/Rank.js';
import SignIn from '../components/SignIn/SignIn.js';
import Register from '../components/Register/Register';

const app = new Clarifai.App({
 apiKey: 'd17dd7acf5334c01baf23f6c4de0468d'
});

const particlesOptions = {
  particles: {
    number: {
      value: 20,
      density : {
        enable: true,
        value_area: 200
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: new Date()
      }
    }
  }

  calculateFaceLocation = (data) => {
    //console.log(data); its how data is saved
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

// componentDidMount() {
//   fetch('http://localhost:3001')
//   .then(response => response.json())
//   .then(console.log)
// }


  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn:false})
    } else if (route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
          ? <div>
              <Logo/>
              <Rank/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div> 
          : (
              route === 'signin' 
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange}/>       
            )
        }
      </div>
    );
  }
}

export default App;
