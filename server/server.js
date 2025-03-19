const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);


const serviceRoutes = require('./routes/serviceRoutes');
app.use('/services', serviceRoutes);

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/appointments', appointmentRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/reviews', reviewRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});


