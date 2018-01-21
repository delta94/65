import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import * as actions from "../actions/actions_index.js";
import { styles } from "../styles/styles";

class Header extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderHeaderButtons() {
    if (this.props.isAdmin === undefined) {
      return (
        <div>
          <Link to="/customer/login">
            <RaisedButton
              label="Customer Login"
              secondary={true}
              style={styles.header.button}
            />
          </Link>
          <Link to="/admin/login">
            <RaisedButton label="Admin Login" secondary={true} />
          </Link>
        </div>
      );
    } else {
      if (this.props.isAdmin) {
        return (
          <div>
            <RaisedButton href="/api/logout" label="Logout" secondary={true} />
          </div>
        );
      } else {
        return (
          <div>
            <RaisedButton href="/api/logout" label="Logout" secondary={true} />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <AppBar
        title={<span style={{ cursor: "pointer" }}>65</span>}
        onTitleClick={this.rootRedirect}
        iconElementRight={this.renderHeaderButtons()}
        showMenuIconButton={false}
      />
    );
  }
}

function mapStateToProps({ auth }) {
  return { isAdmin: auth.isAdmin };
}

export default connect(mapStateToProps, actions)(Header);
