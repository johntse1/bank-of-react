import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import './credit.css';
    
class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://i.imgur.com/XWQ2Gfb.png"/>
          <h1>Bank of React</h1>

          <div><Link to="/userProfile">User Profile</Link></div>
          <div><Link to="/Debits">Debits</Link></div>
          <div><Link to="/Credits">Credits</Link></div>
          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;
