import React, { useState } from 'react';
import 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { SearchOutlined, ShoppingOutlined, BookOutlined, ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";
import '../index.css';
import { Tab, Tabs } from 'react-bootstrap';
import HomePage from './HomePage';
import Slider from './Slider';
import SignInPage from './Sign-InPage';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ContactUs from './ContactUs';
import SearchResults from './SearchResults';

const NavigationalBar = () => {
    const [search, setSearch] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedSearch(search);
        navigate('/search', { state: { searchText: search } });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Navbar
            expand="lg"
            className="bg-body-tertiary p-3 Nav-Bar"
            fixed="top"
            style={{ 
                height: "80px",
                zIndex: 1000,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
        >
            <Container fluid>
                <div className="d-flex align-items-center w-100">
                    <Navbar.Brand as={Link} to="/" onClick={scrollToTop} className="me-3">
                        <ShoppingOutlined />
                        Shopify
                    </Navbar.Brand>

                    <Form className="d-flex flex-grow-1 me-3" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            style={{ borderRadius: "40px", flex: 1, marginLeft: '45px' }}
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <Button variant="outline-success" type='submit' style={{ borderRadius: "100%" }}>
                            <SearchOutlined />
                        </Button>
                    </Form>

                    <Navbar.Toggle aria-controls="navbarScroll" style={{ marginLeft: '120px' }} />
                </div>

                <Navbar.Collapse id="navbarScroll" className="justify-content-between">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <NavDropdown title="Departments" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Men</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Womens</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Furniture</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <div className="Right-Buttons d-flex align-items-center">
                        <Nav.Link as={Link} to="/fav" className="Fav-Button ms-3">
                            <BookOutlined />
                            Fav
                        </Nav.Link>
                        <Nav.Link as={Link} to="/SignInPage" className="Sign-In-Button ms-3">
                            <StarOutlined />
                            Sign In
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart" className="Cart-Button ms-3">
                            <ShoppingCartOutlined />
                            Cart
                        </Nav.Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationalBar;