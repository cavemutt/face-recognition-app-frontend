// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }
 
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('clarifaiFace is ', width, height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log('facebox is ', box)
  }

  makeEyesMove = () => {
    const body = document.querySelector('body')
    const eyes = document.querySelectorAll('.eye')

    body.addEventListener('mousemove', (e) => {
      eyes.forEach(eye => {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);

        let radian = Math.atan2(e.pageX - x, e.pageY - y);
        let rotation = (radian * (180 / Math.PI) * -1) + 90;
        
        eye.style.transform = "rotate(" +rotation+ "deg)";
      })
    })
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }
  
  onButtonSubmit = () => {
    console.log('button clicked');
    this.setState({imageUrl: this.state.input});
    
    const USER_ID = 'oz44lgwmxud4';
    const PAT = '96d20761cfa04b73a395f74158fa5ed8';
    const APP_ID = 'facerecognition2022';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = this.state.input;
    // const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [{"data": {"image": {"url": IMAGE_URL}}}]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      }, body: raw
    };
    // test image https://images.unsplash.com/photo-1667933084680-97e5ecfad82e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2ODk5ODA0Mw&ixlib=rb-4.0.3&q=80&w=600
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then(response => {
        const parser = JSON.parse(response)
        console.log('hi', parser.outputs[0].data.regions[0].region_info.bounding_box)
        // console.log(response[]) doesn't work
        this.displayFaceBox(this.calculateFaceLocation(parser));      

        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              // id: this.state.user.id
            })
          })
          .then(response => response.json())
          // .then(count => {
          //   this.setState(Object.assign(this.state.user, { entries: count }))
          // })
        }
        // this.displayFaceBox(this.calculateFaceLocation(response))
      })
      // .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
    
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return ( 
      <div className="App">
        <ParticlesBg type="lines" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        <Logo makeEyesMove={this.makeEyesMove} />
        { route === 'home'
        ?<div>        
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
        : (
          route === 'signin'
          ? <SignIn onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
        )
        }
      </div>
    );

  }
}

export default App;


// NOTES: create-react-app not connecting with localhost on npm start
// 1) change in package.json start script to
//     "start": "react-scripts --openssl-legacy-provider start",
// 2) change in package.json react-scripts version to
//     "react-scripts": "^5.0.2" or above
// 3) change node version to LTS 18 or higher
