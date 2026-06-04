import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function EquipmentTable({ equipments, onBorrow, onReturn, onMarkDamaged, onRepair }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return <Badge bg="success">Sẵn sàng</Badge>;
      case 1:
        return <Badge bg="warning">Đang mượn</Badge>;
      case 2:
        return <Badge bg="danger">Hỏng</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp || timestamp === 0) return '-';
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString('vi-VN');
  };

  const formatAddress = (address) => {
    if (!address || address === '0x0000000000000000000000000000000000000000') return '-';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên thiết bị</th>
            <th>Trạng thái</th>
            <th>Người mượn</th>
            <th>Thời gian mượn</th>
            <th>Hạn trả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {equipments && equipments.length > 0 ? (
            equipments.map((equipment) => (
              <tr key={equipment.id}>
                <td className="fw-bold">#{equipment.id}</td>
                <td>{equipment.name}</td>
                <td>{getStatusBadge(equipment.status)}</td>
                <td className="font-monospace small">{formatAddress(equipment.borrower)}</td>
                <td className="small">{formatTimestamp(equipment.borrowTime)}</td>
                <td className="small">{formatTimestamp(equipment.dueDate)}</td>
                <td>
                  <div className="btn-group btn-group-sm" role="group">
                    {equipment.status === 0 && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => onBorrow(equipment.id)}
                      >
                        <i className="bi bi-box-arrow-in-right me-1"></i>
                        Mượn
                      </Button>
                    )}
                    {equipment.status === 1 && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => onReturn(equipment.id)}
                      >
                        <i className="bi bi-box-arrow-left me-1"></i>
                        Trả
                      </Button>
                    )}
                    {equipment.status !== 2 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onMarkDamaged(equipment.id)}
                      >
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        Báo hỏng
                      </Button>
                    )}
                    {equipment.status === 2 && (
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => onRepair(equipment.id)}
                      >
                        <i className="bi bi-tools me-1"></i>
                        Sửa chữa
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted py-4">
                <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                Chưa có thiết bị nào
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default EquipmentTable;
