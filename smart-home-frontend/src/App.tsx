import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import luz from './imagens/luz.png';
import luzDesligada from './imagens/luzDesligada.png';
import ar from './imagens/ar.png';
import arDesligado from './imagens/arDesligado.png';
import canal1 from './imagens/canal1.png';
import canal2 from './imagens/canal2.png';
import canal3 from './imagens/canal3.png';
import canal4 from './imagens/canal4.png';
import canal5 from './imagens/canal5.png';
import tvDesligada from './imagens/tvDesligada.png';
import geladeira from './imagens/geladeira.png';
import geladeiraFechada from './imagens/geladeiraFechada.png';
import fogao from './imagens/fogao.png';
import ventilador from './imagens/ventilador.png';
import cortinas from './imagens/cortina.png';
import cortinaFechada from './imagens/cortinaFechada.png';

const socket = io('http://localhost:4000');

interface EstadoDispositivo {
  sala: {
    luzOn: boolean,
    arOn: boolean,
    arTemperatura: number, // Alterado para number
    tvOn: boolean,
    tvCanal: number
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
      arTemperatura: 24,
      tvOn: false,
      tvCanal: 1
    },
    cozinha: {
      luzCozinhaOn: false,
      geladeiraOn: false,
      geladeiraTemperatura: 5,
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

  const ajustarAr = (novaTemperaturaAr: number) => {
    if (novaTemperaturaAr >= 18 && novaTemperaturaAr <= 30) {
      socket.emit('ajustarAr', novaTemperaturaAr);
    }
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

  const ajustarTemperaturaGeladeira = (novaTemperaturaGeladeira: number) => {
    socket.emit('ajustarTemperaturaGeladeira', novaTemperaturaGeladeira);
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
      <h3>Sala</h3>
      <div className="sala">
        <div className='luz'>
          <p>Luz</p>
          <button onClick={acenderLuzSala}>
            {dispositivo.sala.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
          </button>
          <div></div>
          <img
            src={dispositivo.sala.luzOn ? luz : luzDesligada}
            className='status'
          />
        </div>

        <div className='ar'>
          <p>Ar-Condicionado</p>
          <button onClick={ligarAr}>
            {dispositivo.sala.arOn ? 'Desligar Ar' : 'Ligar Ar'}
          </button>
          <p>
            Temperatura:
            <input
              type="number"
              value={dispositivo.sala.arTemperatura}
              onChange={(e) => ajustarAr(Number(e.target.value))}
              min="18"
              max="30"
            />
          </p>
          <img
            src={dispositivo.sala.arOn ? ar : arDesligado}
            className='status'
          />
        </div>

        <div className='tv'>
          <p>Televisão</p>
          <button onClick={ligarTV}>
            {dispositivo.sala.tvOn ? 'Desligar Televisão' : 'Ligar Televisão'}
          </button>
          <div className={`status ${dispositivo.sala.tvOn ? 'on' : 'off'}`}>
            {dispositivo.sala.tvOn ? (
              <>
                <div>
                  <p>Canal
                    <select
                      value={dispositivo.sala.tvCanal}
                      onChange={(e) => mudarCanal(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((canal) => (
                        <option key={canal} value={canal}>{`${canal}`}</option>
                      ))}
                    </select>
                  </p>
                </div>
                <div className={`tv-animation canal-${dispositivo.sala.tvCanal}`} />
                <img
                  src={
                    dispositivo.sala.tvCanal === 1 ? canal1 :
                      dispositivo.sala.tvCanal === 2 ? canal2 :
                        dispositivo.sala.tvCanal === 3 ? canal3 :
                          dispositivo.sala.tvCanal === 4 ? canal4 :
                            dispositivo.sala.tvCanal === 5 ? canal5 :
                              ''
                  }
                  alt={`Canal ${dispositivo.sala.tvCanal}`}
                  className='canal-imagem'
                />
              </>
            ) : (
              <img src={tvDesligada} className='status' />
            )}
          </div>

        </div>

      </div>

      {/* Cozinha */}
      <h3>Cozinha</h3>
      <div className="cozinha">
        <div className='luz'>
          <p>Luz</p>
          <button onClick={acenderLuzCozinha}>
            {dispositivo.cozinha.luzCozinhaOn ? 'Desligar Luz' : 'Ligar Luz'}
          </button>
          <div></div>
          <img
            src={dispositivo.cozinha.luzCozinhaOn ? luz : luzDesligada}
            className='status'
          />
        </div>

        <div className='geladeira'>
          <p>Geladeira</p>
          <button onClick={ligarGeladeira}>
            {dispositivo.cozinha.geladeiraOn ? 'Fechar Geladeira' : 'Abrir Geladeira'}
          </button>
          <p>Temperatura
            <input
              type="number"
              value={dispositivo.cozinha.geladeiraTemperatura}
              onChange={(e) => ajustarTemperaturaGeladeira(Number(e.target.value))}
              style={{ width: '50px' }}
            /></p>
          <div className="alerta-geladeira">
            {dispositivo.cozinha.alertaGeladeira && (
              <p style={{ color: 'red' }}>Alerta: A temperatura da geladeira está alta!</p>
            )}
          </div>

          <img
            src={dispositivo.cozinha.geladeiraOn ? geladeira : geladeiraFechada}
            className='status'
          />
        </div>

        <div className='fogao'>
          <p>Fogão</p>
          <button onClick={ligarFogao}>
            {dispositivo.cozinha.fogaoOn ? 'Desligar Fogão' : 'Ligar Fogão'}
          </button>
          <p>
            Potência
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
      <h3>Quarto</h3>
      <div className="quarto">
        <div className='luz'>
          <p>Luz</p>
          <button onClick={acenderLuzQuarto}>
            {dispositivo.quarto.luzQuartoOn ? 'Desligar Luz' : 'Ligar Luz'}
          </button>
          <div></div>
          <img
            src={dispositivo.quarto.luzQuartoOn ? luz : luzDesligada}
            className='status'
          />
        </div>

        <div className='ventilador'>
          <p>Ventilador</p>
          <button onClick={ligarVentilador}>
            {dispositivo.quarto.ventiladorOn ? 'Desligar Ventilador' : 'Ligar Ventilador'}
          </button>
          <p>
            Velocidade
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
          <div></div>
          <img
            src={dispositivo.quarto.cortinasAbertas ? cortinas : cortinaFechada}
            className='status'
          />
        </div>
      </div>
      <footer>
        <p className="rodape">Desenvolvido por Ana Gabriela Lima</p>
      </footer>
    </div>






  );
}

export default App;
