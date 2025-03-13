const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'booking_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000 // Timeout 10s
});

pool.getConnection()
  .then((connection) => {
    console.log('✅ Kết nối MySQL thành công!');
    connection.release(); // Giải phóng kết nối ngay sau khi test
  })
  .catch((err) => {
    console.error('❌ Lỗi kết nối MySQL:', err);
  });

module.exports = pool;
