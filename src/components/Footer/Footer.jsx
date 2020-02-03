/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  Follow : 
                </li>
                <li>
                  <a href="https://twitter.com/kishan_bharda" target="_blank">
                    <i class="fab fa-twitter" /> {" "}
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/kishan_bharda" target="_blank">
                    <i class="fab fa-instagram" /> {" "}
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://m.facebook.com/profile.php?id=100014592067395"
                    target="_blank"
                  >
                    <i class="fab fa-facebook" /> {" "}
                    Facebook
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <div className="copyright">
                &copy; {1900 + new Date().getYear()}, made with{" "}
                <i className="fa fa-heart heart" /> by Kishan Bharda
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
