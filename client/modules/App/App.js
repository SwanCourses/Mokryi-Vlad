import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';

// Import Actions
import { toggleAddPost } from './AppActions';
import { fetchCategories } from '../Category/CategoryActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';
import { restoreCartFromCache } from '../Cart/CartActions';
import { getProductsCount } from '../Cart/CartReducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.props.dispatch(restoreCartFromCache());
    this.props.dispatch(fetchCategories());
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };
  //devtool
  //{this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
  render() {
    return (
      <div>

        <div>
          <Helmet
            title="Vlad Mokryi - MERN Starter"
            titleTemplate="Vlad Mokryi - %s"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <div className={styles.wrapper}>
            <Header
              switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
              intl={this.props.intl}
              toggleAddPost={this.toggleAddPostSection}
              cartProductsCount={this.props.cartProductsCount}
            />
            <div className={styles.container}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.need = [() => {
  return fetchCategories();
}];

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  let cartProductsCount = getProductsCount(store);
  return {
    intl: store.intl,
    cartProductsCount
  };
}

export default connect(mapStateToProps)(App);
