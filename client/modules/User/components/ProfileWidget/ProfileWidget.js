import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../UserActions';
import { getUserProfile } from  '../../UserReducer';
import {Link} from 'react-router';

class ProfileWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch(fetchUserProfile());
  }

  render() {
    return (
      <div>
        <div>First Name: <span>{this.props.user.firstName}</span></div>
        <div>Last Name: <span>{this.props.user.lastName}</span></div>
        <div>Email: <span>{this.props.user.email}</span></div>
        <Link to="/profile" >Edit profile</Link>
      </div>
    )
  }
}

ProfileWidget.defaultProps = {
  user: {}
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: getUserProfile(state)
  };
}

export default connect(mapStateToProps)(ProfileWidget);
