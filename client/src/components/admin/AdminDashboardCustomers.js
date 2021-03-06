import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import * as actions from "../../actions/actions_index";
import axios from "axios";
import CustomerTable from "./customerListComponents/customerTable";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import _ from "lodash";
import { Link } from "react-router-dom";
import { styles } from "../../styles/styles";

class AdminDashboardCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({
        showMessage: true
      });
    } else {
      this.setState({
        showMessage: false
      });
    }
  }

  componentDidMount() {
    this.props.getCustomerList();
  }

  handleSearchChange(event, query) {
    this.props.searchCustomerByName(query);
  }

  handleRequestClose() {
    this.props.clearMessage();
  }

  render() {
    const searchNames = _.debounce(
      (event, query) => this.handleSearchChange(event, query),
      500
    );

    return (
      <div className="row">
        <div className="container-fluid">
          <div className="col s12">
            <Paper style={styles.table.paper}>
              <div>
                <div>
                  <Link to="/admin/dashboard/customer/add">
                    <RaisedButton
                      className="right"
                      label="+ Add Customer"
                      primary={true}
                    />
                  </Link>
                  <i className="material-icons" style={styles.search}>
                    search
                  </i>
                  <TextField
                    hintText="Enter a name..."
                    onChange={searchNames}
                    style={styles.search.textfield}
                  />
                </div>
              </div>
              <CustomerTable customers={this.props.customers} />
            </Paper>
          </div>
          <Snackbar
            open={this.state.showMessage}
            message={this.props.message}
            autoHideDuration={4000}
            onRequestClose={() => this.handleRequestClose()}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { customers: state.customerList, message: state.messages.message };
}

export default connect(mapStateToProps, actions)(AdminDashboardCustomer);
