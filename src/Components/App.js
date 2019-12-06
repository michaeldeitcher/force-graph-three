import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Menu from './Menu'
import CenterCameraButton from './CenterCameraButton'
import PinNodeToggle from './PinNodeToggle'

function App() {
  return (
    <div className="App">
      <Menu/>
      <CenterCameraButton/>
      <PinNodeToggle/>
    </div>
  );
}

export default App;
