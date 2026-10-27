import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de teste da API (Ping)
app.get('/api/ping', async (req, res) => {
    try {
        // Testando conexão executando uma query simples no MySQL
        const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
        res.json({
            status: 'ok',
            mensagem: 'API Node.js + TypeScript com MySQL funcionando!',
            db_test: rows
        });
    } catch (error) {
        console.error('Erro de conexão com o banco:', error);
        res.status(500).json({ status: 'erro', mensagem: 'Falha ao conectar no MySQL' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend rodando em: http://localhost:${PORT}`);
});
