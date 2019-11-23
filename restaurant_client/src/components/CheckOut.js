import React, {Component} from 'react';
import Payment from './Payment';

class CheckOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderItems: {},
      allProducts: [],
      delivery: false,
      paymentOption: "Cash",
    }
    this._handleCheck = this._handleCheck.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount() {
    const orderItems = JSON.parse(localStorage.getItem('orderItems'));
    const allProducts = JSON.parse(localStorage.getItem('allProducts'));
    this.setState({ orderItems, allProducts });
  }

  _handleCheck() {
    this.setState({delivery: !this.state.delivery});
  }

  _handleChange(event) {
    this.setState({paymentOption: event.target.value})
  }

  render() {
    let total = 0;
    let deliveryCost;
    if (this.state.delivery) {
      total += 5;
      deliveryCost = "Delivery fee $5.00";
    }

    return (
      <div className="checkout">
        <h1>Order Summary</h1>
        <div className="orderKind">
          <h2>Pick-Up</h2>
          <label className="switch">
            <input type="checkbox" onChange={this._handleCheck} defaultChecked={this.state.delivery}/>
            <span className="slider"></span>
          </label>
          <h2>Delivery</h2>
        </div>

        {Object.entries(this.state.orderItems).map( ([id, quantity]) => {
          const item = this.state.allProducts.find( p => p.id.toString() === id);
          total += quantity * item.price;
          return (
            <div key={id}>
              <label>{quantity} X {item.name}<span>${item.price}</span></label>
            </div>
        )})}
        <p>{deliveryCost}</p>
        <p>Total ${total}</p>

        <form>
        <div className="radio">
            <label>
              <input type="radio" value="Cash" checked={this.state.paymentOption === "Cash"} onChange={this._handleChange}/>
              Cash
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="Card" checked={this.state.paymentOption === "Card"} onChange={this._handleChange}/>
              Card
            </label>
          </div>
        </form>
        <Payment />
        <button>Pay</button>
      </div>
    );
  }
}


export default CheckOut;
