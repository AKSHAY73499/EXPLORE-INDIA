import React, { useState, useEffect } from "react";
import { CommonSection } from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import { Newsletter } from "./../shared/Newsletter";
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"; // Import Dropdown from reactstrap
import { SearchBar } from "../shared/SearchBar";
import { useFetch } from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

export default function Tours() {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState); // Function to toggle dropdown

  const {
    data: tours,
    loading: toursLoading,
    error: toursError,
  } = useFetch(`${BASE_URL}/tours/get?page=${currentPage}`);

  const {
    data: tourCount,
    loading: tourCountLoading,
    error: tourCountError,
  } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  const {
    data: featuredTours,
    loading: featuredToursLoading,
    error: featuredToursError,
  } = useFetch(`${BASE_URL}/tours/search/Featured2`);

  useEffect(() => {
    if (tourCount) {
      const pages = Math.ceil(tourCount / 12);
      setPageCount(pages);
      window.scrollTo(0, 0);
    }
  }, [currentPage, tourCount, tours]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setCurrentPage(0);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount - 1));
  };

  return (
    <>
      <CommonSection
        title={filter === "All" ? "All Tours" : "Featured Tours"}
      />
      <section>
        <Container>
          <Row className="mb-3">
            <Col>
              <SearchBar />
            </Col>
            <Col className="text-end">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle color="primary" caret>
                  Filter
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleFilterChange("All")}>
                    All Tours
                  </DropdownItem>
                  <DropdownItem onClick={() => handleFilterChange("Featured")}>
                    Featured Tours
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {!toursLoading &&
            !tourCountLoading &&
            !featuredToursLoading &&
            !toursError &&
            !tourCountError &&
            !featuredToursError && (
              <Row>
                {filter === "All"
                  ? tours?.map((tour) => (
                      <Col lg="3" className="mb-4" key={tour._id}>
                        <TourCard tour={tour} />
                      </Col>
                    ))
                  : featuredTours?.map((tour) => (
                      <Col lg="3" className="mb-4" key={tour._id}>
                        <TourCard tour={tour} />
                      </Col>
                    ))}
                <Col lg="12">
                  <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                    {!toursLoading &&
                      !tourCountLoading &&
                      !featuredToursLoading &&
                      filter === "All" &&
                      Array.from({ length: Math.min(pageCount, currentPage + 2) }).map((_, index) => (
                        <span
                          key={index}
                          onClick={() => setCurrentPage(index)}
                          className={currentPage === index ? "active_page" : ""}
                        >
                          {index + 1}
                        </span>
                      ))}
                  </div>
                </Col>
              </Row>
            )}
          {(toursLoading || tourCountLoading || featuredToursLoading) && (
            <h4 className="text-center pt-5">Loading......</h4>
          )}
          {(toursError || tourCountError || featuredToursError) && (
            <h4 className="text-center pt-5">Failed to fetch data.</h4>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
}
