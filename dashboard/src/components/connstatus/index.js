import React, { Component } from 'react';
import * as firebase from 'firebase';

import './style.css';

class ConnStatus extends Component {

    constructor(props){
        super(props);
        this.state = {
            connected: false
        }
    }

    componentDidMount(){
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", (snap) => {
        this.setState({connected: snap.val()})
        console.log( (snap.val()) ? "connected" : "not connected")
    });
    }

    render(){
        return (<i className="plug fa fa-plug fa-2x" style={{color: this.state.connected ? "green" : "red"}}/> )
    }


}

export default ConnStatus;