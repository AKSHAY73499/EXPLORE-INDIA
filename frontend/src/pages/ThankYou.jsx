import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/thank-you.css";

export const ThankYou = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank_you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You!</h1>
              <h3 className="mb-4">Your tour is booked.</h3>
              {orderId && (
                <p>
                  Your Booking ID: <strong>#{orderId}</strong>
                </p>
              )}
              <Button className="btn primary_btn w-25">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
