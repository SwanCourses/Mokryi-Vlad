import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import ProductGroupFilterItem from '../../components/ProductGroupFilterItem/ProductGroupFilterItem';


import { Link } from 'react-router';
import styles from './ProductListPage.css';

// Import Selectors
import {getProducts} from '../../ProductReducer';
import {setSearchQuery, setFilterGroup} from '../../ProductActions';

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

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['filter-panel']}>
          <Link to="/products/new">New product</Link>
          <input type="search" value={this.props.searchQuery} placeholder="Type name..."
                 onChange={e=>this.props.dispatch(setSearchQuery(e.target.value))}/>
          <div>
            <button className={styles['group-filter']} onClick={this.onSelectGroupFilter} data-group="">All</button>
          </div>
          {
            this.props.groups.map(group=> (
              <ProductGroupFilterItem key={group} name={group} onClick={this.onSelectGroupFilter.bind(this)}/>
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
    filterGroup: state.products.filterGroup,
    products: getProducts(state, state.products.searchQuery, state.products.filterGroup),
    groups: state.products.groups
  };
}

export default connect(mapStateToProps)(ProductListPage);
