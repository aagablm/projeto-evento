# Projeto Eventos 

![image](https://github.com/user-attachments/assets/f16acec5-38f7-4d45-8722-dcb5831fe721)


Este projeto simula uma casa inteligente, permitindo o controle remoto de dispositivos através de uma interface web. Com diferentes cômodos, cada um equipado com dispositivos conectados, os usuários podem interagir em tempo real. A comunicação WebSocket é utilizada para refletir as alterações de estado em múltiplos clientes simultaneamente.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#cômodos-e-dispositivos)
- [Cômodos e Dispositivos](#instalação-e-execução)

## Visão Geral

O Projeto Evento foi desenvolvido para facilitar o gerenciamento de eventos. Ele permite que os usuários criem e visualizem eventos, bem como façam alterações conforme necessário.

## Tecnologias Utilizadas
- Node.js
- Express
- Socket.IO
- React
- TypeScript
- Nodemon

## Cômodos e Dispositivos

### Sala de Estar

#### Luzes Inteligentes
- **Comportamento esperado:** O usuário deve poder ligar e desligar as luzes.
- **Estados:** Ligado/Desligado.

#### Televisão
- **Comportamento esperado:** O usuário deve poder ligar e desligar a TV e mudar de canal.
- **Estados:** Ligado/Desligado, Canal (lista de canais disponíveis).

#### Ar-Condicionado
- **Comportamento esperado:** O usuário deve poder ligar e desligar o ar-condicionado e ajustar a temperatura.
- **Estados:** Ligado/Desligado, Temperatura (ajustável de 18°C a 30°C).

### Cozinha

#### Luzes Inteligentes
- **Comportamento esperado:** O usuário deve poder ligar e desligar as luzes.
- **Estados:** Ligado/Desligado.

#### Geladeira Inteligente
- **Comportamento esperado:** Monitorar a temperatura interna da geladeira e alertar o usuário se a temperatura subir além do valor definido.
- **Estados:** Temperatura interna, Alerta (acionado quando acima de 5°C).

#### Fogão Elétrico
- **Comportamento esperado:** O usuário deve poder ligar e desligar o fogão elétrico e ajustar o nível de potência.
- **Estados:** Ligado/Desligado, Potência (ajustável de 1 a 5).

### Quarto

#### Luzes Inteligentes
- **Comportamento esperado:** O usuário deve poder ligar e desligar as luzes.
- **Estados:** Ligado/Desligado.

#### Ventilador Inteligente
- **Comportamento esperado:** O usuário deve poder ligar e desligar o ventilador e ajustar a velocidade.
- **Estados:** Ligado/Desligado, Velocidade (1 a 3).

#### Cortinas Automáticas
- **Comportamento esperado:** O usuário deve poder abrir e fechar as cortinas.
- **Estados:** Aberto/Fechado.

## Instalação e Execução

Para executar o projeto, siga os passos abaixo:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/aagablm/projeto-evento.git
   cd projeto-evento


2. Navegue até a pasta do backend e instale as dependências:

   ```bash
   cd smart-home-backend
   npm install

3. Inicie o servidor backend:
   ```bash
   npm start

O servidor estará disponível em http://localhost:3000 

4. Abra outra janela do terminal e navegue até a pasta do frontend e instale as dependências:
   ```bash
   cd smart-home-frontend
   npm install

5. Inicie o servidor frontend:
   ```bash
   npm start
   
## 🤝 Desenvolvedora

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/aagablm" title="Ana Gabriela Lima">
        <img src="https://avatars.githubusercontent.com/u/97294208?v=4" width="100px;" alt="Foto de Ana Gabriela no GitHub"/><br>
        <sub>
          <b>Ana Gabriela Lima</b>
        </sub>
      </a>
