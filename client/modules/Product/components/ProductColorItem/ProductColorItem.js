import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../pages/ProductFormPage/ProductFormPage.css';

function ProductColorItem (props) {
    return (
      <div>
        <select name={props.name} value={props.value} onChange={props.onColorSelect} className={styles['form-field'] + ' ' + styles['select-color']}>
          {props.colors.map((y) => { return (
              <option key={y} value={y}>{y}</option>
            )}
          )}
        </select>
        <a data-color={props.name} className={styles['remove-color'] + ' ' + styles['button']} href="#" onClick={props.onRemoveColor}><FormattedMessage id="productRemoveColor"/></a>
      </div>
    );
}

ProductColorItem.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  onRemoveColor: PropTypes.func.isRequired,
  onColorSelect: PropTypes.func.isRequired,
};

export default injectIntl(ProductColorItem);
