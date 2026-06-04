import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function StatisticsCard({ icon, title, value, color, bgColor }) {
  return (
    <Card className={`h-100 border-0 shadow-sm ${bgColor}`}>
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={3}>
            <div className={`d-flex align-items-center justify-content-center rounded-circle ${color} text-white`} style={{ width: '60px', height: '60px' }}>
              <i className={`bi ${icon} fs-4`}></i>
            </div>
          </Col>
          <Col xs={9}>
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className="fw-bold mb-0">{value}</h3>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default StatisticsCard;
