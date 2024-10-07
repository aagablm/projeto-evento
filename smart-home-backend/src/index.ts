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
        arTemperatura: 24, // Temperatura inicial do ar-condicionado
        tvOn: false,
        tvCanal: 1
    },
    cozinha: {
        luzCozinhaOn: false,
        geladeiraOn: false,
        geladeiraTemperatura: 6, // Temperatura inicial
        alertaGeladeira: false, // Alerta da geladeira
        fogaoOn: false,
        fogaoPotencia: 1
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

    socket.on('ajustarAr', (novaTemperatura) => {
        if (novaTemperatura >= 18 && novaTemperatura <= 30) {
            dispositivos.sala.arTemperatura = novaTemperatura;
            io.emit('estadoAltera', dispositivos);
        }
    });

    socket.on('ligarTV', () => {
        dispositivos.sala.tvOn = !dispositivos.sala.tvOn;
        io.emit('estadoAltera', dispositivos);
    });
    socket.on('mudarCanal', (novoCanal: number) => {
        if (dispositivos.sala.tvOn) { // Verifica se a TV está ligada
            dispositivos.sala.tvCanal = novoCanal;
            io.emit('estadoAltera', dispositivos);
        }
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
    // Função para verificar a temperatura da geladeira
    const verificarTemperaturaGeladeira = () => {
        const limiteTemperatura = 5; 
        if (dispositivos.cozinha.geladeiraTemperatura > limiteTemperatura) {
            dispositivos.cozinha.alertaGeladeira = true; 
            io.emit('alertaGeladeira', `Alerta: A temperatura da geladeira está alta: ${dispositivos.cozinha.geladeiraTemperatura}°C`);
        } else {
            dispositivos.cozinha.alertaGeladeira = false;
        }
    };

    socket.on('ajustarTemperaturaGeladeira', (novaTemperatura) => {
        dispositivos.cozinha.geladeiraTemperatura = novaTemperatura;
        io.emit('estadoAltera', dispositivos);
        verificarTemperaturaGeladeira(); // Verifica a temperatura da geladeira
    });

    socket.on('ligarFogao', () => {
        dispositivos.cozinha.fogaoOn = !dispositivos.cozinha.fogaoOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ajustarPotenciaFogao', (novaPotencia) => {
        dispositivos.cozinha.fogaoPotencia = novaPotencia;
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
