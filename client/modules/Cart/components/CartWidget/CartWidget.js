import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getCart, getOrdersAmount } from '../../CartReducer';
import { getCategory } from '../../../Category/CategoryReducer';
import { removeFromCart, addToCart } from '../../CartActions';
import { getProduct } from '../../../Product/ProductReducer'

class CartWidget extends Component {

  addProductToCart = (cuid, color, size) => {
    this.props.dispatch(addToCart(cuid, color, size));
  };

  removeProductFromCart = (cuid, color, size)=> {
    this.props.dispatch(removeFromCart(cuid, color, size));
  };

  render() {
    return (
      <div>
        {
          Object.keys(this.props.cart).map((key) => {
            let keys = key.split('=');
            let product = this.props.products.filter(product => product.cuid === keys[0])[0];
            let color = product.colors[keys[1]].value;
            let size = product.sizes[product.sizes.indexOf(keys[2])];
            return (
              <div>
                {`[${product.code}] ${product.name} (${product.category.name}) [${color}] [${size}] ${product.price}UAH x `}
                <span onClick={this.addProductToCart.bind(null, keys[0], keys[1], keys[2])}>[+]</span>
                {this.props.cart[key].count}
                <span onClick={this.removeProductFromCart.bind(null, keys[0], keys[1], keys[2])}>[-]</span>
              </div>
            )
          })
        }
        <div>Сумма заказа: {this.props.ordersAmount}</div>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  let cart = getCart(state);
  let ordersAmount = getOrdersAmount(state);
  let products = Object.keys(cart).map(key => {
    let product = getProduct(state, key.split('=')[0]);
    return {...product, category: getCategory(state, product.category)};
  });
  return {
    cart,
    products,
    ordersAmount
  };
}

export default connect(mapStateToProps)(CartWidget);
