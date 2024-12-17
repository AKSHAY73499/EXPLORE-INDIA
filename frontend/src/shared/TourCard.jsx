import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculationAvgRating from "../utils/avgRating";

const TourCard = ({ tour }) => {
  const { _id, title, state, photo, price, featured, reviews } = tour;

  const { totalRating, avgRating } = calculationAvgRating(reviews);

  return (
    <div className="tour_card">
      <Card>
        <div className="tour_img">
        <Link to={`/tours/${_id}`}><img src={`http://localhost:7000/uploads/tour/${photo}`} alt="tour-img" /></Link>
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card_top d-flex align-items-center justify-content-between">
            <span className="tour_loaction d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {state}
            </span>
            <span className="tour_rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Not Rated"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>
          <h5 className="tour_title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>
          <h5>
            <div className="card_button d-flex align-items-center justify-content-between mt-3">
              <h5>
                {price}Rs
                <span>/per person</span>
              </h5>
              <button className="btn booking_btn">
                <Link to={`/tours/${_id}`}>Book Now</Link>
              </button>
            </div>
          </h5>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
