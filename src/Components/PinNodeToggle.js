import React, {Component} from 'react';
import simpleStore from '../simpleStore';
import './PinNodeToggle.css'

class PinNodeToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {checked: simpleStore.pinNodeEnabled || false};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        simpleStore.pinNodeEnabled = event.target.checked;
        this.setState({checked: event.target.checked});
    }

    render() {
        return (
            <div class="switch">
                <label>
                    Off
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>
                    <span class="lever"></span>
                    On
                </label>
            </div>        
        )
    };
}

export default PinNodeToggle;