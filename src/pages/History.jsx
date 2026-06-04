import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';
import { getContract } from '../contract';
import HistoryTable from '../components/HistoryTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function History({ isConnected }) {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isConnected) {
      loadHistories();
    } else {
      // Load từ localStorage khi chưa kết nối
      const cachedHistories = localStorage.getItem('cachedHistories');
      if (cachedHistories) {
        setHistories(JSON.parse(cachedHistories));
        setLoading(false);
      }
    }
  }, [isConnected]);

  const loadHistories = async () => {
    try {
      setLoading(true);
      setError('');
      const contract = await getContract();
      const count = await contract.getHistoryCount();
      const historyList = [];

      for (let i = 0; i < Number(count); i++) {
        const history = await contract.getHistory(i);
        historyList.push({
          equipmentId: Number(history[0]),
          equipmentName: history[1],
          user: history[2],
          action: history[3],
          timestamp: Number(history[4]),
        });
      }

      const reversedList = historyList.reverse();
      setHistories(reversedList);
      // Cache dữ liệu vào localStorage
      localStorage.setItem('cachedHistories', JSON.stringify(reversedList));
    } catch (err) {
      console.error('Error loading histories:', err);
      setError('Không thể tải lịch sử hoạt động. Vui lòng kết nối MetaMask.');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Vui lòng kết nối MetaMask để xem lịch sử
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải lịch sử hoạt động...</p>
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
        <i className="bi bi-clock-history me-2"></i>
        Lịch sử hoạt động
      </h2>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <HistoryTable histories={histories} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default History;
