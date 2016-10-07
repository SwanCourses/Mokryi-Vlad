import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import ProductGroupFilterItem from '../../components/ProductGroupFilterItem/ProductGroupFilterItem';


import {Link} from 'react-router';
import styles from './ProductListPage.css';

// Import Selectors
import {getProducts} from '../../ProductReducer';
import { getCategoriesByProducts } from '../../../Category/CategoryReducer';
import {setSearchQuery, setFilterGroup, setFilterCategory, resetFilters} from '../../ProductActions';

import CategoriesBar from '../../../../components/CategoriesBar/CategoriesBar';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {searchQuery: ''}
  }

  componentDidMount() {
    this.setState({products: this.props.products});
  }

  onSelectGroupFilter = (e)=> {
    this.props.dispatch(setFilterGroup(e.currentTarget.dataset.group));
  };

  onSelectCategoryFilter = (cuid) => {
    this.props.dispatch(setFilterCategory(cuid));
  };

  resetAllFilters = () => {
    this.props.dispatch(resetFilters());
  };

  render() {
    return (
      <div>
        <div className={styles['groups-bar']}>
          <button className={styles['group-filter']} onClick={this.onSelectGroupFilter} data-group="">All</button>
          {
            this.props.groups.map(group=> (
              <ProductGroupFilterItem key={group} name={group} onClick={this.onSelectGroupFilter.bind(this)}/>
            ))
          }
        </div>
        <div className={styles.container}>
          <div className={styles['filter-panel']}>
            <Link className={styles['new-product']} to="/products/new">New product</Link>
            <a className={styles['new-product']} href="#" onClick={this.resetAllFilters}>Clear All Filters</a>
            <input type="search" value={this.props.searchQuery} placeholder="Type name..."
                   onChange={e=>this.props.dispatch(setSearchQuery(e.target.value))}/>
            <CategoriesBar {...this.props} onSelect={cuid=>this.onSelectCategoryFilter(cuid)}/>
          </div>

          <div className={styles.products}>
            {
              this.props.products.map(product=> (
                <div key={product.cuid} className={styles.product}>
                  <ProductListItem key={product.cuid} {...product}/>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  let products = getProducts(state, state.products.searchQuery, state.products.filterGroup, state.products.filterCategory);
  return {
    categories: getCategoriesByProducts(state, products),
    searchQuery: state.products.searchQuery,
    filterGroup: state.products.filterGroup,
    filterCategory: state.products.filterCategory,
    products: products,
    groups: state.products.groups
  };
}

export default connect(mapStateToProps)(ProductListPage);
