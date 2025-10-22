import PropTypes from "prop-types";
import React, { Fragment } from "react";

const ProductRating = ({ ratingValue = 0 }) => {
  const rating = [];

  // 5 ta yulduz tayyorlab chiqamiz
  for (let i = 0; i < 5; i++) {
    if (i < ratingValue) {
      // agar ratingValue dan kichik bo'lsa — sariq yulduz
      rating.push(<i className="fa fa-star yellow" key={i}></i>);
    } else {
      // aks holda oddiy (kulrang) yulduz
      rating.push(<i className="fa fa-star-o" key={i}></i>);
    }
  }

  return <Fragment>{rating}</Fragment>;
};

ProductRating.propTypes = {
  ratingValue: PropTypes.number,
};

export default ProductRating;
