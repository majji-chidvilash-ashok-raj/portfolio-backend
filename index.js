import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Db.js';
import adminRouter from './routes/adminRoute.js';
import projectRoute from './routes/projectRoute.js';
import skillRoute from './routes/skillRoute.js'
import aboutRoute from './routes/aboutRoute.js'
import eduRoute from './routes/educationRoute.js'

dotenv.config();
console.log("ENV PORT VALUE --->", process.env.PORT);

const app = express();
const PORT = process.env.PORT || 3000;


const allowedOrigins = [
  "https://portfolio-chidvilashmajji.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
}));

app.use(cors());



app.use(express.json({ limit: "5mb" }));

connectDB();


app.use('/api/admin', adminRouter);
app.use('/api/projects', projectRoute);
app.use("/api/skills", skillRoute);
app.use("/api/about", aboutRoute);
app.use("/api/education", eduRoute);

app.get('/', (req, res) => {
  res.send("API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
