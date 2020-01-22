import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Auth } from "aws-amplify";
import logo from '../../images/Cloud_refactor_logo.png';

export class header extends Component {

  state = {
    user: '',
    isAuthenticated: false
  }

  componentDidMount = () => {
    this.onLoad();
  }

  async onLoad() {
    try {
      await Auth.currentSession().then(sessionAttributes => {
        this.setState({ user: sessionAttributes.getIdToken().payload, isAuthenticated: true });
      });
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }

  fedLogin = () => {
    Auth.federatedSignIn({ provider: 'Google' });
  }

  logout = () => {
    console.log("sign out")
    Auth.signOut();
  }



  render1() {

    const { values } = this.props;
    console.log(values);



    return (


      <Navbar className="cr-header" bg="light" expand="lg">
        <Navbar.Brand href="/">Welcome {this.state.isAuthenticated &&
          this.state.user.given_name
        }</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/new-application">New Application</Nav.Link>
            <Nav.Link href="/get-entries">View Applications</Nav.Link>
            {this.state.isAuthenticated &&
              <button onClick={this.logout} >Sign Out</button>
            }
            {!this.state.isAuthenticated &&
              <button onClick={this.fedLogin} > Sign In with Google</button>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  render() {
    return (
      this.renderNavBar1()
    )
  }
  renderNavBar() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
        <a class="navbar-brand" href="/">
          <img src={logo} width="100" height="50" alt="" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">

              <Nav.Link href="/new-application">New Application</Nav.Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/get-entries">View Application</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>

          </ul>
          <form class="form-inline my-2 my-lg-0">
            {/* <input class="form-control mr-sm-2" type="text" placeholder="Search"/> */}
            {this.state.isAuthenticated &&

              <button class="btn btn-secondary my-2 my-sm-0" onClick={this.logout} >
                Sign Out</button>
            }
            {!this.state.isAuthenticated &&
              <button class="btn btn-secondary my-2 my-sm-0" onClick={this.fedLogin} > Sign In with Google</button>
            }
            {/* <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button> */}
          </form>
        </div>
      </nav>
    );
  }

  renderNavBar1() {
    console.log(this.state.user)
    return (
      
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">
        
          <img src={logo} width="100" height="50" alt="" />
          </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor03">
          <ul class="navbar-nav mr-auto">
            {/* <li class="nav-item active">
              <a class="nav-link" href="#" >Home <span class="sr-only">(current)</span></a>
            </li> */}
            <li class="nav-item">
              <Nav.Link href="/new-application">New Application</Nav.Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/get-entries">View Application</a>
            </li>
           
          </ul>
          <form class="form-inline my-2 my-lg-0">
            {/* <input class="form-control mr-sm-2" type="text" placeholder="Search" /> */}
            {/* <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
             */}
            {this.state.isAuthenticated &&
            <div>
              <span class="badge-light">{this.state.user.email}  </span>
              <button class="btn btn-secondary btn-sm" onClick={this.logout} >
                Sign Out</button>
                </div>
            }
            {!this.state.isAuthenticated &&
              <button class="btn btn-secondary btn-sm" onClick={this.fedLogin} >Sign In with Google</button>
            }
          </form>
        </div>
      </nav>
    );
  }
}

export default header
