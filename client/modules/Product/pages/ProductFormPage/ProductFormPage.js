import React, {Component} from 'react'

import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

import {addProductRequest}from '../../ProductActions';

import  styles from './ProductFormPage.css'

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = ['white', 'red', 'blue', 'green', 'black'];
const serialize = (obj, prefix) => {
  let str = [];
  for(let p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
      encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};

class ProductFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e)=> {
    this.setState({[e.target.name]: e.target.value});
  };

  onChangeSelect = (e) => {
    let options = e.target.options;
    let values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    this.setState({sizes: values});
  };

  onAddColor = (e) => {
    e.preventDefault();
    let data = JSON.parse(JSON.stringify(this.state.colors || {}));
    let key = 'color_' + (this.state.colorIndex || 1);
    data[key] = colors[0];
    this.setState({colors: data, colorIndex: (this.state.colorIndex || 1) + 1});
  };

  onRemoveColor = (e) => {
    e.preventDefault();
    if (e.currentTarget.dataset.color) {
      let data = JSON.parse(JSON.stringify(this.state.colors || {}));
      delete data[e.currentTarget.dataset.color];
      this.setState({colors: data});
    }
  };

  addProduct = ()=> {
    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[sizes]', this.state.sizes);
    form.append('product[colors]', serialize(this.state.colors));
    for (let i = 0, file; file = this.refs.photos.files[i]; i++) {
      form.append('product[photos]', file, file.name);
    }
    this.props.dispatch(addProductRequest(form))
  };

  onColorSelect = (e) => {
    let data = JSON.parse(JSON.stringify(this.state.colors || {}));
    data[e.target.name] = e.target.value;
    this.setState({colors: data});
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>
          <input placeholder={this.props.intl.messages.productName} value={this.state.name} onChange={this.onChange}
                 className={styles['form-field']} name="name"/>
          <input placeholder={this.props.intl.messages.productCode} value={this.state.code} onChange={this.onChange}
                 className={styles['form-field']} name="code"/>
          <input placeholder={this.props.intl.messages.productPrice} value={this.state.price} onChange={this.onChange}
                 className={styles['form-field']} name="price"
                 type="number"/>
          {Object.keys(this.state.colors || {}).map((color) => {
            return (
              <ProductFormColorControl value={this.state.colors[color]} name={color} onColorSelect={this.onColorSelect.bind(this)}
                                       onRemoveColor={this.onRemoveColor.bind(this)}/>
            )
          })}
          <a className={styles['add-color'] + ' ' + styles['button']} href="#"
             onClick={this.onAddColor}><FormattedMessage
            id="productAddColor"/></a>

          <select multiple="multiple" size="5" className={styles['form-field']} name="sizes"
                  onChange={this.onChangeSelect}>>
            {sizes.map((x) =>
              <option value={x}>{x}</option>
            )}
          </select>
          <textarea placeholder={this.props.intl.messages.productDescription} value={this.state.description}
                    onChange={this.onChange}
                    className={styles['form-field']}
                    name="description"/>
          <div className={styles.photos}>
            <input className={styles['form-field']} ref="photos" multiple="multiple" type="file"
                   onChange={this.onFileLoad}/>
          </div>
          <a className={styles['post-submit'] + ' ' + styles['button']} href="#"
             onClick={this.addProduct}><FormattedMessage id="submit"/></a>
        </div>
      </div>
    )
  }
}

class ProductFormColorControl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  render() {
    return (
      <div>
        <select name={this.props.name} value={this.props.value} onChange={this.props.onColorSelect} className={styles['form-field'] + ' ' + styles['select-color']}>
          {colors.map((y) => { return (
            <option value={y}>{y}</option>
            )}
          )}
        </select>
        <a data-color={this.props.name} className={styles['remove-color'] + ' ' + styles['button']} href="#" onClick={this.props.onRemoveColor}><FormattedMessage id="productRemoveColor"/></a>
      </div>
    );
  }
}

ProductFormPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
