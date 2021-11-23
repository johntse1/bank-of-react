import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import './credit.css';
class UserProfile extends Component {
    render() {
      return (
          <div>
            <img src="https://i.imgur.com/XWQ2Gfb.png"/>
            <h1>User Profile</h1>
            <div>Username: {this.props.userName}</div>
            <div>Member Since: {this.props.memberSince}</div>
            <div><Link to="/">Return to Home</Link></div>
            <div><Link to="/debits">Debits</Link></div>
            <div><Link to="/credits">Credits</Link></div>
          </div>
      );
    }
  }
  
  export default UserProfile;