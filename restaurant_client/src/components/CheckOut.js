import React, {Component} from 'react';
import Payment from './Payment';
import {Link} from 'react-router-dom';
import UserForm from './UserForm';
import OrderSummary from './OrderSummary';

class CheckOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderItems: {},
      allProducts: [],
      delivery: '',
      paymentOption: "Cash",
    }
    this._handleClick = this._handleClick.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount() {

    //Gets shopping cart from local storage
    const orderItems = JSON.parse(localStorage.getItem('orderItems'));
    //Gets all products from local storage
    const allProducts = JSON.parse(localStorage.getItem('allProducts'));
    //Gets delivery status from local storage
    const delivery = JSON.parse(localStorage.getItem('delivery'));
    //Gets payment option from local storage
    const paymentOption = JSON.parse(localStorage.getItem('paymentOption'));
    //sets state of all variables
    this.setState({ orderItems, allProducts, delivery, paymentOption });

  }

  _handleClick(event) {
    const value = event.target.value
    //get value of button and set state
    if (value === "Pick-up"){
      this.setState({delivery: false});
    } else if (value === "Delivery" ){
      this.setState({delivery: true});
    }
    //sets delivery state in local storage
    let deliveryStatus = JSON.stringify(this.state.delivery);
    localStorage.setItem('delivery', deliveryStatus);
  }

  _handleChange(event) {
    //sets state of payment type
    this.setState({paymentOption: event.target.value})
    //saves payment type to local storage
    let paymentStatus = JSON.stringify(this.state.paymentOption);
    localStorage.setItem('paymentOption', paymentStatus);
  }

  render() {

    return (
      <div className="main">

        <div className="leftside">

          <div className="kind-order">
            <h3>Please select:</h3>
            <button type='button' onClick={this._handleClick} value="Pick-up">
            Pick-up
            </button>
            <button type='button' onClick={this._handleClick} value="Delivery">
            Delivery
            </button>
          </div>

          <UserForm />

          <form className="payment-form">
            <h3>Payment option:</h3>
            <div className="cash-option">
              <label>
                <input type="radio" value="Cash" checked={this.state.paymentOption === "Cash"} onChange={this._handleChange}/>
                Cash
              </label>
            </div>
            <div className="card-option">
              <label>
                <input type="radio" value="Card" checked={this.state.paymentOption === "Card"} onChange={this._handleChange}/>
                Card
              </label>
            </div>
          </form>

          {this.state.paymentOption === "Card" ? <Payment /> : ""}
          <Link to="/ordercomplete"> <button className="pay">Pay</button></Link>

        </div>


        <div>
          <OrderSummary deliveryStatus={this.state.delivery} />
        </div>

      </div>


    );
  }
}


export default CheckOut;
