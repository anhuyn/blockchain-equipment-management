import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function HistoryTable({ histories }) {
  const getActionBadge = (action) => {
    switch (action) {
      case 'Added':
        return <Badge bg="primary">Thêm mới</Badge>;
      case 'Borrowed':
        return <Badge bg="warning">Mượn</Badge>;
      case 'Returned':
        return <Badge bg="success">Trả</Badge>;
      case 'Damaged':
        return <Badge bg="danger">Báo hỏng</Badge>;
      case 'Repaired':
        return <Badge bg="info">Sửa chữa</Badge>;
      default:
        return <Badge bg="secondary">{action}</Badge>;
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
            <th>ID thiết bị</th>
            <th>Tên thiết bị</th>
            <th>Loại người dùng</th>
            <th>Mã SV/GV</th>
            <th>Họ tên</th>
            <th>Địa chỉ ví</th>
            <th>Hành động</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {histories && histories.length > 0 ? (
            histories.map((history, index) => (
              <tr key={index}>
                <td className="fw-bold">#{history.equipmentId}</td>
                <td>{history.equipmentName}</td>
                <td>
                  {history.userType === 'student' ? (
                    <Badge bg="primary">Sinh viên</Badge>
                  ) : history.userType === 'teacher' ? (
                    <Badge bg="success">Giảng viên</Badge>
                  ) : (
                    <Badge bg="secondary">-</Badge>
                  )}
                </td>
                <td className="fw-medium">{history.userId || '-'}</td>
                <td>{history.userName || '-'}</td>
                <td className="font-monospace small">{formatAddress(history.walletAddress || history.user)}</td>
                <td>{getActionBadge(history.action)}</td>
                <td className="small">{formatTimestamp(history.timestamp)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted py-4">
                <i className="bi bi-clock-history fs-1 d-block mb-2"></i>
                Chưa có lịch sử hoạt động
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default HistoryTable;
