import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styles from './ProductDetailPage.css';

import { addToCart } from '../../../Cart/CartActions'
import { isAdmin } from '../../../../util/apiCaller';
import { Link } from 'react-router';
// Import Selectors
import { getProduct } from '../../ProductReducer';

export class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {photos: []}
  }

  salesPrice = ()=>{
    return this.props.product.price * 0.95
  };

  addProductToCart = () => {
    this.props.dispatch(addToCart(this.props.product.cuid, this.state.color, this.state.size));
  };

  onChange = (e) => {
    this.setState({photos: this.props.product.colors[e.target.value].photos, color: e.target.value});
  };

  onChangeSize = (e) => {
    this.setState({size: e.target.value});
  };

  render() {
    return (
      <div className={styles.container}>
        <Helmet title={this.props.product.name}/>
        <div className={styles['filter-panel']}></div>
        <div className={styles['product']}>
          <div className={styles.photos}>
            {
            this.props.product && this.state.photos && this.state.photos.map((photo) => {
              return (<div key={photo.fileName} className={styles.picture}><img src={`/uploads/products/art_${this.props.product.code}/${photo.fileName}`}/></div>);
            })
          }
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{this.props.product.name}</div>
            <div className={styles.code}>{this.props.product.code}</div>
            <div className={styles.price}>{this.props.product.price + ' грн'}</div>
            <div className={styles.price}>{this.salesPrice() + ' грн'}</div>
            <div className={styles.description}>{this.props.product.description}</div>
            <select onChange={this.onChange} name="currentColor" value={this.state.color}>
              <option selected disabled hidden>Choose color</option>
            {Object.keys(this.props.product.colors).map((key) => {
                return (
                  <option key={key} value={key}>{this.props.product.colors[key].value}</option>
                );
              })}
            </select>
            <select onChange={this.onChangeSize} name="currentSize" value={this.state.size}>
              <option selected disabled hidden>Choose size</option>
              {this.props.product.sizes.map((key) => {
                return (
                  <option key={key} value={key}>{key}</option>
                );
              })}
            </select>
            <div onClick={this.state.color && this.state.size && this.addProductToCart}>
              <FormattedMessage id="order"/>
            </div>
            { isAdmin() && <Link to={`/products/${this.props.product.cuid}/edit`}><FormattedMessage id="edit"/></Link>}
          </div>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    product: getProduct(state, props.params.cuid),
  };
}

export default connect(mapStateToProps)(ProductDetailPage);
