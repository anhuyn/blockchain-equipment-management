import React from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function About() {
  const technologies = [
    { name: 'Solidity', icon: 'bi-file-code', color: 'primary' },
    { name: 'Remix IDE', icon: 'bi-terminal', color: 'secondary' },
    { name: 'Ethereum', icon: 'bi-currency-ethereum', color: 'info' },
    { name: 'MetaMask', icon: 'bi-wallet2', color: 'warning' },
    { name: 'React', icon: 'bi-react', color: 'primary' },
    { name: 'Vite', icon: 'bi-lightning', color: 'success' },
    { name: 'Bootstrap 5', icon: 'bi-bootstrap', color: 'purple' },
    { name: 'Ethers.js', icon: 'bi-link-45deg', color: 'dark' },
  ];

  const benefits = [
    {
      icon: 'bi-shield-check',
      title: 'Minh bạch',
      description: 'Mọi giao dịch đều được ghi lại trên blockchain, đảm bảo tính minh bạch và không thể thay đổi.',
    },
    {
      icon: 'bi-lock',
      title: 'An toàn',
      description: 'Dữ liệu được bảo vệ bởi mã hóa và phân quyền, không thể bị can thiệp bởi bên thứ ba.',
    },
    {
      icon: 'bi-clock-history',
      title: 'Theo dõi thời gian thực',
      description: 'Theo dõi trạng thái thiết bị và lịch sử mượn trả theo thời gian thực.',
    },
    {
      icon: 'bi-diagram-3',
      title: 'Phi tập trung',
      description: 'Hệ thống hoạt động phi tập trung, không phụ thuộc vào một máy chủ duy nhất.',
    },
    {
      icon: 'bi-check-circle',
      title: 'Tự động hóa',
      description: 'Quy trình mượn trả được tự động hóa thông qua Smart Contract.',
    },
    {
      icon: 'bi-graph-up',
      title: 'Hiệu quả',
      description: 'Tăng cường hiệu quả quản lý thiết bị và giảm thiểu sai sót thủ công.',
    },
  ];

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-info-circle me-2"></i>
        Giới thiệu đề tài
      </h2>

      <Row className="mb-4">
        <Col xs={12}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-bullseye me-2"></i>
                Mục tiêu hệ thống
              </h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-0">
                Hệ thống quản lý mượn trả thiết bị phòng học bằng Blockchain được xây dựng nhằm mục đích:
              </p>
              <ul className="mt-3">
                <li>Quản lý thiết bị phòng học một cách minh bạch và hiệu quả</li>
                <li>Theo dõi lịch sử mượn trả thiết bị của người dùng</li>
                <li>Tự động hóa quy trình mượn trả thông qua Smart Contract</li>
                <li>Đảm bảo tính an toàn và không thể thay đổi dữ liệu</li>
                <li>Cung cấp giao diện thân thiện cho người dùng</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-info text-white">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-cpu me-2"></i>
                Công nghệ sử dụng
              </h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                {technologies.map((tech, index) => (
                  <Col key={index} xs={6} sm={4} md={3}>
                    <div className="text-center p-3 border rounded">
                      <i className={`bi ${tech.icon} fs-3 mb-2 text-${tech.color}`}></i>
                      <h6 className="fw-bold mb-0">{tech.name}</h6>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-stars me-2"></i>
                Lợi ích Blockchain trong quản lý thiết bị
              </h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-4">
                {benefits.map((benefit, index) => (
                  <Col key={index} xs={12} md={6} lg={4}>
                    <div className="h-100 p-3 border rounded">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                          <i className={`bi ${benefit.icon} fs-4 text-success`}></i>
                        </div>
                        <h6 className="fw-bold mb-0">{benefit.title}</h6>
                      </div>
                      <p className="mb-0 text-muted small">{benefit.description}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12}>
          <Card className="border-0 shadow-sm bg-light">
            <Card.Body className="text-center">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-mortarboard me-2"></i>
                Đồ án môn Blockchain
              </h5>
              <p className="mb-0 text-muted">
                Hệ thống quản lý mượn trả thiết bị phòng học bằng Blockchain
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
