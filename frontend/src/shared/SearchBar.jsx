import { React,useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";

import { BASE_URL } from "./../utils/config";
import { useNavigate } from "react-router-dom"; 

export const SearchBar = () => {
  const locationRef = useRef('');
  const placeRef = useRef('');
  const maxGroupSizeRef= useRef('0');
  const navigate=useNavigate()
  
  const searchHandler = async () => {
    const location = locationRef.current.value;
    const place = placeRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;
  
    try {
      let url = `${BASE_URL}/tours?state=${location}&title=${place}`;
      if (maxGroupSize !== '' && maxGroupSize !== '0') {
        url += `&maxGroupSize=${maxGroupSize}`;
      }
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Something went wrong');
      const result = await res.json();
      navigate(`/tours/search?state=${location}&title=${place}&maxGroupSize=${maxGroupSize}`, { state: result.data });
    } catch (error) {
      console.error('Error:', error.message);
      alert('Something went wrong');
    }
  };

  return (
    <Col lg="12">
      <div className="search_bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input type="text" placeholder="where  are you going?" ref={locationRef}/>
            </div>
          </FormGroup>{" "}
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
            <i className="ri-road-map-line"></i>
            </span>
            <div>
              <h6>Place</h6>
              <input type="text" placeholder="Place" ref={placeRef}/>
            </div>
          </FormGroup>{" "}
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max pepole</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          <span className="search_icon" type='submit' onClick={searchHandler}>
          <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};
