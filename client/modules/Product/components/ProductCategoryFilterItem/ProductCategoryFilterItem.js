import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import styles from '../../pages/ProductListPage/ProductListPage.css'

function ProductCategoryItem (props) {
  return (
    <div>
      <button className={styles['category-filter']} onClick={props.onClick} data-category={props.name}>{props.name}</button>
    </div>
  );
}

export default injectIntl(ProductCategoryItem);
