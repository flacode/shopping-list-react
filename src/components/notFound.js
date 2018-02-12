import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <Container className="list-page">
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
      <Link to="/shoppinglists">Back to home</Link>
    </Container>
  </div>
);

export default NotFound;
