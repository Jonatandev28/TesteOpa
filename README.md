# Teste Opa! Suite Nível 2

## Visão Geral

Este projeto é uma aplicação web com funcionalidades de **cadastro**, **login** e **troca de mensagens em tempo real** entre usuários cadastrados. Ele foi desenvolvido com:

- **Backend**: Node.js (Express) com MongoDB para armazenamento de dados.
- **Frontend**: React/Next.js.
- **Comunicação em tempo real**: Socket.IO.

---

## Estrutura do Projeto

O projeto está organizado em duas pastas principais:

- **backend/**: Contém a API construída em Node.js.
- **frontend/**: Contém a interface web desenvolvida em React/Next.js.

---

## Funcionalidades Implementadas

### Backend

1. **Cadastro de Usuários**

   - Rota: `/api/register`
   - Método: `POST`
   - Campos: `nome`, `username`, `senha`.
   - Armazenamento: MongoDB.
   - Feedback: Retorna sucesso ou falha.

2. **Autenticação de Usuário**

   - Rota: `/api/login`
   - Método: `POST`
   - Biblioteca: `passport.js` para autenticação.
   - Controle de rotas privadas/públicas.

3. **Chat em Tempo Real**

   - Biblioteca: `socket.io` para mensagens em tempo real.
   - Persistência: Mensagens armazenadas no MongoDB.
     rererrt

4. **Lista de Usuários Online/Offline**
   - Atualização em tempo real usando `socket.io`.
   - Exibição de status (online/offline).

---

### Frontend

1. **Tela de Login**

   - Página para autenticação usando username e senha.
   - Feedback visual em caso de erro.

2. **Tela de Chat**

   - Interface para troca de mensagens em tempo real.
   - Notificações visuais para novas mensagens recebidas.

3. **Lista de Usuários Online/Offline**
   - Exibição do status de cada usuário conectado.

---

## Pré-requisitos

- **Node.js** (v20 ou superior)
- **MongoDB** (Atlas)

---

## Principais Tecnologias Utilizadas

### Frontend

- **Next.js**: Framework React para renderização híbrida e desenvolvimento de aplicações web rápidas e escaláveis.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **Zustand**: Gerenciador de estado leve e flexível.
- **Socket.IO**: Comunicação em tempo real entre cliente e servidor.
- **Shadcn**: Biblioteca de componentes estilizados com suporte ao Tailwind CSS.
- **React Hook Form**: Gerenciamento de formulários com foco em performance.
- **Zod**: Biblioteca de validação de schemas.
- **Lucide Icons**: Conjunto de ícones personalizáveis.

### Backend

- **Node.js**: Ambiente de execução JavaScript para o lado do servidor.
- **Express.js**: Framework minimalista para construção de APIs em Node.js.
- **TypeScript**: Superset do JavaScript para maior segurança e organização do código.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar dados da aplicação.
- **Mongoose**: ODM para interação com o MongoDB.
- **Passport.js**: Biblioteca para autenticação de usuários.
- **Socket.IO**: Comunicação em tempo real entre servidor e cliente.

## Instruções de Instalação e Execução

### Backend

1. Navegar ate a pasta `back`
2. instalar dependências: `npm install`
3. Iniciar o servidor: `npm run dev`

### Frontend

1. Navegar ate a pasta `front`
2. instalar dependências: `npm install --force`
3. Iniciar o servidor: `npm run dev`
4. Estará disponível na URL: `http://localhost:3000` e `http://localhost:3001`, para que seja possível testar o chat.
5. Abrir cada página em um navegador diferente.

## Fotos

<div style="display: flex; gap: 10px; justify-content: space-between; flex-wrap: wrap;">
  <img src="./assets/Screenshot_1.png" alt="Tela login" style="width: 49%; height: auto;">
  <img src="./assets/Screenshot_2.png" alt="Tela de cadastro" style="width: 49%; height: auto;">
  <img src="./assets/Screenshot_3.png" alt="Tela de chat" style="width: 49%; height: auto;">
  <img src="./assets/Screenshot_4.png" alt="Tela de chat 2" style="width: 49%; height: auto;">
</div>

## Considerações Importantes

-- **Para garantir o funcionamento ideal do sistema, recomenda-se utilizar dois navegadores diferentes. Isso evita possíveis conflitos de cookies e problemas na comunicação em tempo real.**

-- **Busquei manter o projeto o mais simples e eficiente possível, com o mínimo de dependências e custos associados ao uso.**

-- **Caso tenha dúvidas ou encontre dificuldades, estou à disposição para ajudar e esclarecer quaisquer questões.**

-- **Se quiser entrar em contato comigo, pode me encontrar no [Linkedin](https://www.linkedin.com/in/leonardo-gomes-3a9b2b21a/) ou pelo [Whatsapp](https://whatsa.me/5549984356670)**
