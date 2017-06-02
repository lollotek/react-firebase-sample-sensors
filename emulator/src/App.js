import React, { Component } from 'react';
import * as firebase from 'firebase';
import SensorConfig from './components/sensorconfig'
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      temperature: []
    }
  }

  componentDidMount(){
    const connectedRef = firebase.database().ref("sensors");
    connectedRef.on("child_added", (snap) => {
    this.setState({temperature:[ ...this.state.temperature, {
            val: snap.val(),
            id: snap.key
        }
        ]})    
        console.log('sensors', snap.val(), this.state.temperature);
    });

    connectedRef.on("child_removed", (snap) => {
        this.setState({
          temperature: this.state.temperature.filter((temperatura) => {
              return temperatura.id != snap.key
            })
        }); 
    });
  }

  valueChange = (value, key) => {

    let updates = {};
    updates['/sensors/' + key] = value;

    firebase.database().ref().update(updates)
    console.log('change value', value, key);
  }

  killMe = (key) => {
    console.log('kill id', key);
    firebase.database().ref("sensors/"+key).remove()
  }

  addMe = () => {
    const newKey = firebase.database().ref("sensors/").push().key;

    let updates = {};
    updates['/sensors/' + newKey] = 50;

    firebase.database().ref().update(updates)

    console.log('newKey', newKey);
  }
  
  render() {

    const sensors = this.state.temperature.map((temperatura, index) => {
      return (
        <SensorConfig key={temperatura.id} id={temperatura.id} 
        value={temperatura.val} 
        valueChange={this.valueChange}
        killMe={this.killMe} />
      )
    })

    return (
      <div className="App">
        {sensors}
         <input type="button" value=" add sensor " onClick={this.addMe}/>
      </div>
    );
  }
}

export default App;
