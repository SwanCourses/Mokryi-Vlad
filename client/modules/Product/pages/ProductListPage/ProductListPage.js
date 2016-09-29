import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import ProductCategoryFilterItem from '../../components/ProductCategoryFilterItem/ProductCategoryFilterItem';

import styles from './ProductListPage.css';

// Import Selectors
import {getProducts} from '../../ProductReducer';
import {setSearchQuery, setFilterCategory} from '../../ProductActions';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {searchQuery: ''}
  }

  componentDidMount() {
    this.setState({products: this.props.products});
  }

  onSelectCategoryFilter = (e)=> {
    this.props.dispatch(setFilterCategory(e.currentTarget.dataset.category));
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['filter-panel']}>
          <input type="search" value={this.props.searchQuery} placeholder="Type name..."
                 onChange={e=>this.props.dispatch(setSearchQuery(e.target.value))}/>
          <div>
            <button className={styles['category-filter']} onClick={this.onSelectCategoryFilter} data-category="">All</button>
          </div>
          {
            this.props.categories.map(category=> (
              <ProductCategoryFilterItem key={category} name={category} onClick={this.onSelectCategoryFilter.bind(this)}/>
            ))
          }
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
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    searchQuery: state.products.searchQuery,
    filterCategory: state.products.filterCategory,
    products: getProducts(state, state.products.searchQuery, state.products.filterCategory),
    categories: state.products.categories
  };
}

export default connect(mapStateToProps)(ProductListPage);
