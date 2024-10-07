import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import luz from './imagens/luz.png';
import ar from './imagens/ar.png';
import tv from './imagens/tv.png';
import geladeira from './imagens/geladeira.png';
import fogao from './imagens/fogao.png';
import ventilador from './imagens/ventilador.png';
import cortinas from './imagens/cortina.png'; 

const socket = io('http://localhost:4000');

interface EstadoDispositivo {
  sala: {
    luzOn: boolean,
    arOn: boolean,
    tvOn: boolean
  },
  cozinha: {
    luzCozinhaOn: boolean,
    geladeiraOn: boolean,
    geladeiraTemperatura: number, // Adiciona a temperatura da geladeira
    alertaGeladeira: boolean, // Estado do alerta da geladeira
    fogaoOn: boolean,
    fogaoPotencia: number // Nível de potência do fogão
  },
  quarto: {
    luzQuartoOn: boolean,
    ventiladorOn: boolean,
    ventiladorVelocidade: number,
    cortinasAbertas: boolean
  }
}

const App: React.FC = () => {
  const [dispositivo, setDispositivo] = useState<EstadoDispositivo>({
    sala: {
      luzOn: false,
      arOn: false,
      tvOn: false
    },
    cozinha: {
      luzCozinhaOn: false,
      geladeiraOn: false,
      geladeiraTemperatura: 0, // Inicializa a temperatura
      alertaGeladeira: false, // Inicializa o alerta
      fogaoOn: false,
      fogaoPotencia: 1 // Inicializa a potência do fogão
    },
    quarto: {
      luzQuartoOn: false,
      ventiladorOn: false,
      ventiladorVelocidade: 1,
      cortinasAbertas: false
    }
  });

  useEffect(() => {
    socket.on('estadoInicial', (estadoDispositivos: EstadoDispositivo) => {
      setDispositivo(estadoDispositivos);
    });

    socket.on('estadoAltera', (novoEstado: EstadoDispositivo) => {
      setDispositivo(novoEstado);
    });

    socket.on('alertaGeladeira', (mensagem: string) => {
      alert(mensagem); // Exibe um alerta quando a temperatura da geladeira estiver acima do limite
    });

    return () => {
      socket.off('estadoInicial');
      socket.off('estadoAltera');
      socket.off('alertaGeladeira');
    };
  }, []);

  // Funções para a Sala
  const acenderLuzSala = () => {
    socket.emit('acenderLuzSala');
  };

  const ligarAr = () => {
    socket.emit('ligarAr');
  };

  const ligarTV = () => {
    socket.emit('ligarTV');
  };

  // Funções para a Cozinha
  const acenderLuzCozinha = () => {
    socket.emit('acenderLuzCozinha');
  };

  const ligarGeladeira = () => {
    socket.emit('ligarGeladeira');
  };

  const ajustarTemperaturaGeladeira = (novaTemperatura: number) => {
    socket.emit('ajustarTemperaturaGeladeira', novaTemperatura);
  };

  const ligarFogao = () => {
    socket.emit('ligarFogao');
  };

  const ajustarPotenciaFogao = (novaPotencia: number) => {
    socket.emit('ajustarPotenciaFogao', novaPotencia);
  };

  // Funções para o Quarto
  const acenderLuzQuarto = () => {
    socket.emit('acenderLuzQuarto');
  };

  const ligarVentilador = () => {
    socket.emit('ligarVentilador');
  };

  const ajustarVelocidadeVentilador = (novaVelocidade: number) => {
    socket.emit('ajustarVelocidadeVentilador', novaVelocidade);
  };

  const abrirFecharCortinas = () => {
    socket.emit('abrirFecharCortinas');
  };

  return (
    <div className='casa'>
      <h1>Casa Inteligente</h1>
      
      {/* Sala */}
      <h2>Sala</h2>
      <div className="sala">
        <div className='luz'>
          <p>Luz</p>
          <button onClick={acenderLuzSala}>
            {dispositivo.sala.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
          </button>
          <img
            src={luz}
            className={`status ${dispositivo.sala.luzOn ? 'on' : 'off'}`}
            alt="Estado da Luz"
          />
        </div>

        <div className='ar'>
          <p>Ar-Condicionado</p>
          <button onClick={ligarAr}>
            {dispositivo.sala.arOn ? 'Desligar Ar' : 'Ligar Ar'}
          </button>
          <img
            src={ar}
            className={`status ${dispositivo.sala.arOn ? 'on' : 'off'}`}
            alt="Estado do Ar-Condicionado"
          />
        </div>

        <div className='tv'>
          <p>Televisão</p>
          <button onClick={ligarTV}>
            {dispositivo.sala.tvOn ? 'Desligar Televisão' : 'Ligar Televisão'}
          </button>
          <img
            src={tv}
            className={`status ${dispositivo.sala.tvOn ? 'on' : 'off'}`}
          />
        </div>
      </div>
      
      {/* Cozinha */}
      <h2>Cozinha</h2>
      <div className="cozinha">
        <div className='luz'>
          <p>Luz</p>
          <button onClick={acenderLuzCozinha}>
            {dispositivo.cozinha.luzCozinhaOn ? 'Desligar Luz' : 'Ligar Luz'}
          </button>
          <img
            src={luz}
            className={`status ${dispositivo.cozinha.luzCozinhaOn ? 'on' : 'off'}`}
            alt="Estado da Luz da Cozinha"
          />
        </div>

        <div className='geladeira'>
        <p>Geladeira</p>
          <button onClick={ligarGeladeira}>
            {dispositivo.cozinha.geladeiraOn ? 'Fechar Geladeira' : 'Abrir Geladeira'}
          </button>
          <p>Temperatura: {dispositivo.cozinha.geladeiraTemperatura.toFixed(1)}°C</p>
          <input 
            type="number" 
            value={dispositivo.cozinha.geladeiraTemperatura} 
            onChange={(e) => ajustarTemperaturaGeladeira(Number(e.target.value))} 
            placeholder="Ajustar Temperatura"
          />
          <img
            src={geladeira}
            className={`status ${dispositivo.cozinha.geladeiraOn ? 'on' : 'off'}`}
          />
        </div>

        <div className='fogao'>
          <p>Fogão</p>
          <button onClick={ligarFogao}>
            {dispositivo.cozinha.fogaoOn ? 'Desligar Fogão' : 'Ligar Fogão'}
          </button>
          <p>Potência: 
            <select 
              value={dispositivo.cozinha.fogaoPotencia} 
              onChange={(e) => ajustarPotenciaFogao(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </p>
          <img
            src={fogao}
            className={`status ${dispositivo.cozinha.fogaoOn ? 'on' : 'off'}`}
          />
        </div>
      </div>
      
      {/* Quarto */}
      <h2>Quarto</h2>
      <div className="quarto">
        <div className='luz'>
          <p>Luz</p>
          <button onClick={acenderLuzQuarto}>
            {dispositivo.quarto.luzQuartoOn ? 'Desligar Luz' : 'Ligar Luz'}
          </button>
          <img
            src={luz}
            className={`status ${dispositivo.quarto.luzQuartoOn ? 'on' : 'off'}`}
            alt="Estado da Luz do Quarto"
          />
        </div>

        <div className='ventilador'>
          <p>Ventilador</p>
          <button onClick={ligarVentilador}>
            {dispositivo.quarto.ventiladorOn ? 'Desligar Ventilador' : 'Ligar Ventilador'}
          </button>
          <div>
            <label>Velocidade:</label>
            <select value={dispositivo.quarto.ventiladorVelocidade} onChange={(e) => ajustarVelocidadeVentilador(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <img
            src={ventilador}
            className={`status ${dispositivo.quarto.ventiladorOn ? 'on' : 'off'}`}
            alt="Estado do Ventilador"
          />
        </div>

        <div className='cortinas'>
          <p>Cortinas</p>
          <button onClick={abrirFecharCortinas}>
            {dispositivo.quarto.cortinasAbertas ? 'Fechar Cortinas' : 'Abrir Cortinas'}
          </button>
          <img
            src={cortinas}
            className={`status ${dispositivo.quarto.cortinasAbertas ? 'on' : 'off'}`}
            alt="Estado das Cortinas"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
