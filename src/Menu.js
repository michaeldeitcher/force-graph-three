import React, {Component} from 'react';
import M from "materialize-css";
import './Menu.css';

class Menu extends Component {
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  reloadPage = () => window.location.reload()

  render() {
    return (
    <div className="Menu">
      <ul id="slide-out" class="sidenav">
        <li><a onClick={this.reloadPage}>Reload Page</a></li>
        <li class="no-padding">
        </li>
      </ul>
      <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>      
    </div>
    )}
}

export default Menu;
