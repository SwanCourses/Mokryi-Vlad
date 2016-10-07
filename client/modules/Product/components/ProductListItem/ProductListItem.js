import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './ProductListItem.css';

function ProductListItem(props) {
  let getPhoto = () => {
    var fileName = '';
    Object.keys(props.colors).forEach((key) => {
        if (props.colors[key].photos && props.colors[key].photos.length && props.colors[key].photos[0].fileName) {
          fileName = props.colors[key].photos[0].fileName;
        }
    });
    return fileName;
  };
  return (
    <div className={styles.container}>
      <Link to={`/products/${props.cuid}`}>
        <div className={styles.picture}><img src={`/uploads/products/art_${props.code}/${getPhoto()}`}/></div>
        <div className={styles.info}>{props.name} | {props.price}грн</div>
      </Link>
    </div>
  );
}

ProductListItem.propTypes = {};

ProductListItem.defaultProps = {
  colors:{}
};

export default ProductListItem;
