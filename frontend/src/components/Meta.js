import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to AdamJee Mart | Home",
  description: "We sell the best products for cheap prices",
  keywords: "KitchenWare, Textiles, Electronics, Toys",
};

export default Meta;
