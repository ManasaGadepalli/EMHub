import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import './styles.css';

export default function NavBar() {
    return (
        <Navbar className="navbar-background" variant="dark">
            <Container>
                <Navbar.Brand href="/">Event Management Finder</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav id="">
                        <Nav.Link id="rightside" href="/login" >Login</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}