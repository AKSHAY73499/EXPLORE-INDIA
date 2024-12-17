import React, { useRef, useEffect, useContext, useState } from "react";
import {
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import avatar from "../../assets/images/avatar.jpg";
import logo from "../../assets/images/logo1.jpeg";
import "./header.css";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import EditProfile from "../EditProfile/EditProfile"; 

const nav_links = [
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

export default function Header() {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [notificationsChecked, setNotificationsChecked] = useState(false);

  const handleEditProfile = () => {
    setEditModalOpen(true);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeadingFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeadingFunc();
    return () => window.removeEventListener("scroll", stickyHeadingFunc);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        // Fetch booking details for the current user
        const response = await axios.get(
          `http://localhost:7000/api/booking/${user._id}`,
          config
        );
        const responseData = response.data.data;
        if (Array.isArray(responseData)) {
          setNotificationMessage(responseData);
        } else {
          setNotificationMessage([responseData]);
        }
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchNotifications(); // Fetch notifications when the component mounts

    // Fetch notifications every 5 minutes (adjust the interval as needed)
    const intervalId = setInterval(fetchNotifications, 5 * 60 * 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active_link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_right d-flex align-items-center gap-4 ">
              <div
                className="notification_bell"
                onClick={toggleModal}
              >
                <i className="ri-notification-2-line"></i>
                {notificationMessage.length > 0 && !notificationsChecked && (
                  <div className="notification_count">
                    <span className="count">
                      {notificationMessage.length}
                    </span>
                  </div>
                )}
              </div>

              <div className="nav_btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <div className="profile" onClick={handleEditProfile}>
                      <img
                        src={`http://localhost:7000/uploads/users/${user.photo}`}
                        alt=""
                        style={{
                          height: "45px",
                          width: "50px",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <EditProfile
                      isOpen={editModalOpen}
                      toggle={() => setEditModalOpen(!editModalOpen)}
                      user={user}
                    />
                    <h5 className="mb-0" style={{ marginRight: "15px" }}>
                      {user.username}
                    </h5>
                    <Button className="btn error_btn" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary_btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary_btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span>
                <span className="mobile_menu">
                  <i className="ri-menu-line"></i>
                </span>
              </span>
            </div>
          </div>
        </Row>
      </Container>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Notification</ModalHeader>
        <ModalBody>
          {notificationMessage.map((item, index) => (
            <div key={index}>
              <h6>Order ID: {item.orderId}</h6>
              <p>Message: {item.message}</p>
            </div>
          ))}
        </ModalBody>
      </Modal>
    </header>
  );
}
