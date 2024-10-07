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
    tvOn: boolean,
    tvCanal: number // Corrigido para number
  },
  cozinha: {
    luzCozinhaOn: boolean,
    geladeiraOn: boolean,
    geladeiraTemperatura: number,
    alertaGeladeira: boolean,
    fogaoOn: boolean,
    fogaoPotencia: number
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
      tvOn: false,
      tvCanal: 1 // Inicializa o canal como 1
    },
    cozinha: {
      luzCozinhaOn: false,
      geladeiraOn: false,
      geladeiraTemperatura: 0,
      alertaGeladeira: false,
      fogaoOn: false,
      fogaoPotencia: 1
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

  const acenderLuzSala = () => {
    socket.emit('acenderLuzSala');
  };

  const ligarAr = () => {
    socket.emit('ligarAr');
  };

  const ligarTV = () => {
    socket.emit('ligarTV');
  };

  const mudarCanal = (novoCanal: number) => {
    socket.emit('mudarCanal', novoCanal);
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
          />
        </div>

        <div className='tv'>
          <p>Televisão</p>
          <button onClick={ligarTV}>
            {dispositivo.sala.tvOn ? 'Desligar Televisão' : 'Ligar Televisão'}
          </button>

          {dispositivo.sala.tvOn && (
            <>
              <p>
                Canal:
                <select
                  value={dispositivo.sala.tvCanal}
                  onChange={(e) => mudarCanal(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((canal) => (
                    <option key={canal} value={canal}>{canal}</option>
                  ))}
                </select>
              </p>

              <div className={`tv-container`}>
                {dispositivo.sala.tvOn && (
                  <>
                    <div className={`canal canal-${dispositivo.sala.tvCanal}`} />
                    <img
                      src={tv}
                      className={`status ${dispositivo.sala.tvOn ? 'on' : 'off'}`}

                    />
                  </>
                )}
              </div>

            </>
          )}
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
          />
        </div>

        <div className='geladeira'>
          <p>Geladeira</p>
          <button onClick={ligarGeladeira}>
            {dispositivo.cozinha.geladeiraOn ? 'Fechar Geladeira' : 'Abrir Geladeira'}
          </button>
          <img
            src={geladeira}
            className={`status ${dispositivo.cozinha.geladeiraOn ? 'on' : 'off'}`}
          />
          <p>Temperatura: {dispositivo.cozinha.geladeiraTemperatura.toFixed(1)}°C</p>
          <input
            type="number"
            value={dispositivo.cozinha.geladeiraTemperatura}
            onChange={(e) => ajustarTemperaturaGeladeira(Number(e.target.value))}
            placeholder="Ajustar Temperatura"
          />
        </div>

        <div className='fogao'>
          <p>Fogão</p>
          <button onClick={ligarFogao}>
            {dispositivo.cozinha.fogaoOn ? 'Desligar Fogão' : 'Ligar Fogão'}
          </button>
          <p>
            Potência:
            <select
              value={dispositivo.cozinha.fogaoPotencia}
              onChange={(e) => ajustarPotenciaFogao(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((potencia) => (
                <option key={potencia} value={potencia}>{potencia}</option>
              ))}
            </select>
          </p>
          <div className={`fogao-container ${dispositivo.cozinha.fogaoOn ? 'on' : 'off'}`}>
            {dispositivo.cozinha.fogaoOn && (
              <>
                <div className={`fire potencia-${dispositivo.cozinha.fogaoPotencia}`} />
                <img src={fogao} className="status" />
              </>
            )}
          </div>
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
          />
        </div>
        <div className='ventilador'>
          <p>Ventilador</p>
          <button onClick={ligarVentilador}>
            {dispositivo.quarto.ventiladorOn ? 'Desligar Ventilador' : 'Ligar Ventilador'}
          </button>
          <p>
            Velocidade:
            <select
              value={dispositivo.quarto.ventiladorVelocidade}
              onChange={(e) => ajustarVelocidadeVentilador(Number(e.target.value))}
            >
              {[1, 2, 3].map((velocidade) => (
                <option key={velocidade} value={velocidade}>{velocidade}</option>
              ))}
            </select>
          </p>
          <div className={`velocidade velocidade-${dispositivo.quarto.ventiladorVelocidade}`}>
            {dispositivo.quarto.ventiladorOn && (
              <div className="wave" />
            )}
            <img
              src={ventilador}
              className={`status ${dispositivo.quarto.ventiladorOn ? 'on' : 'off'}`}
            />
          </div>

        </div>

        <div className='cortinas'>
          <p>Cortinas</p>
          <button onClick={abrirFecharCortinas}>
            {dispositivo.quarto.cortinasAbertas ? 'Fechar Cortinas' : 'Abrir Cortinas'}
          </button>
          <img
            src={cortinas}
            className={`status ${dispositivo.quarto.cortinasAbertas ? 'on' : 'off'}`}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
