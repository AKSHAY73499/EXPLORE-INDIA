import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculationAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import { Booking } from "../components/Booking/Booking";
import { Newsletter } from "../shared/Newsletter";
import { useFetch } from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import { Alert } from "reactstrap";

export const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    data: tour,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/singleView/${id}`);

  const { photo, title, desc, price, address, reviews, state, maxGroupSize } =
    tour;

  const { totalRating, avgRating } = calculationAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      if (!user || user === undefined || user === null) {
        throw new Error("Please sign in");
      }
  
      const reviewObj = {
        photo: user ? `http://localhost:7000/uploads/users/${user.photo}` : null,
        username: user?.username,
        reviewText,
        rating: tourRating,
      };
  
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });
  
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
  
      setSuccessMessage(result.message);
      // Clear error message when submission is successful
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour_content">
                  <img
                    src={`http://localhost:7000/uploads/tour/${photo}`}
                    alt=""
                  />
                  <div className="tour_info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour_rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not Rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>
                    <div className="tour_extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i>
                        {state}
                      </span>
                      <span>
                        <i className="ri-money-rupee-circle-fill"></i>
                        Rs{price}/per person
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  {/* Tour review section */}

                  <div className="tour_reviews mt-4">
                    {(errorMessage || successMessage) && (
                      <Alert color={errorMessage ? "danger" : "success"}>
                        {errorMessage || successMessage}
                      </Alert>
                    )}
                    <h4>Reviews({reviews?.length} reviews)</h4>
                    <Form>
                      <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4<i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i className="ri-star-fill"></i>
                        </span>
                      </div>
                      <div className="review_input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button
                          className="btn primary_btn text-white"
                          onClick={submitHandler}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                    <div className="review_scroll">
                      <ListGroup className="user_reviews">
                        {reviews?.map((review) => (
                          <div className="review_item" key={review._id}>
                            <img src={review.photo} alt={avatar} />
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5 className="username">{review.username}</h5>
                                  <p>
                                    {new Date(
                                      review.createdAt
                                    ).toLocaleDateString("en-US", options)}
                                  </p>
                                </div>
                                <span className="d-flex align-items-center">
                                  {review.rating}
                                  <i className="ri-star-fill"></i>
                                </span>
                              </div>
                              <h6>{review.reviewText}</h6>
                            </div>
                          </div>
                        ))}
                      </ListGroup>
                    </div>
                  </div>
                  {/* tour review section end */}
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};
