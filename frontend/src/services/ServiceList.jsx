import React from "react";
import { ServiceCard } from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const serviceData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Weather conditions play a crucial role in tourism as they significantly impact travelers experiences and preferences. The weather can influence the type of activities tourists can engage in, the attractiveness of destinations, and even travel logistics",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Determining the best tour guide can depend on various factors such as the destination, the interests of the travelers, the level of expertise required, language proficiency, personality compatibility, and overall satisfaction of the tourists",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Customization in tourism refers to tailoring travel experiences to meet the specific preferences, interests, and needs of individual travelers or groups. It involves offering personalized services, activities, and accommodations to enhance the overall travel experience and create memorable moments for tourists.",
  },
];
export const ServiceList = () => {
  return (
    <>
      {serviceData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item}></ServiceCard>
        </Col>
      ))}
    </>
  );
};
