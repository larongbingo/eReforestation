import React, { FunctionComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const AboutUs: FunctionComponent = () => (
  <Container>
    <div>
      Our environment will always be with us from the next generation, and to the next, and so on.
      As such, everyone has an obligation to maintain and improve our environment.

      <Row>
        <Col>
          <h2>Our mission is to get everyone to help maintain the efforts on environment maintanance and protection by using tech.</h2>
        </Col>
        <Col>
          <h2>And our mission is to see the future that both man and machine helping our world maintain its cleanliness if not improve.</h2>
        </Col>
      </Row>
    </div>

    <div>
      <h2>DENR PENRO Cavite</h2>
      They are the assigned branch that monitors the forestry and agricultural activities in Cavite. From cutting trees to needing license to own a plot of land.
    </div>

    <div>
      About the Developers
      <div>
        This website represents as their partial fulfillment to the requirements given to all students
        of Bachelor of Science in Information Technology in Cavite State University - Imus Campus.
        They were given a policy that their project or thesis must follow a theme based on the document
        released by the Department of Science and Technology.
      </div>
      <Row>
        <Col>
          <h3>Renz Christen Yeomer A. Pagulayan</h3>
          <p>
            Mr. Pagulayan is the developer of both the website and drone.
            However, when in time of need, he will also handle a little of the paperworks.
            Mr. Pagulayan is passionate of technology and spends all his free time to study new and relevant software tech and designs.
          </p>
        </Col>
        <Col>
          <h3>Michael C. Casals</h3>
          <p>
            Mr. Casals manages documentation required by both the school and our client. 
            From time to time, he will handle development work as Mr. Pagulayan cannot balance his development and studies.
            Mr. Casals also helped in the design of the logo and the design of the storage of data.
          </p>
        </Col>
      </Row>
    </div>
  </Container>
);
