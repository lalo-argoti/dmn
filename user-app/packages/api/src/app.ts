import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes'; 

dotenv.config();

const app = express();

const corsOptions = {
        
    origin: 'http://localhost:5173', // Tu frontend Angular
    credentials: true
    };
app.use(cors(corsOptions)); 
app.use(express.json());

app.use('/api', userRoutes);
app.get('/', (req, res) => {
  res.send('API DOMINA funcionando ✔️');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
});
