import PropTypes from 'prop-types';
import React from 'react';
import Card from '../card';

const CardList = ({ list, addRatedCard }) => {
  const cardList = list.map((item) => <Card cardInfo={item} addRatedCard={addRatedCard} key={item.id} />);
  return <ul className="main__card-list">{cardList}</ul>;
};

CardList.defaultProps = {
  addRatedCard: () => {},
};
CardList.propTypes = {
  list: PropTypes.array, //eslint-disable-line
  addRatedCard: PropTypes.func,
};

export default CardList;
