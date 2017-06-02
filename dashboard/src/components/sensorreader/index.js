import React, { Component } from 'react';
import * as firebase from 'firebase';
import Gauge from 'react-svg-gauge';
import PropTypes from 'prop-types';

import './style.css';

class SensorReader extends Component {

    getHexColor = (value) => {
        const string = value.toString(16);
        return (string.length === 1) ? '0' + string : string;
    }

    render(){
        const { temperatura, label } = this.props;
        const r = Math.floor(temperatura * 2.55);
        const g = Math.floor(255 - (temperatura * 2.55));
        const b = 0;
        const colorHex = '#' + this.getHexColor(r)  + this.getHexColor(g)  + this.getHexColor(b) ;

        return (
            <div>
                <Gauge value={temperatura} width={200} height={160} label={label} color={colorHex} />
            </div>
        )
    }
}

SensorReader.propTypes = {
    temperatura: PropTypes.number.isRequired,
    label: PropTypes.string
};

SensorReader.defaultProps = {
    temperatura: 0,
    label: ''
};


export default SensorReader;