import React, {Component} from 'react'

import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

import {addProductRequest, updateProductRequest}from '../../ProductActions';
import {getCategories} from '../../../Category/CategoryReducer';

// Import Components
import ProductColorItem from '../../components/ProductColorItem/ProductColorItem';
import {getProduct} from '../../ProductReducer';
import  styles from './ProductFormPage.css'

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

class ProductFormPage extends Component {
  constructor(props) {
    super(props);
    if (props.product) {
      this.state = props.product;
      let max = 1;
      Object.keys(props.product.colors).forEach(function (color) {
        if (color) {
          color = parseInt(color.split('_')[1]);
          if (color > max) {
            max = color;
          }
        }
      });
      this.state.colorIndex = max + 1;
    } else {
      this.state = {
        colors: {color_1: {value: this.props.colors[0], photos: []}},
        colorIndex: 2,
        description: '',
        inactive: false
      };
    }
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
    let data = this.state.colors;
    let key = 'color_' + this.state.colorIndex;
    data[key] = {value: this.props.colors[0], photos: []};
    this.setState({colors: data, colorIndex: this.state.colorIndex + 1});
  };

  onRemoveColor = (color, e) => {
    e.preventDefault();
    let data = this.state.colors;
    delete data[color];
    this.setState({colors: data});
  };

  onFileLoad = (color, e) => {
    e.preventDefault();
    let data = this.state.colors;
    data[color].photos = e.target.files;
    this.setState({colors: data});
  };

  addProduct = ()=> {
    console.log(this.state);
    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    for (let i = 0, size; size = this.state.sizes[i]; i++) {
      form.append('product[sizes]', size);
    }
    form.append('product[group]', this.state.group);
    //send object colors
    Object.keys(this.state.colors).forEach((key) => {
      form.append('product[colors][' + key + '][value]', this.state.colors[key].value);
      if (!Array.isArray(this.state.colors[key].photos)) {
        //send only new files
        for (let i = 0, file; file = this.state.colors[key].photos[i]; i++) {
          console.log(file, file.name);
          form.append('product[colors][' + key + '][photos]', file, file.name);
        }
      }
    });
    form.append('product[category]', this.state.category);
    form.append('product[inactive]', this.state.inactive);
    this.props.dispatch(!this.props.product ? addProductRequest(form) : updateProductRequest(this.props.product.cuid, form));
  };

  onColorSelect = (e) => {
    let data = JSON.parse(JSON.stringify(this.state.colors || {}));
    data[e.target.name].value = e.target.value;
    this.setState({colors: data});
  };

  isEdit = ()=> {
    return !!this.props.product
  };

  onChangeActive = (e) => {
    this.setState({[e.target.name]: e.target.checked});
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>
          <input placeholder={this.props.intl.messages.productName} value={this.state.name} onChange={this.onChange}
                 className={styles['form-field']} name="name"/>
          <input placeholder={this.props.intl.messages.productCode} value={this.state.code} onChange={this.onChange}
                 className={styles['form-field']} name="code" disabled={this.isEdit()}/>
          <input placeholder={this.props.intl.messages.productPrice} value={this.state.price} onChange={this.onChange}
                 className={styles['form-field']} name="price"
                 type="number"/>

          {Object.keys(this.state.colors || {}).map((color) => {
            return (
              <ProductColorItem key={color} value={this.state.colors[color].value}
                                photos={this.state.colors[color].photos} name={color}
                                onColorSelect={this.onColorSelect.bind(this)}
                                onFileLoad={this.onFileLoad.bind(this, color)} colors={this.props.colors}
                                onRemoveColor={this.onRemoveColor.bind(this, color)}
                                code={this.state.code}
              />
            )
          })}
          <a className={styles['add-color'] + ' ' + styles['button']} href="#"
             onClick={this.onAddColor}><FormattedMessage
            id="productAddColor"/></a>

          <select className={styles['form-field']} name="group" value={this.state.group}
                  onChange={this.onChange}>
            <option selected disabled hidden>Choose group</option>
            {this.props.groups.map((group) => {
              return (
                <option key={group} value={group}>{group}</option>
              )
            })}
          </select>

          <select className={styles['form-field']} name="category" value={this.state.category} onChange={this.onChange}>
            <option selected disabled hidden>Choose category</option>
            {this.props.categories.map((category) => {
              return (
                <option key={category.cuid} value={category.cuid}>{category.name}</option>
              )
            })}
          </select>

          <select multiple="multiple" size="5" className={styles['form-field']} name="sizes"
                  onChange={this.onChangeSelect}>
            {sizes.map((x) =>
              <option key={x} value={x}>{x}</option>
            )}
          </select>
          <textarea placeholder={this.props.intl.messages.productDescription} value={this.state.description}
                    onChange={this.onChange}
                    className={styles['form-field']}
                    name="description"/>
          <div>
            <label>Inactive</label>
            <input name="inactive" type="checkbox" checked={this.state.inactive} onChange={this.onChangeActive}/>
          </div>
          <a className={styles['post-submit'] + ' ' + styles['button']} href="#"
             onClick={this.addProduct}><FormattedMessage id={this.isEdit() ? 'edit' : 'submit'}/></a>
        </div>
      </div>
    )
  }
}

ProductFormPage.defaultProps = {
  groups: [],
  colors: [],
  categories: [],
};

ProductFormPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(store, props) {
  return {
    groups: store.products.groups,
    colors: store.products.colors,
    categories: getCategories(store),
    product: getProduct(store, props.params.cuid),
  };
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
