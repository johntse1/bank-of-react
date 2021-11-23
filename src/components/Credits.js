import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import './credit.css';
class Credit extends Component{
    constructor(){
        super()
        var t = new Date()
        var itemdate = (t.getMonth()+1) + '-' + t.getDay() + '-' + t.getFullYear();
        this.state = {credit:{amount: '',description: '',date:itemdate,},redirect: false
        }

    }
    addCredits = (e) => {
        this.props.addCredit(this.state.credit)
        this.show();
        this.props.cinfo.push(this.state.credit)
        e.preventDefault()
      }
      
      //Change events
      changesEvent = (e) => {
        const updatedUser = {...this.state.credit}
        const inputField = e.target.name
        const inputValue = e.target.value
  
        updatedUser[inputField] = inputValue
        this.setState({credit: updatedUser})
      }
      show = () =>{
        var displayItem = ''
        for(var i = 0; i < this.props.cinfo.length;i++)
        {
         displayItem += "DATE PURCHASED: " + this.props.cinfo[i].date+ " " + this.props.cinfo[i].description + ":" + this.props.cinfo[i].amount + '\n'
        }
        return displayItem = displayItem.split(<br/>)
      }
      render () {
        return (
        <div>
            <img src="https://i.imgur.com/XWQ2Gfb.png"/>
            <h1>Credit</h1>
            <div id="creditdiv">
                {this.show()}
            </div>
            <AccountBalance accountBalance={this.props.accountBalance}/>
            <form onSubmit={this.addCredits}>
              <div>
                <label htmlFor="Reason">Reason</label>
                <input type="text" name="description" onChange={this.changesEvent} value={this.state.credit.description}/>
              </div>
              <div>
                <label htmlFor="Amount">Amount</label>
                <input type="number" name="amount" onChange={this.changesEvent} value={this.state.credit.amount} />
              </div>
              <button>Add Credit</button>
            </form>
            <div><Link to="./">Home</Link></div>
            <div><Link to="/userprofile">User Profile</Link></div>
            <div><Link to="/debits">Debits</Link></div>
          </div>                
        )
      }
    }

export default Credit;