import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar: React.FC = () => {
    return (
        <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="/main">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/main">Main</Nav.Link>
                    <Nav.Link href="/statistics">Statistics</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav>
                <Button variant="outline-primary" href='/login'>Login</Button>
                </Container>
        </Navbar>
    )
}
