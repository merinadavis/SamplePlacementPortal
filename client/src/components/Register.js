import React, { Component } from 'react'
import { register } from './UserFunctions'
import swal from 'sweetalert'
class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser).then(res => {
      console.log(res);
      if(res.status){
        swal("Success", res.status, "success");
        this.props.history.push(`/login`);
      }
      else{
        swal("Error", res.error, "error");
        this.setState({first_name:"",last_name:"",email:"",password:""});
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                 // className={classnames('form-control', {'is-invalid': this.state.errors.first_name})}
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
                {/* {this.state.errors.first_name && (<div className="invalid-feedback">{this.state.errors.first_name}</div>)} */}
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  // className={classnames('form-control', {'is-invalid': this.state.errors.last_name})}
                  name="last_name"
                  placeholder="Enter your last name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
                 {/* {this.state.errors.last_name && (<div className="invalid-feedback">{this.state.errors.last_name}</div>)} */}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  // className={classnames('form-control', {'is-invalid': this.state.errors.email})}
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {/* {this.state.errors.email && (<div className="invalid-feedback">{this.state.errors.email}</div>)} */}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  // className={classnames('form-control', {'is-invalid': this.state.errors.password})}
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {/* {this.state.errors.password && (<div className="invalid-feedback">{this.state.errors.password}</div>)} */}
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
