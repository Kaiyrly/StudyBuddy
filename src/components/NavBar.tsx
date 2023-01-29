import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const NavBar: React.FC<{token: string | undefined, setToken: (userToken: {token: string | undefined}) => void}> = ({token, setToken}) => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Main</Nav.Link>
                    <Nav.Link href="/statistics">Statistics</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav>
                {token ? <Link to='#' onClick={() => setToken({token: undefined})}>Log Out</Link> : <Button variant="outline-primary" href='/login'>Login</Button>}
            </Container>
        </Navbar>
    )
}
