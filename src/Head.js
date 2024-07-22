import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';

function Head() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
          <img src={logo} alt="Logo" style={{ width: '40%', height: 'auto' }} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/draganddrop">Drag&Drop Spiel</Nav.Link>
            <Nav.Link href="/flowchart">Erstelle Flowchart</Nav.Link>
            <Nav.Link href="#temp">Template</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Head;