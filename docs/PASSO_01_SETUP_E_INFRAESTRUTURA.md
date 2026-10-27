# Passo 1: Setup do Ambiente e Primeiro 'Hello World' Fullstack

**Meta 1 — Etapa 1 de 1**  
**Objetivo:** Configurar as ferramentas fundamentais no seu computador, criar o banco de dados no MySQL, construir o servidor backend Node.js + Express com TypeScript, e inicializar o projeto frontend em React com Vite conectando-se à API.

---

## 1. O que você vai aprender neste passo

* **Node.js e npm:** Como funciona o ambiente de execução JavaScript/TypeScript no servidor e o gerenciador de pacotes.
* **TypeScript no Backend:** Configuração do compilador `tsc` e inicialização de um projeto Node moderno com `ts-node-dev` para recarregamento automático (*live reload*).
* **Express.js:** Como criar uma API HTTP REST básica e definir rotas.
* **MySQL e Driver:** Como conectar seu servidor Node.js ao banco MySQL e testar a conexão.
* **React + Vite:** Como criar uma aplicação React com TypeScript e consumir dados da API com Fetch API.

---

## 2. Pré-requisitos e Instalações

Antes de começar a digitar comandos, você precisará ter instalado em seu computador:

1. **VS Code** (ou outro editor de código de sua preferência).
2. **Node.js (Versão LTS 18 ou 20+):** Faça o download em [nodejs.org](https://nodejs.org/) e instale.
3. **MySQL Server + MySQL Workbench:** Instale a versão Community Server do MySQL (ou via Docker, se preferir). Anote a senha do usuário `root` definida durante a instalação.

---

## 3. Passo a Passo Prático

### Parte A: Preparando a Estrutura de Pastas

Abra o terminal (Prompt de Comando, PowerShell ou Terminal do Linux/Mac) e crie a pasta principal do projeto:

```bash
# Cria a pasta raiz do projeto
mkdir trilha-de-estudos
cd trilha-de-estudos

# Cria subpastas para backend e frontend
mkdir backend
```

---

### Parte B: Construindo o Backend em Node.js com TypeScript

1. Navegue para a pasta `backend`:
   ```bash
   cd backend
   ```

2. Inicialize o projeto Node.js:
   ```bash
   npm init -y
   ```

3. Instale as dependências principais da API:
   ```bash
   npm install express mysql2 dotenv cors
   ```

4. Instale as dependências de desenvolvimento e definições de tipo TypeScript:
   ```bash
   npm install -D typescript @types/node @types/express @types/cors ts-node-dev
   ```

5. Inicialize a configuração do TypeScript:
   ```bash
   npx tsc --init
   ```

6. Abra o arquivo `tsconfig.json` recém-gerado e certifique-se de que as seguintes opções estão ativadas:
   ```json
   {
     "compilerOptions": {
       "target": "es2022",
       "module": "commonjs",
       "rootDir": "./src",
       "outDir": "./dist",
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true
     }
   }
   ```

7. Abra o arquivo `package.json` dentro da pasta `backend` e adicione o script `"dev"` em `"scripts"`:
   ```json
   "scripts": {
     "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
     "build": "tsc"
   }
   ```

8. Crie a pasta de código-fonte `src`:
   ```bash
   mkdir src
   ```

9. Crie o arquivo `.env` na raiz da pasta `backend` para guardar as credenciais de acesso ao MySQL:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=sua_senha_aqui
   DB_NAME=trilha_estudos_db
   ```
   *(Substitua `sua_senha_aqui` pela senha do usuário root do seu MySQL).*

10. Crie o arquivo `src/db.ts` para gerenciar a conexão com o banco de dados:
    ```typescript
    import mysql from 'mysql2/promise';
    import dotenv from 'dotenv';

    dotenv.config();

    export const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    ```

11. Crie o arquivo principal `src/server.ts`:
    ```typescript
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
    ```

---

### Parte C: Criando o Banco de Dados no MySQL

Antes de iniciar a API, abra o **MySQL Workbench** (ou seu cliente SQL preferido) e execute a seguinte instrução para criar a base de dados:

```sql
CREATE DATABASE IF NOT EXISTS trilha_estudos_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Agora, volte ao terminal dentro da pasta `backend` e inicie o servidor:

```bash
npm run dev
```

Você deve ver no terminal:
`🚀 Servidor backend rodando em: http://localhost:3000`

Acesse `http://localhost:3000/api/ping` no navegador. Se retornar o JSON com `status: 'ok'`, o seu backend está 100% funcionando!

---

### Parte D: Criando o Frontend em React + TypeScript com Vite

1. Abra outro terminal na raiz `trilha-de-estudos` (mantenha o backend executando).

2. Crie o projeto React com Vite e TypeScript:

   ```bash
   npm create vite@latest frontend -- --template react-ts
   cd frontend
   npm install
   ```

3. Crie `src/services/api.ts` para concentrar a comunicação HTTP:

   ```typescript
   export type PingResponse = {
     status: string;
     mensagem: string;
     db_test: unknown;
   };

   export async function pingServer(): Promise<PingResponse> {
     const response = await fetch('http://localhost:3000/api/ping');
     if (!response.ok) {
       throw new Error(`Erro HTTP ${response.status}`);
     }
     return response.json() as Promise<PingResponse>;
   }
   ```

4. Substitua o conteúdo de `src/App.tsx`:

   ```tsx
   import { useEffect, useState } from 'react';
   import { pingServer, type PingResponse } from './services/api';

   function App() {
     const [resposta, setResposta] = useState<PingResponse | null>(null);
     const [carregando, setCarregando] = useState(true);
     const [erro, setErro] = useState(false);

     useEffect(() => {
       let ativo = true;
       pingServer()
         .then((dados) => { if (ativo) setResposta(dados); })
         .catch(() => { if (ativo) setErro(true); })
         .finally(() => { if (ativo) setCarregando(false); });
       return () => { ativo = false; };
     }, []);

     return (
       <main style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
         <h1>📚 Trilha de Estudos</h1>
         <h2>Teste de Conexão Fullstack</h2>
         {carregando && <p>Carregando teste da API...</p>}
         {resposta && <section style={{ background: '#e6fffa', padding: '1rem' }}>
           <p><strong>Status:</strong> {resposta.status}</p>
           <p><strong>Mensagem:</strong> {resposta.mensagem}</p>
         </section>}
         {erro && <p role="alert">Não foi possível conectar ao backend na porta 3000.</p>}
       </main>
     );
   }

   export default App;
   ```

5. Execute o frontend:

   ```bash
   npm run dev
   ```

6. Acesse o endereço informado pelo Vite (normalmente `http://localhost:5173`). A tela deverá exibir `status: ok` e a mensagem enviada pela API.

**Conceitos aprendidos:** componentes funcionais, JSX/TSX, `useState`, `useEffect`, Fetch API, tratamento de erros e integração React ↔ Node.js.

---

## 4. Validando o Entregável do Passo 1

1. Certifique-se de que o backend está rodando (`npm run dev` na pasta `backend`).
2. No terminal da pasta `frontend`, inicie a aplicação React:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:5173` no seu navegador.
4. **Resultado esperado:** A tela deverá exibir a caixa verde confirmando o status OK com a mensagem *"API Node.js + TypeScript com MySQL funcionando!"*.

---

## 🏁 Próximo Passo

Parabéns! Sua infraestrutura básica Fullstack com React, Node.js, TypeScript e MySQL está configurada e comunicando-se perfeitamente.

Você está pronto para ir para o **`PASSO_02_BANCO_E_BACKEND_CATALOGO.md`** para criar a modelagem do catálogo de disciplinas e tópicos no MySQL e construir os primeiros endpoints REST reais!
