import React, { Component } from 'react';
import * as firebase from 'firebase';

import logo from './logo.svg';
import './App.css';
import ConnStatus from  './components/connstatus';
import SensorReader from  './components/sensorreader';


const ON_VALUE_CHANGE = 'value';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      utente: 'loading.... ',
      temperature: []
    }
  }

  componentDidMount(){
    const recentPostsRef = firebase.database().ref('Utente');
    recentPostsRef.on(ON_VALUE_CHANGE, data => {
       console.log(data.val());
      this.setState({
        utente: data.val()
      })
    })

    const connectedRef = firebase.database().ref("sensors");
    connectedRef.on("child_added", (snap) => {
       this.setState({temperature:[ ...this.state.temperature, {
            val: snap.val(),
            id: snap.key
          }
        ]})    
        console.log('sensors', snap.val(), this.state.temperature);
    });

    connectedRef.on("child_changed", (snap) => {
      const temperature = this.state.temperature.map( temperatura => {
          if (snap.key === temperatura.id){
            return {
              val: snap.val(), 
              id: snap.key
            }
          }
          return temperatura;
        })
      this.setState({temperature: temperature},() => {
        console.log('sensors changed:', snap.val(), this.state.temperature);
      })    
    });

    connectedRef.on("child_removed", (snap) => {
        this.setState({
          temperature: this.state.temperature.filter((temperatura) => {
              return temperatura.id != snap.key
            })
        });
    });

  }

  render() {

    const sensors = this.state.temperature.map((temperatura, index) => {
      return (
        <SensorReader key={temperatura.id} temperatura={temperatura.val} label={temperatura.id}/>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <h2>Sensor reader</h2>
          <ConnStatus />
        </div>
        <div className="App-intro">    
          {sensors} 
        </div>
        
      </div>
    );
  }
}

export default App;
