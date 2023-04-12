import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class AdminNavbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("admintoken");
    this.props.history.push(`/admin/login`);
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/admin/login" className="nav-link">
            <button className="btn btn-outline-light">Login</button>
          </Link>
        </li>
      </ul>
    );

    const adminLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">
            <button className="btn btn-outline-light">Dashboard</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/users" className="nav-link">
            <button className="btn btn-outline-light">Users</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/products" className="nav-link">
            <button className="btn btn-outline-light">Products</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/orders" className="nav-link">
            <button className="btn btn-outline-light">Orders</button>
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            <button className="btn btn-outline-light">Logout</button>
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <button className="btn btn-outline-light">Home</button>
              </Link>
            </li>
          </ul>
          {localStorage.admintoken ? adminLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(AdminNavbar);
