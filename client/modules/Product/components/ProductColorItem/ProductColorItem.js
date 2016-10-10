import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../pages/ProductFormPage/ProductFormPage.css';

function ProductColorItem (props) {
  let photos;
  Array.isArray(props.photos) ? photos = props.photos : photos = [];
    return (
      <div className={styles['colors-container']}>
        <select name={props.name} value={props.value} onChange={props.onColorSelect} className={styles['form-field'] + ' ' + styles['select-color']}>
          {props.colors.map((y) => { return (
              <option key={y} value={y}>{y}</option>
            )}
          )}
        </select>
        <a className={styles['remove-color'] + ' ' + styles['button']} href="#" onClick={props.onRemoveColor}><FormattedMessage id="productRemoveColor"/></a>
        <input className={styles['form-field']} multiple="multiple" type="file" onChange={props.onFileLoad}/>
        {
          photos.map(photo =>(
            <div key={photo.fileName} className={styles.picture}>
              <img src={`/uploads/products/art_${props.code}/${photo.fileName}`}/>
            </div>
          ))
        }
      </div>
    );
}

ProductColorItem.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  onRemoveColor: PropTypes.func.isRequired,
  onColorSelect: PropTypes.func.isRequired,
  onFileLoad: PropTypes.func.isRequired
};

ProductColorItem.defaultProps = {
  photos: [],
  colors: [],
  value: '',
  name: '',
};

export default injectIntl(ProductColorItem);
