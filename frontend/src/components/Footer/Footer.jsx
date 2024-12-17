import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo1 from "../../assets/images/logo1.jpeg";

const quick_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick_links2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "register",
  },
];
export default function Footer() {
  const year= new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo1} alt="" />
              <p>
               Enjoy your Trip
              </p>
              <div className="social_links d-flex align-items-center gap-4">
                <span>
                  <Link to="https://www.youtube.com">
                    <i className="ri-youtube-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-instagram-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-facebook-circle-line"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>
          <Col lg="3">
            <h5 className="footer_link-title">Discover</h5>
            <ListGroup className="footer_quick-links">
              {quick_links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer_link-title">Quick Links</h5>
            <ListGroup className="footer_quick-links">
              {quick_links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer_link-title">Contact</h5>
            <ListGroup className="footer_quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-align-items-center gap-3">
                <h6>
                  <span className="mb-0 d-flex align-items-center
                   gap-2">
                    <i className="ri-map-pin-line"></i>
                    Address:
                  </span>
                </h6>
                <p className="mb-0 ">Mangalore,india</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-align-items-center gap-3">
                <h6>
                  <span className="mb-0 d-flex align-items-center
                   gap-2">
                   <i className="ri-mail-line"></i>
                    Email:
                  </span>
                </h6>
                <p className="mb-0 ">exploreindia@gmail.com</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-align-items-center gap-3">
                <h6>
                  <span className="mb-0 d-flex align-items-center
                   gap-2">
                  <i className="ri-phone-fill"></i>
                    Phone:
                  </span>
                </h6>
                <p className="mb-0 ">+91 6361993056</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="12" className="text-center pt-5">
            <p className="copyright">Copyright {year}, design and developed by Akshay Kumar. All right reserved. </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
