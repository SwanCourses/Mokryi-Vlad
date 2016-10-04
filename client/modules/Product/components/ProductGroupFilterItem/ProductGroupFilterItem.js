import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import styles from '../../pages/ProductListPage/ProductListPage.css'

function ProductGroupItem (props) {
  return (
      <button className={styles['group-filter']} onClick={props.onClick} data-group={props.name}>{props.name}</button>
  );
}

export default injectIntl(ProductGroupItem);
