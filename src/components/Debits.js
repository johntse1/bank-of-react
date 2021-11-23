import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import './debit.css';
class Debit extends Component{
    constructor(){
        super()
        var t = new Date()
        //Added +1 to month because the month was one month behind
        var itemdate = (t.getMonth()+1) + '-' + t.getDay() + '-' + t.getFullYear();
        this.state = {debit:{amount: '',description: '',date:itemdate,},redirect: false
        }
        //Tracks the date of when the items were purchased

    }
    
    //Adds debit event, e is the event
    addDebits = (e) => {
      this.props.addDebit(this.state.debit)
      this.show();
      this.props.info.push(this.state.debit)
      e.preventDefault()
    }
    
    show = () =>{
      //Loads the string of items + their price and description into the var displayitem
      var displayItem = ""
      for(var i = 0; i < this.props.info.length;i++)
      {
        //new line not working
       displayItem += "DATE PURCHASED "+ this.props.info[i].date + " " + this.props.info[i].description + ": " + this.props.info[i].amount + "\r\n"
      }
      return displayItem
    }
    //Change events
    changesEvent = (e) => {
      const updatedUser = {...this.state.debit}
      const inputField = e.target.name
      const inputValue = e.target.value

      updatedUser[inputField] = inputValue
      this.setState({debit: updatedUser})
    }

    render () {
        return (
        <div>
            <img src="https://i.imgur.com/XWQ2Gfb.png"/>
            <h1>DEBIT</h1>
            <div id="debitdiv">
              {this.show()}
            </div>
            <h2></h2>
            <AccountBalance accountBalance={this.props.accountBalance}/>
            <form onSubmit={this.addDebits}>
              <div>
                <label htmlFor="Reason">description</label>
                <input type="text" name="description" onChange={this.changesEvent} value={this.state.debit.description}/>
              </div>
              <div>
                <label htmlFor="Amount">Amount</label>
                <input type="number" name="amount" onChange={this.changesEvent} value={this.state.debit.amount} />
              </div>
              <button>Add Debit</button>
            </form>
            <div><Link to="./">Home</Link></div>
            <div><Link to="/userprofile">User Profile</Link></div>
            <div><Link to="/credits">Credits</Link></div>
          </div>                
        )
      }
}

export default Debit;

