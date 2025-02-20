import { Card, Carousel } from "react-bootstrap";
import wallpaper1 from "../../../assets/wallpaper-1.jpg";
import wallpaper2 from "../../../assets/wallpaper-2.jpeg";
import wallpaper3 from "../../../assets/wallpaper-3.jpg";

const CarouselSection = () => {
  return (
    <section>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={wallpaper1}
            alt="First slide"
            style={{ height: "500px" }}
          />
          <Carousel.Caption>
            <h3>Health is Wealth</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={wallpaper2}
            alt="Second slide"
            style={{ height: "500px" }}
          />

          <Carousel.Caption>
            <h3>Eating Healthy Cures</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={wallpaper3}
            alt="Third slide"
            style={{ height: "500px" }}
          />
          <Carousel.Caption>
            <h3>We are here to Care</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default CarouselSection;
