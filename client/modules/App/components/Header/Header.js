import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import CartWidget from '../../../Cart/components/CartWidget/CartWidget';
import ProfileWidget from '../../../User/components/ProfileWidget/ProfileWidget';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { isLoggedIn } from '../../../../util/apiCaller';

// Import Style
import styles from './Header.css';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingModal: false, modal: '' }
  }

  handleClick = (modal) => {
    this.setState({ isShowingModal: true, modal: modal });
  };

  handleClose = () => this.setState({ isShowingModal: false });

  render() {
  const languageNodes = this.props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => this.props.switchLanguage(lang)} className={lang === this.props.intl.locale ? styles.selected : ''}>{lang}</li>
  );

  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <div className={styles['language-switcher-container']}>
          <ul>
            <li>
              <span onClick={this.handleClick.bind(this, 'cart')}><FormattedMessage id="cart"/> {this.props.cartProductsCount}</span>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/categories/new">New category</Link>
            </li>
            <li><FormattedMessage id="switchLanguage" /></li>
            {languageNodes}
            { isLoggedIn() &&
              <li>
                <span onClick={this.handleClick.bind(this, 'user')}>Profile</span>
              </li>
            }
          </ul>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </h1>
        {
          this.context.router.isActive('/', true)
            ? <a className={styles['add-post-button']} href="#" onClick={this.props.toggleAddPost}><FormattedMessage id="addPost" /></a>
            : null
        }
      </div>
      {
        this.state.modal === "cart" && this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <CartWidget/>
          </ModalDialog>
        </ModalContainer>
      }
      {
        this.state.modal === "user" && this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <ProfileWidget/>
          </ModalDialog>
        </ModalContainer>
      }
    </div>
  );
}}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
