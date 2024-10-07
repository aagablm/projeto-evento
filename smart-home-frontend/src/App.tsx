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
    fogaoOn: boolean
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
      fogaoOn: false
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

    return () => {
      socket.off('estadoInicial');
      socket.off('estadoAltera');
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

  const ligarFogao = () => {
    socket.emit('ligarFogao');
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
          <button onClick={ligarGeladeira}>
            {dispositivo.cozinha.geladeiraOn ? 'Abrir Geladeira' : 'Fechar Geladeira'}
          </button>
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
