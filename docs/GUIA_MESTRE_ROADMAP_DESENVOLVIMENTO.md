# Plano de Aprendizado e Desenvolvimento: Trilha de Estudos (Fullstack)

## Visão Geral do Roadmap

Este plano foi desenhado para guiar o desenvolvimento do projeto **Trilha de Estudos** do zero até a conclusão do MVP, funcionando como um guia prático passo a passo estilo curso.

Como o desenvolvimento fullstack utilizando **React + TypeScript (Vite)**, **Node.js com TypeScript** e **MySQL** envolve novos conceitos, o projeto foi estruturado em **Metas de Aprendizado e Desenvolvimento**, divididas em documentos de guia individual (`PASSO_XX.md`).

---

## Estrutura de Metas do Projeto

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           TRILHA DE ESTUDOS                             │
│                  Plano de Execução Guiado (Passo a Passo)               │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
       ┌─────────────────────────────┼─────────────────────────────┐
       ▼                             ▼                             ▼
┌──────────────┐              ┌──────────────┐              ┌──────────────┐
│    META 1    │              │    META 2    │              │    META 3    │
│ Setup & Base │ ───────────► │   Catálogo   │ ───────────► │  Sessões de  │
│  Fullstack   │              │ de Conteúdos │              │    Estudo    │
└──────────────┘              └──────────────┘              └──────────────┘
                                                                   │
       ┌─────────────────────────────┬─────────────────────────────┘
       ▼                             ▼
┌──────────────┐              ┌──────────────┐
│    META 4    │              │    META 5    │
│ Histórico de │ ───────────► │ Revisões &   │
│   Estudos    │              │ Painel Final │
└──────────────┘              └──────────────┘
```

---

## Detalhamento das Metas e Documentos Guias

### 🎯 Meta 1: Ambiente, Banco de Dados e Primeiro Hello World Fullstack
**Objetivo:** Configurar as ferramentas de desenvolvimento, criar o banco MySQL local, subir a API Node.js/Express com TypeScript e criar o app React com Vite conectando com o backend.
* **`PASSO_01_SETUP_E_INFRAESTRUTURA.md`** (Guia Principal Inicial)
  * **Conceitos aprendidos:** Node.js, npm, TypeScript no backend, MySQL CLI/Workbench, Vite, componentes React, hooks, CORS e Fetch API.
  * **Entregável:** Aplicação rodando no navegador com o React buscando uma mensagem `/api/ping` no Node.js conectado ao MySQL.

---

### 🎯 Meta 2: Módulo Catálogo de Conteúdos (CRUD de Disciplinas e Tópicos)
**Objetivo:** Modelar as tabelas `disciplinas` e `conteudos` no MySQL, criar os endpoints REST no backend e construir a interface no React para cadastrar e listar disciplinas e seus tópicos.
* **`PASSO_02_BANCO_E_BACKEND_CATALOGO.md`**
  * **Conceitos aprendidos:** Criação de schemas SQL (DDL), Query Builder / ORM (Prisma ou Knex/TypeORM), padrões Controller/Service/Repository em Node.js, rotas REST e validação de dados.
  * **Entregável:** Endpoints de CRUD de Disciplinas e Tópicos testados e operacionais (Postman/Insomnia ou Swagger).
* **`PASSO_03_FRONTEND_CATALOGO_REACT.md`**
  * **Conceitos aprendidos:** Componentes funcionais, props, hooks (`useState`, `useEffect`), CSS, formulários controlados e requisições via Fetch API.
  * **Entregável:** Tela no React listando disciplinas, modal/formulário de cadastro e suporte a hierarquia de tópicos.

---

### 🎯 Meta 3: Registro de Sessões de Estudo
**Objetivo:** Permitir ao usuário registrar as sessões de estudo realizadas, vinculando-as a um conteúdo, com validações de regra de negócio (ex: acertos <= questões).
* **`PASSO_04_REGISTRO_SESSOES_ESTUDO.md`**
  * **Conceitos aprendidos:** Regras de negócio no backend, validação de schema de entrada (Zod ou class-validator), datas e fusos horários no banco, select dependente no React (filtrar tópicos ao selecionar disciplina).
  * **Entregável:** Formulário de registro de estudo 100% funcional com cálculo automático de aproveitamento e validação de erros no React e Node.js.

---

### 🎯 Meta 4: Consultar Estudos Realizados (Histórico com Paginação e Filtros)
**Objetivo:** Construir a tela principal de Histórico de Estudos (`UC-04`), utilizando consulta paginada e filtrada direto no MySQL via backend.
* **`PASSO_05_HISTORICO_ESTUDOS_BACKEND.md`**
  * **Conceitos aprendidos:** Consultas SQL avançadas (JOINs, cláusulas WHERE dinâmicas, LIMIT e OFFSET), contratos de API paginada JSON (`data` e `meta`).
  * **Entregável:** Endpoint `GET /api/sessoes-estudo` aceitando filtros e paginação.
* **`PASSO_06_HISTORICO_ESTUDOS_FRONTEND.md`**
  * **Conceitos aprendidos:** Tabela paginada no React, debounce em campos de busca textual, gerenciamento de estado de tela (loading, empty state, erro), modais de confirmação de exclusão e edição de registro.
  * **Entregável:** Tabela de Histórico de Estudos com paginação server-side, ordenação por colunas, filtros por data/disciplina/atividade, edição e exclusão.

---

### 🎯 Meta 5: Gerenciamento de Revisões e Painel Operacional Final
**Objetivo:** Implementar o agendamento de revisões e integrar o painel inicial com a visão do que estudar no dia a dia.
* **`PASSO_07_REVISOES_E_PAINEL_OPERACIONAL.md`**
  * **Conceitos aprendidos:** Agendamento de datas em JavaScript/TypeScript, visões consolidadas (queries de resumo), finalização do MVP e rotinas de deploy local.
  * **Entregável:** MVP da Trilha de Estudos 100% concluído e funcional.

---

## Como Utilizar Este Guia

1. Inicie executando as instruções do arquivo **`PASSO_01_SETUP_E_INFRAESTRUTURA.md`**.
2. Cada guia traz:
   - **O que vamos aprender nesta etapa.**
   - **Pré-requisitos e conceitos explicados.**
   - **Comandos exatos a serem executados no terminal.**
   - **Código fonte comentado para criar/colar arquivo por arquivo.**
   - **Como testar e validar que a etapa foi concluída.**
3. Ao concluir um arquivo e validar o entregável, avance para o próximo passo da lista.
