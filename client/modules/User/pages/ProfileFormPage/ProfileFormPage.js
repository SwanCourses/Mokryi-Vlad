import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import {updateProfile} from '../../UserActions';
import { getUserProfile } from  '../../UserReducer';

// Import Style
import styles from './ProfileFormPage.css';

export class ProfileFormPage extends Component {
  constructor(props) {
    super(props);
    if (props.user) {
      this.state = props.user;
    } else {
      this.state = {}
    }
  }

  onChange = (e)=> {
    this.setState({[e.target.name]: e.target.value});
  };

  update = () => {
    this.props.dispatch(updateProfile({firstName: this.state.firstName, lastName: this.state.lastName}));
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Profile</h2>
          <input placeholder={this.props.intl.messages.userLogin} value={this.state.email}
                 className={styles['form-field']} name="email" disabled="disabled"/>
          <input placeholder="First Name" value={this.state.firstName} onChange={this.onChange}
                 className={styles['form-field']} name="firstName"/>
          <input placeholder="Last Name" value={this.state.lastName} onChange={this.onChange}
                 className={styles['form-field']} name="lastName"/>
          <a className={styles['post-submit-button']} href="#" onClick={this.update}>Update</a>
        </div>
      </div>
    );
  }
}

ProfileFormPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {
    user: getUserProfile(state)
  };
}

export default connect(mapStateToProps)(injectIntl(ProfileFormPage));
