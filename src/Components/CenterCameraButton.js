import React, {Component} from 'react';
import simpleStore from '../simpleStore';
import './CenterCameraButton.css'

function CenterCameraButton() {
    return (
        <div class='center-camera-button'>
            <a class="btn-floating btn-large waves-effect waves-light black"><i class="material-icons">center_focus_strong</i></a>
        </div>
    );
}

export default CenterCameraButton;