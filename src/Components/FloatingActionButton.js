import React, {Component} from 'react';
import M from "materialize-css";

class FloatingActionButton extends Component {
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  reloadPage = () => window.location.reload()

  render() {
    let icon = "mode_edit";
    return (
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large red">
            <i class="large material-icons">{icon}</i>
        </a>
        <ul>
            <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
            <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
            <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
            <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
        </ul>
    </div>
    )}
}

export default FloatingActionButton;
