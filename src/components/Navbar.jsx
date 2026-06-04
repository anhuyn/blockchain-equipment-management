import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar({ account, connectWallet, isConnected }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          <i className="bi bi-box-seam me-2"></i>
          Equipment DApp
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={isActive('/') ? 'active' : ''}>
              <i className="bi bi-speedometer2 me-1"></i>
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/equipment" className={isActive('/equipment') ? 'active' : ''}>
              <i className="bi bi-list-check me-1"></i>
              Thiết bị
            </Nav.Link>
            <Nav.Link as={Link} to="/history" className={isActive('/history') ? 'active' : ''}>
              <i className="bi bi-clock-history me-1"></i>
              Lịch sử
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={isActive('/about') ? 'active' : ''}>
              <i className="bi bi-info-circle me-1"></i>
              Giới thiệu
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            {isConnected ? (
              <div className="text-light">
                <i className="bi bi-wallet2 me-1"></i>
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
            ) : (
              <Button variant="outline-light" onClick={connectWallet} size="sm">
                <i className="bi bi-plug me-1"></i>
                Kết nối MetaMask
              </Button>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
