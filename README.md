# Hệ thống quản lý mượn trả thiết bị phòng học bằng Blockchain

Đồ án môn Blockchain - Hệ thống quản lý thiết bị phòng học sử dụng công nghệ Blockchain để đảm bảo tính minh bạch, an toàn và không thể thay đổi dữ liệu.

## 🚀 Công nghệ sử dụng

- **Frontend:** React 19 + Vite
- **Styling:** Bootstrap 5 + Bootstrap Icons
- **Blockchain:** Ethereum
- **Smart Contract:** Solidity
- **Web3 Library:** Ethers.js v6
- **Charts:** Chart.js + React Chart.js 2
- **Routing:** React Router DOM v6
- **Wallet:** MetaMask

## 📋 Tính năng chính

### 1. Kết nối MetaMask
- Kết nối ví MetaMask
- Hiển thị địa chỉ ví
- Hiển thị trạng thái kết nối

### 2. Dashboard
- Thống kê tổng số thiết bị
- Thống kê thiết bị sẵn sàng
- Thống kê thiết bị đang mượn
- Thống kê thiết bị hỏng
- Biểu đồ trực quan với Chart.js

### 3. Quản lý thiết bị
- Thêm thiết bị mới
- Mượn thiết bị
- Trả thiết bị
- Báo hỏng thiết bị
- Sửa chữa thiết bị
- Hiển thị danh sách thiết bị với đầy đủ thông tin

### 4. Lịch sử hoạt động
- Xem toàn bộ lịch sử giao dịch
- Hiển thị chi tiết từng hành động
- Thời gian thực của từng giao dịch

### 5. Trang giới thiệu
- Mục tiêu hệ thống
- Công nghệ sử dụng
- Lợi ích Blockchain trong quản lý thiết bị

## 🛠️ Cài đặt

### Yêu cầu
- Node.js 18+
- npm hoặc yarn
- MetaMask extension

### Các bước cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd equipment-dapp
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình MetaMask**
- Cài đặt MetaMask extension
- Kết nối với Ethereum testnet (Sepolia/Goerli)
- Thêm testnet ETH từ faucet

4. **Chạy development server**
```bash
npm run dev
```

5. **Mở trình duyệt**
- Truy cập `http://localhost:5173`
- Kết nối MetaMask
- Bắt đầu sử dụng

## 📁 Cấu trúc dự án

```
equipment-dapp/
├── src/
│   ├── App.jsx                 # Main component với Router
│   ├── App.css                 # Global styling
│   ├── contract.js             # Smart Contract connection
│   ├── components/
│   │   ├── Navbar.jsx          # Thanh điều hướng
│   │   ├── StatisticsCard.jsx  # Card thống kê
│   │   ├── StatisticsChart.jsx # Biểu đồ Chart.js
│   │   ├── EquipmentTable.jsx  # Bảng thiết bị
│   │   └── HistoryTable.jsx    # Bảng lịch sử
│   ├── pages/
│   │   ├── Dashboard.jsx       # Trang Dashboard
│   │   ├── Equipment.jsx        # Quản lý thiết bị
│   │   ├── History.jsx         # Lịch sử hoạt động
│   │   └── About.jsx           # Trang giới thiệu
│   └── main.jsx                # Entry point
├── public/                     # Static files
├── index.html                  # HTML template
├── package.json                # Dependencies
└── vite.config.js             # Vite configuration
```

## 🔗 Smart Contract

### Contract Address
```
0xA83D0F98647a9D67724606A5670E2422A8A9a75a
```

### Các hàm Smart Contract

- `addEquipment(string _name)` - Thêm thiết bị mới
- `borrowEquipment(uint256 _id)` - Mượn thiết bị
- `returnEquipment(uint256 _id)` - Trả thiết bị
- `markDamaged(uint256 _id)` - Báo hỏng thiết bị
- `repairEquipment(uint256 _id)` - Sửa chữa thiết bị
- `getStatistics()` - Lấy thống kê
- `getHistoryCount()` - Lấy số lượng lịch sử
- `getHistory(uint256 index)` - Lấy chi tiết lịch sử
- `equipments(uint256 id)` - Lấy thông tin thiết bị
- `equipmentCount()` - Lấy tổng số thiết bị

## 💾 Lưu trữ dữ liệu

### LocalStorage Cache
- Dữ liệu được cache vào localStorage để tăng tốc độ
- Dữ liệu không bị mất khi reload trang
- Tự động đồng bộ với blockchain khi kết nối

### Blockchain Storage
- Dữ liệu chính được lưu trên Ethereum blockchain
- Đảm bảo tính minh bạch và không thể thay đổi
- Vĩnh viễn khi deploy lên testnet thực sự

## 🎯 Trạng thái thiết bị

- **0:** Sẵn sàng (Available)
- **1:** Đang mượn (Borrowed)
- **2:** Hỏng (Damaged)

## 🔐 Bảo mật

- Tất cả giao dịch yêu cầu ký bằng MetaMask
- Smart Contract đã được audit
- Không có quyền admin đặc biệt
- Mọi người dùng đều có thể thực hiện các hành động

## 📱 Responsive Design

- Tương thích với mọi kích thước màn hình
- Bootstrap 5 đảm bảo giao diện đẹp trên mobile
- Tối ưu hóa cho tablet và desktop

## 🚀 Build cho Production

```bash
npm run build
```

File build sẽ nằm trong thư mục `dist/`

## 📝 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 🐛 Xử lý lỗi

### Không thể kết nối MetaMask
- Kiểm tra MetaMask đã được cài đặt
- Đảm bảo đang kết nối với testnet
- Kiểm tra có đủ ETH cho gas fee

### Không thể tải dữ liệu
- Kiểm tra kết nối internet
- Đảm bảo Smart Contract address đúng
- Kiểm tra network đang sử dụng

### Dữ liệu không hiển thị
- Reload trang
- Xóa cache localStorage nếu cần
- Kiểm tra console để xem lỗi

## 🤝 Đóng góp

Đây là đồ án môn học, không chấp nhận pull request từ bên ngoài.

## 📄 License

MIT License - Đồ án môn Blockchain

## 👨‍💻 Tác giả

Sinh viên môn Blockchain

## 🙏 Cảm ơn

- React Team
- Vite Team
- Ethereum Foundation
- Bootstrap Team
- MetaMask Team
