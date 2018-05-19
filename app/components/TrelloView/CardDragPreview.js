import React from 'react';
import PropTypes from 'prop-types'
import Card from './Cards/Card';

const propTypes = {
  card: PropTypes.object
};

const CardDragPreview = (props) => {
  const styles = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)'
  };
  styles.width = `${props.card.clientWidth || 243}px`;
  styles.height = `${props.card.clientHeight || 120}px`;

  return (
    <div style={styles}>
      <Card item={props.card.item} />
    </div>
  );
};

CardDragPreview.propTypes = propTypes;

export default CardDragPreview;
