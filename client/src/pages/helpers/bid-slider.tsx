import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./cards";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1300, min: 764 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const pastEvents = [
  { image: "/images/nft1.svg", title: "Warrior", author: "sajal", price: "3.25" },
  { image: "/images/nft2.svg", title: "Meata Forted", author: "sajal", price: "4.25" },
  { image: "/images/nft3.svg", title: "Forted", author: "sajal", price: "5.25" },
  { image: "/images/nft4.svg", title: "Forted Eastern", author: "sajal", price: "2.25" },
  { image: "/images/nft5.svg", title: "Eastern", author: "sajal", price: "7.25" },
  { image: "/images/nft6.svg", title: "Eastern", author: "sajal", price: "1.25" },
];

const BidSlider = () => {
  return (
    <Carousel additionalTransfrom={0} arrows={true} autoPlay={true} autoPlaySpeed={5000} centerMode={false} infinite responsive={responsive} itemClass="item">
      {pastEvents.map((item, index) => (
        <div key={index}>
          <Card image={item.image} title={item.title} buttonText="View Event" />
        </div>
      ))}
    </Carousel>
  );
};

export default BidSlider;
