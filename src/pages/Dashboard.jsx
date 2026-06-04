import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { getContract } from '../contract';
import StatisticsCard from '../components/StatisticsCard';
import StatisticsChart from '../components/StatisticsChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Dashboard({ isConnected }) {
  const [statistics, setStatistics] = useState({
    total: 0,
    available: 0,
    borrowed: 0,
    damaged: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isConnected) {
      loadStatistics();
    } else {
      // Load từ localStorage khi chưa kết nối
      const cachedStats = localStorage.getItem('cachedStatistics');
      if (cachedStats) {
        setStatistics(JSON.parse(cachedStats));
        setLoading(false);
      } else {
        // Tính toán statistics từ cached equipments
        const cachedEquipments = localStorage.getItem('cachedEquipments');
        if (cachedEquipments) {
          const equipments = JSON.parse(cachedEquipments);
          const stats = {
            total: equipments.length,
            available: equipments.filter(e => e.status === 0).length,
            borrowed: equipments.filter(e => e.status === 1).length,
            damaged: equipments.filter(e => e.status === 2).length,
          };
          setStatistics(stats);
          setLoading(false);
        }
      }
    }
  }, [isConnected]);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      setError('');
      const contract = await getContract();
      const stats = await contract.getStatistics();
      setStatistics({
        total: Number(stats[0]),
        available: Number(stats[1]),
        borrowed: Number(stats[2]),
        damaged: Number(stats[3]),
      });
      // Cache statistics vào localStorage
      localStorage.setItem('cachedStatistics', JSON.stringify({
        total: Number(stats[0]),
        available: Number(stats[1]),
        borrowed: Number(stats[2]),
        damaged: Number(stats[3]),
      }));
    } catch (err) {
      console.error('Error loading statistics:', err);
      setError('Không thể tải thống kê. Vui lòng kết nối MetaMask.');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Vui lòng kết nối MetaMask để xem thống kê
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải thống kê...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-speedometer2 me-2"></i>
        Dashboard
      </h2>
      
      <Row className="g-4 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <StatisticsCard
            icon="bi-box-seam"
            title="Tổng thiết bị"
            value={statistics.total}
            color="bg-primary"
            bgColor="bg-light"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatisticsCard
            icon="bi-check-circle"
            title="Sẵn sàng"
            value={statistics.available}
            color="bg-success"
            bgColor="bg-light"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatisticsCard
            icon="bi-arrow-repeat"
            title="Đang mượn"
            value={statistics.borrowed}
            color="bg-warning"
            bgColor="bg-light"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatisticsCard
            icon="bi-exclamation-triangle"
            title="Hỏng"
            value={statistics.damaged}
            color="bg-danger"
            bgColor="bg-light"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} lg={6}>
          <StatisticsChart statistics={statistics} />
        </Col>
        <Col xs={12} lg={6}>
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pt-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Thông tin hệ thống
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-box-seam me-2"></i>Tổng số thiết bị</span>
                  <span className="fw-bold">{statistics.total}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-check-circle me-2"></i>Thiết bị sẵn sàng</span>
                  <span className="fw-bold text-success">{statistics.available}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-arrow-repeat me-2"></i>Thiết bị đang mượn</span>
                  <span className="fw-bold text-warning">{statistics.borrowed}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-exclamation-triangle me-2"></i>Thiết bị hỏng</span>
                  <span className="fw-bold text-danger">{statistics.damaged}</span>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
