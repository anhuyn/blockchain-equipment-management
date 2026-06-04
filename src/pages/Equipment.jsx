import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { getContract } from '../contract';
import EquipmentTable from '../components/EquipmentTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Equipment({ isConnected, account }) {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEquipmentName, setNewEquipmentName] = useState('');
  const [adding, setAdding] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [userType, setUserType] = useState('student'); // 'student' or 'teacher'
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (isConnected) {
      loadEquipments();
    } else {
      // Load from localStorage khi chưa kết nối
      const cachedEquipments = localStorage.getItem('cachedEquipments');
      if (cachedEquipments) {
        setEquipments(JSON.parse(cachedEquipments));
        setLoading(false);
      }
    }
  }, [isConnected]);

  const loadEquipments = async () => {
    try {
      setLoading(true);
      setError('');
      const contract = await getContract();
      const count = await contract.equipmentCount();
      const equipmentList = [];

      for (let i = 1; i <= Number(count); i++) {
        const equipment = await contract.equipments(i);
        if (equipment.exists) {
          equipmentList.push({
            id: Number(equipment.id),
            name: equipment.name,
            status: Number(equipment.status),
            borrower: equipment.borrower,
            borrowTime: Number(equipment.borrowTime),
            dueDate: Number(equipment.dueDate),
          });
        }
      }

      setEquipments(equipmentList);
      // Cache dữ liệu vào localStorage
      localStorage.setItem('cachedEquipments', JSON.stringify(equipmentList));
    } catch (err) {
      console.error('Error loading equipments:', err);
      setError('Không thể tải danh sách thiết bị. Vui lòng kết nối MetaMask.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    if (!newEquipmentName.trim()) return;

    try {
      setAdding(true);
      setError('');
      const contract = await getContract();
      const tx = await contract.addEquipment(newEquipmentName);
      await tx.wait();
      setNewEquipmentName('');
      setShowAddModal(false);
      await loadEquipments();
      // Cache dữ liệu mới
      localStorage.setItem('cachedEquipments', JSON.stringify([...equipments, { id: equipments.length + 1, name: newEquipmentName, status: 0, borrower: '0x0000000000000000000000000000000000000000', borrowTime: 0, dueDate: 0 }]));
    } catch (err) {
      console.error('Error adding equipment:', err);
      setError('Không thể thêm thiết bị. Vui lòng thử lại.');
    } finally {
      setAdding(false);
    }
  };

  const handleBorrow = async (id) => {
    setSelectedEquipmentId(id);
    setShowBorrowModal(true);
  };

  const handleConfirmBorrow = async (e) => {
    e.preventDefault();
    if (!userId.trim() || !userName.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      setActionLoading(true);
      setError('');
      
      // Lưu thông tin người mượn vào localStorage trước
      const borrowerInfo = {
        userType,
        userId,
        userName,
        walletAddress: account,
        timestamp: Math.floor(Date.now() / 1000)
      };
      localStorage.setItem(`borrower_${selectedEquipmentId}`, JSON.stringify(borrowerInfo));
      
      // Gọi Smart Contract
      const contract = await getContract();
      const tx = await contract.borrowEquipment(selectedEquipmentId);
      await tx.wait();
      
      // Load lại từ Smart Contract
      await loadEquipments();
      
      // Cập nhật lại localStorage với thông tin borrowerInfo
      const cachedEquipments = JSON.parse(localStorage.getItem('cachedEquipments') || '[]');
      const updatedEquipments = cachedEquipments.map(eq => 
        eq.id === selectedEquipmentId ? { ...eq, status: 1, borrower: account, borrowTime: Math.floor(Date.now() / 1000), dueDate: Math.floor(Date.now() / 1000) + 604800, borrowerInfo } : eq
      );
      localStorage.setItem('cachedEquipments', JSON.stringify(updatedEquipments));
      setEquipments(updatedEquipments);
      
      // Thêm vào lịch sử localStorage
      const histories = JSON.parse(localStorage.getItem('cachedHistories') || '[]');
      histories.unshift({
        equipmentId: selectedEquipmentId,
        equipmentName: equipments.find(eq => eq.id === selectedEquipmentId)?.name || '',
        userType,
        userId,
        userName,
        walletAddress: account,
        action: 'Borrowed',
        timestamp: Math.floor(Date.now() / 1000)
      });
      localStorage.setItem('cachedHistories', JSON.stringify(histories));
      
      // Reset form
      setUserId('');
      setUserName('');
      setUserType('student');
      setShowBorrowModal(false);
      setSelectedEquipmentId(null);
    } catch (err) {
      console.error('Error borrowing equipment:', err);
      setError('Không thể mượn thiết bị. Vui lòng thử lại.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReturn = async (id) => {
    try {
      setActionLoading(true);
      setError('');
      const contract = await getContract();
      const tx = await contract.returnEquipment(id);
      await tx.wait();
      await loadEquipments();
      
      // Lấy thông tin người mượn từ localStorage
      const borrowerInfo = JSON.parse(localStorage.getItem(`borrower_${id}`) || '{}');
      
      // Cập nhật localStorage sau khi trả
      const updatedEquipments = equipments.map(eq => 
        eq.id === id ? { ...eq, status: 0, borrower: '0x0000000000000000000000000000000000000000', borrowTime: 0, dueDate: 0, borrowerInfo: null } : eq
      );
      localStorage.setItem('cachedEquipments', JSON.stringify(updatedEquipments));
      
      // Thêm vào lịch sử localStorage
      const histories = JSON.parse(localStorage.getItem('cachedHistories') || '[]');
      histories.unshift({
        equipmentId: id,
        equipmentName: equipments.find(eq => eq.id === id)?.name || '',
        userType: borrowerInfo.userType || '',
        userId: borrowerInfo.userId || '',
        userName: borrowerInfo.userName || '',
        walletAddress: borrowerInfo.walletAddress || account,
        action: 'Returned',
        timestamp: Math.floor(Date.now() / 1000)
      });
      localStorage.setItem('cachedHistories', JSON.stringify(histories));
      
      // Xóa thông tin người mượn
      localStorage.removeItem(`borrower_${id}`);
    } catch (err) {
      console.error('Error returning equipment:', err);
      setError('Không thể trả thiết bị. Vui lòng thử lại.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkDamaged = async (id) => {
    try {
      setActionLoading(true);
      setError('');
      const contract = await getContract();
      const tx = await contract.markDamaged(id);
      await tx.wait();
      await loadEquipments();
      // Cập nhật localStorage sau khi báo hỏng
      const updatedEquipments = equipments.map(eq => 
        eq.id === id ? { ...eq, status: 2 } : eq
      );
      localStorage.setItem('cachedEquipments', JSON.stringify(updatedEquipments));
    } catch (err) {
      console.error('Error marking damaged:', err);
      setError('Không thể báo hỏng thiết bị. Vui lòng thử lại.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRepair = async (id) => {
    try {
      setActionLoading(true);
      setError('');
      const contract = await getContract();
      const tx = await contract.repairEquipment(id);
      await tx.wait();
      await loadEquipments();
      // Cập nhật localStorage sau khi sửa chữa
      const updatedEquipments = equipments.map(eq => 
        eq.id === id ? { ...eq, status: 0 } : eq
      );
      localStorage.setItem('cachedEquipments', JSON.stringify(updatedEquipments));
    } catch (err) {
      console.error('Error repairing equipment:', err);
      setError('Không thể sửa chữa thiết bị. Vui lòng thử lại.');
    } finally {
      setActionLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Vui lòng kết nối MetaMask để quản lý thiết bị
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-list-check me-2"></i>
            Quản lý thiết bị
          </h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-plus-circle me-2"></i>
            Thêm thiết bị
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      <Card className="border-0 shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Đang tải danh sách thiết bị...</p>
            </div>
          ) : (
            <EquipmentTable
              equipments={equipments}
              onBorrow={handleBorrow}
              onReturn={handleReturn}
              onMarkDamaged={handleMarkDamaged}
              onRepair={handleRepair}
            />
          )}
        </Card.Body>
      </Card>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-plus-circle me-2"></i>
            Thêm thiết bị mới
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddEquipment}>
            <Form.Group className="mb-3">
              <Form.Label>Tên thiết bị</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên thiết bị"
                value={newEquipmentName}
                onChange={(e) => setNewEquipmentName(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit" disabled={adding}>
                {adding ? <><Spinner animation="border" size="sm" /> Đang thêm...</> : 'Thêm'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showBorrowModal} onHide={() => setShowBorrowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-person-check me-2"></i>
            Thông tin người mượn
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleConfirmBorrow}>
            <Form.Group className="mb-3">
              <Form.Label>Loại người dùng</Form.Label>
              <Form.Select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="student">Sinh viên</option>
                <option value="teacher">Giảng viên</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{userType === 'student' ? 'Mã sinh viên' : 'Mã giảng viên'}</Form.Label>
              <Form.Control
                type="text"
                placeholder={userType === 'student' ? 'Nhập mã sinh viên' : 'Nhập mã giảng viên'}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{userType === 'student' ? 'Họ tên sinh viên' : 'Họ tên giảng viên'}</Form.Label>
              <Form.Control
                type="text"
                placeholder={userType === 'student' ? 'Nhập họ tên sinh viên' : 'Nhập họ tên giảng viên'}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={() => setShowBorrowModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit" disabled={actionLoading}>
                {actionLoading ? <><Spinner animation="border" size="sm" /> Đang xử lý...</> : 'Xác nhận mượn'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Equipment;
