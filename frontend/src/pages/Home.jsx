import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import exprienceImg from '../assets/images/experience.png'
import { Subtitle } from "../shared/Subtitle";
import { SearchBar } from "../shared/SearchBar";
import { ServiceList } from "../services/ServiceList";
import { FeaturedTourList } from "../components/Featured-tours/FeaturedTourList";
import { MasonryImagesGallery } from "../components/Image-gallery/MasonryImagesGallery";
import { Testimonial } from "../components/Testimonial/Testimonial";
import { Newsletter } from "../shared/Newsletter";
export default function Home() {
  return (
    <>
      {/* Hero Section start */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling opens the door to creating{" "}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Traveling is not merely about exploring new destinations; it's
                  about immersing oneself in a tapestry of experiences that
                  weave into unforgettable memories. Each journey unveils a
                  canvas of sights, sounds, and sensations, etching moments into
                  the corridors of our minds. From the breathtaking vistas atop
                  misty mountains to the bustling streets teeming with life,
                  every encounter becomes a stroke in the masterpiece of our
                  lives.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box mt-4">
                <video src={heroVideo} alt="" controls autoPlay/>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services_subtitle">What we serve</h5>
              <h2 className="services_title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* tour section */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured_tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* featured tour section end */}
      {/* experience section start */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience_content">
                <Subtitle subtitle={"Experience"} />

                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Reprehenderit, quos ratione. <br /> Et accusamus nam inventore
                  blanditiis praesentium hic fuga culpa distinctio ad ea
                  voluptates dignissimos, maxime soluta eos voluptatem animi!
                </p>
              </div>
              <div className="counter_wrapper d-flex align-items-center gap-5">
              <div className="counter_box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                </div><div className="counter_box">
                  <span>2k+</span>
                  <h6>Reguler clients</h6>
                </div><div className="counter_box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="exprience_img">
                <img src={exprienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* experience section end   */}
      {/* gallery section start    */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'}/>
              <h2 className="gallery_title">Visit our customers tour gallery</h2>
            </Col>
            <Col lg='12'>
              <MasonryImagesGallery/>
            </Col>
          </Row>
        </Container>
      </section>
      {/* gallery section end */}
      {/*  testimonial section start */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Fans Love'}/>
                <h2 className="testimonial_title">
                  What our fans say anout us
                </h2>
            </Col>
            <Col lg="12">
              <Testimonial/>
            </Col>
          </Row>
        </Container>
      </section>
      {/* testimonial section end */}
      <Newsletter/>
    </>
  );
}
