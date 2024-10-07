import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

// Criar servidor http
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // URL do Front-End React
        methods: ["GET", "POST"],
    }
});

// Estado inicial dos dispositivos
let dispositivos = {
    sala: {
        luzOn: false,
        arOn: false,
        tvOn: false
    },
    cozinha: {
        luzCozinhaOn: false,
        geladeiraOn: false,
        fogaoOn: false
    },
    quarto: {
        luzQuartoOn: false,
        ventiladorOn: false,
        ventiladorVelocidade: 1,
        cortinasAbertas: false
    }
};

// Escuta os eventos de conexão do socket
io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id);

    // Enviando o estado inicial dos dispositivos para o cliente
    socket.emit('estadoInicial', dispositivos);

    // Manipulando os eventos e mudanças do estado dos dispositivos
    // Sala
    socket.on('acenderLuzSala', () => {
        dispositivos.sala.luzOn = !dispositivos.sala.luzOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarAr', () => {
        dispositivos.sala.arOn = !dispositivos.sala.arOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarTV', () => {
        dispositivos.sala.tvOn = !dispositivos.sala.tvOn;
        io.emit('estadoAltera', dispositivos);
    });

    // Cozinha
    socket.on('acenderLuzCozinha', () => {
        dispositivos.cozinha.luzCozinhaOn = !dispositivos.cozinha.luzCozinhaOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarGeladeira', () => {
        dispositivos.cozinha.geladeiraOn = !dispositivos.cozinha.geladeiraOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarFogao', () => {
        dispositivos.cozinha.fogaoOn = !dispositivos.cozinha.fogaoOn;
        io.emit('estadoAltera', dispositivos);
    });

    // Quarto
    socket.on('acenderLuzQuarto', () => {
        dispositivos.quarto.luzQuartoOn = !dispositivos.quarto.luzQuartoOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarVentilador', () => {
        dispositivos.quarto.ventiladorOn = !dispositivos.quarto.ventiladorOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ajustarVelocidadeVentilador', (novaVelocidade) => {
        dispositivos.quarto.ventiladorVelocidade = novaVelocidade;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('abrirFecharCortinas', () => {
        dispositivos.quarto.cortinasAbertas = !dispositivos.quarto.cortinasAbertas;
        io.emit('estadoAltera', dispositivos);
    });
});

// Iniciar Servidor
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
