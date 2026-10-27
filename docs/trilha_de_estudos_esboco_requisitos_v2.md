# Projeto: Trilha de Estudos

## Documento de visão de produto e requisitos de negócio (Versão 2.0)

**Versão:** 2.0  
**Status:** Documento de Requisitos Atualizado e Consolidado  
**Objetivo:** Transformar o controle de estudos em uma aplicação fullstack pessoal simples, útil no dia a dia e capaz de evoluir sem exigir uma arquitetura complexa desde o início.

---

## 1. Visão do produto

A **Trilha de Estudos** é uma ferramenta pessoal para organizar conteúdos de estudo, registrar sessões realizadas, acompanhar a evolução por assunto e gerenciar revisões. A aplicação visa substituir a parte mais trabalhosa de uma planilha de acompanhamento, sem tentar virar uma plataforma complexa de concursos de forma prematura.

O projeto também serve como uma **oportunidade de aprendizado prático de desenvolvimento fullstack**. Por esse motivo, a implementação evolui gradualmente, priorizando decisões técnicas justificadas, escopo controlado e uma arquitetura limpa, familiar e de fácil manutenção.

A aplicação começa como uma ferramenta genérica de organização de estudos, sem depender de um concurso ou edital específico. Futuramente, o sistema poderá receber funcionalidades relacionadas a concursos, editais e importação de conteúdo a partir de arquivos PDF, mantendo a flexibilidade e reuso do catálogo base.

### Princípios do produto

1. **Começar pequeno e funcional:** O MVP deve ser totalmente funcional e útil mesmo com o cadastro manual de conteúdos e sessões.
2. **Registrar sem burocratizar:** O registro de uma sessão de estudo precisa ser simples e rápido, sem exigências de campos irrelevantes para o tipo de atividade.
3. **Flexibilidade sem complexidade prematura:** Não exigir a associação com concurso, edital, banca ou cargo para organizar conteúdos e registrar estudos.
4. **Histórico confiável e imutável:** O histórico de estudos deve ser preservado de forma integra, garantindo que alterações ou arquivamentos no catálogo de conteúdos não destruam o registro do que realmente foi realizado.
5. **Apoio operacional no dia a dia:** Destacar de forma clara o que precisa ser estudado ou revisado no dia a dia.
6. **Automação progressiva:** Automatizar cálculos, prazos e métricas operacionais no MVP; importação de editais e automações complexas ficam para fases posteriores.
7. **IA e integrações como apoio opcional:** O sistema principal não deve depender de IA nem de serviços externos para funcionar perfeitamente.
8. **Não ser um simples CRUD de tarefas:** O foco central do sistema é acompanhar o processo contínuo de aprendizado, permitindo consulta detalhada e análise histórica da preparação.

---

## 2. Problema que resolve

O acompanhamento de estudos por meio de planilhas exige constante manutenção manual: atualizar status, calcular datas de revisão, consolidar percentuais de acerto, reorganizar tópicos e filtrar históricos. Além disso, em planilhas é fácil misturar o planejamento futuro com o histórico imutável do que já foi feito.

A aplicação **Trilha de Estudos** resolve essas dores respondendo prontamente a perguntas como:

- Quais conteúdos já foram estudados, quais estão em andamento e quais ainda não foram iniciados?
- Qual é o histórico completo de sessões de estudo realizadas em um determinado período?
- Quais revisões estão previstas para hoje ou já se encontram atrasadas?
- Em quais assuntos foram feitas questões e qual é o aproveitamento acumulado?
- Quais disciplinas estão recebendo menos atenção e ficando para trás?
- Quanto tempo efetivo de estudo foi dedicado ao longo da semana?
- Qual é o detalhe, observação ou taxa de acerto de uma sessão específica realizada no passado?

O objetivo não é prometer aprovação automática, mas garantir consistência, reduzir o esforço operacional de organização e fornecer um histórico confiável de consulta.

---

## 3. Público, cenário e premissas

* **Público inicial:** A própria pessoa desenvolvedora/estudante, utilizando o sistema para organizar e acompanhar sua rotina diária de estudos.
* **Cenário de uso:** Aplicação pessoal e de uso individual. No MVP, não há necessidade de suporte a múltiplos usuários, autenticação complexa, multi-tenancy ou compartilhamento social.
* **Restrição de escopo de questões:** O sistema não atuará como banco de questões e não armazenará enunciados ou alternativas. O acompanhamento da resolução de questões é feito exclusivamente por contagens informadas (questões feitas e acertos).
* **Foco no aprendizado prático:** O projeto é estruturado para permitir o desenvolvimento incremental de uma aplicação fullstack real, onde cada fase entrega valor de negócio e consolida conhecimentos de arquitetura e programação.

---

## 4. Stack tecnológica e decisões de arquitetura

Para manter o foco no aprendizado prático e evitar complexidade desnecessária, a stack tecnológica foi definida com base em tecnologias sólidas, modernas e amplamente utilizadas no mercado.

### Stack definida

* **Frontend:** React com TypeScript (Vite).
* **Backend:** Node.js com TypeScript.
* **Banco de Dados:** MySQL (banco de dados relacional principal; a utilização de PostgreSQL está descartada nesta fase).
* **API:** RESTful via HTTP, utilizando JSON como formato de troca de dados.
* **Persistência de Dados (Backend):** Solução de ORM ou Query Builder compatível com Node.js e MySQL (ex.: Prisma, TypeORM ou Knex.js), visando produtividade e segurança contra SQL Injection sem introduzir complexidade desnecessária.
* **Testes:** Ferramenta compatível com o ecossistema TypeScript/Node/React (ex.: Vitest no backend e Vitest + React Testing Library no frontend), com escolha e configuração final definidas no planejamento técnico.

### Diretrizes de Arquitetura e Simplificação

1. **Monolito Simples / Arquitetura Camada Única:** O backend será desenvolvido como uma aplicação única (monolito modular), evitando microserviços, filas de mensageria (RabbitMQ, Kafka), caches distribuídos (Redis) ou arquiteturas orientadas a eventos no MVP.
2. **Tipagem Compartilhada/Consistente:** O uso de TypeScript tanto no frontend quanto no backend garante consistência nos contratos de dados e modelos da aplicação.
3. **Processamento Server-side para Listagens:** Operações de paginação, ordenação e filtragem do histórico de estudos **devem obrigatoriamente ser executadas no backend** via consultas otimizadas ao MySQL, evitando carregar grandes volumes de dados para o navegador.
4. **Avanços Futuros e Decisões Pendentes:** Qualquer tecnologia adicional (IA, autenticação JWT/OAuth, Docker avançado, bibliotecas de parsing de PDF) permanece classificada como decisão pendente ou evolução futura, sem poluir o escopo inicial.

---

## 5. Descrição detalhada do escopo funcional

### 5.1 Catálogo de conteúdos

Permite criar e organizar as áreas de conhecimento em uma hierarquia flexível de até 3 níveis:

* **Disciplina:** Grande área do conhecimento (ex.: *Língua Portuguesa*, *Banco de Dados*, *Engenharia de Software*).
* **Tópico:** Divisão da disciplina (ex.: *SQL*, *Modelagem de Dados*).
* **Subtópico:** Subdivisão opcional do tópico (ex.: *Comandos DDL e DML*).

**Atributos do Conteúdo:** Nome, descrição/observação opcional, vínculo com conteúdo pai (para tópicos/subtópicos), ordem de exibição e estado (ativo ou arquivado).

**Regra de Negócio de Arquivamento:** O arquivamento de uma disciplina ou conteúdo oculta o item das listas ativas de seleção, mas **preserva integralmente** todas as sessões de estudo e revisões registradas no histórico.

### 5.2 Registro de sessão de estudo

Permite registrar individualmente cada atividade de estudo realizada.

**Campos da Sessão:**
* Data do estudo (obrigatória, padrão para o momento atual, editável).
* Conteúdo estudado (obrigatório).
* Tipo de atividade (obrigatório: *Teoria*, *Questões*, *Revisão*, *Simulado*, *Leitura/Anotação*).
* Duração em minutos (opcional).
* Quantidade de questões feitas (opcional).
* Quantidade de acertos (opcional).
* Observações e dificuldades encontradas (opcional).

**Regras de Negócio:**
* A quantidade de acertos não pode ser superior à quantidade de questões feitas.
* Não é obrigatório preencher quantidade de questões ou acertos para atividades teóricas ou leituras.
* O percentual de acerto é calculado automaticamente apenas quando houver quantidade válida de questões (> 0).
* Cada registro gera uma nova linha imutável no histórico (não sobrescreve sessões passadas).

### 5.3 Consultar estudos realizados (Histórico de estudos)

Funcionalidade dedicada para consulta, filtragem, visualização detalhada, edição e exclusão de todas as sessões de estudo registradas no sistema.

**Interface Tabela Principais Colunas:**
1. Data do estudo.
2. Disciplina.
3. Assunto / Conteúdo estudado.
4. Tipo de atividade (*Teoria*, *Questões*, *Revisão*, etc.).
5. Duração.
6. Quantidade de questões (quando aplicável).
7. Quantidade de acertos / Aproveitamento (%) (quando aplicável).
8. Observação resumida.
9. Ações (Visualizar Detalhes, Editar, Excluir).

**Recursos e Regras Obrigatórias da Tabela:**
* **Paginação Server-side:** Navegação por páginas com controle de itens por página.
* **Ordenação Server-side:** Permitir ordenação por colunas relevantes (Data, Disciplina, Duração, Aproveitamento), com a **Data do Estudo (mais recente primeiro)** como ordenação padrão.
* **Filtros Server-side:**
  * Intervalo de datas (data inicial e data final).
  * Disciplina.
  * Assunto / Conteúdo estudado.
  * Tipo de atividade.
* **Pesquisa Textual:** Busca por palavra-chave nas observações ou títulos de conteúdo.
* **Limpar Filtros:** Botão para redefinir rapidamente todos os filtros aplicados.
* **Estados da Interface:** Tratamento explícito para estado de carregamento (*loading*), ausência de resultados para os filtros aplicados (*empty search result*) e ausência de registros cadastrados no sistema (*empty state*).
* **Ações por Registro:**
  * **Detalhes:** Modal ou tela com os dados completos da sessão.
  * **Editar:** Permite corrigir dados lançados incorretamente, recalculando automaticamente os indicadores derivados.
  * **Excluir:** Remove a sessão mediante confirmação prévia, atualizando o histórico e reciclando os indicadores derivados afetados.
* **Preservação de Histórico:** Sessões associadas a conteúdos arquivados permanecem listadas normalmente na tabela de histórico.
* **Acesso Rápido:** Botão de atalho visível para registrar uma nova sessão de estudo.

### 5.4 Acompanhamento e status do conteúdo

Visão consolidada do progresso para cada item do catálogo de conteúdos:
* **Status de Progresso:** *Não iniciado* (sem sessões), *Em andamento* (possui sessões, mas não concluído) ou *Estudado* (marcado explicitamente como concluído pela pessoa).
* Data do último estudo realizado.
* Total acumulado de questões feitas e acertos.
* Percentual de aproveitamento global do conteúdo.
* Próxima revisão prevista.

O status do conteúdo é mantido de forma independente do histórico, permitindo que a pessoa conclua a etapa teórica do conteúdo mas continue registrando sessões de questões e revisões.

### 5.5 Gerenciamento de revisões

Permite agendar, acompanhar e concluir revisões associadas aos conteúdos estudados.

**Opções de Agendamento:**
* Sugestão automática de prazos com base em intervalos configuráveis no sistema (ex.: R1 em 1 dia, R2 em 7 dias, R3 em 30 dias).
* Permissão para ajuste manual de datas pelo usuário.

**Atributos da Revisão:** Conteúdo associado, sessão de origem (opcional), data prevista, status (*Pendente*, *Concluída*, *Dispensada*), data de conclusão e observações.

**Regras de Negócio:**
* Revisões vencidas continuam em destaque até serem concluídas ou dispensadas.
* A conclusão de uma revisão registra a data real em que ocorreu, mantendo a data originalmente prevista para histórico.
* Concluir uma revisão pode opcionalmente gerar uma nova sessão de estudo do tipo *Revisão*.
* Alterações em configurações globais de intervalos não afetam retroativamente revisões já agendadas.

### 5.6 Painel inicial (Visão Operacional do MVP)

O painel inicial é focado em suporte à decisão diária ("O que devo estudar/revisar hoje?"):
* Lista de revisões previstas para a data atual.
* Alertas de revisões atrasadas.
* Destaque de conteúdos em andamento e sugestão de conteúdos não iniciados.
* Últimas sessões de estudo registradas.
* Resumo operacional simples da semana: total de horas estudadas e total de questões resolvidas no período.

---

## 6. Funcionalidades futuras e evoluções (Fora do MVP)

### 6.1 Dashboards analíticos e inteligência de dados

Dashboards analíticos complexos **não fazem parte do MVP**. O foco inicial é garantir a qualidade da coleta dos dados de estudo. Futuramente, poderão ser implementados gráficos e visões analíticas tais como:
* Evolução de horas estudadas por semana, mês e ano.
* Histórico de quantidade de sessões realizadas ao longo do tempo.
* Gráfico de distribuição do tempo de estudo por disciplina e por tipo de atividade.
* Gráficos de tendência de desempenho em questões e evolução da taxa de acertos.
* Matriz de cobertura de edital (conteúdos não iniciados vs. em andamento vs. concluídos).
* Taxa de cumprimento do cronograma de revisões (revisões realizadas no prazo vs. atrasadas).
* Comparativo de desempenho entre diferentes períodos de estudo.

### 6.2 Gestão de concursos, cargos e editais

* Cadastro de concursos, bancas organizadoras e cargos.
* Mapeamento dos conteúdos do catálogo global para os tópicos de um edital específico.
* Acompanhamento de progresso percentual de cobertura de um edital.

### 6.3 Importação e parsing de editais em PDF

* Upload de arquivos de edital em PDF.
* Extração automatizada de texto e proposta de estrutura de disciplinas/tópicos.
* Interface de conferência e revisão humana obrigatória antes da importação definitiva para o catálogo.

### 6.4 Ciclos e planos de estudo automatizados

* Montagem de ciclos de estudo baseados em peso das disciplinas e nível de facilidade/dificuldade do estudante.
* Alocação automática de blocos de tempo no calendário.

---

## 7. Atualização dos casos de uso

### UC-01 --- Cadastrar e gerenciar disciplinas
* **Ator:** Pessoa usuária.
* **Descrição:** Permitir a criação, edição e arquivamento de disciplinas no catálogo.
* **Fluxo Principal:** 
  1. O usuário acessa o catálogo de conteúdos.
  2. Seleciona a opção de criar nova disciplina.
  3. Informa o nome e a descrição opcional.
  4. O sistema valida os dados e salva a disciplina.
* **Resultado Esperado:** Disciplina cadastrada e disponível para receber tópicos.

### UC-02 --- Cadastrar e gerenciar tópicos e subtópicos
* **Ator:** Pessoa usuária.
* **Descrição:** Estruturar o conteúdo de uma disciplina em tópicos e subtópicos hierárquicos.
* **Fluxo Principal:**
  1. O usuário seleciona uma disciplina ou tópico existente.
  2. Adiciona um novo tópico ou subtópico associado.
  3. Preenche nome, descrição opcional e ordem de exibição.
  4. O sistema valida e atualiza a árvore de conteúdos.
* **Resultado Esperado:** Hierarquia de conteúdos atualizada.

### UC-03 --- Registrar sessão de estudo
* **Ator:** Pessoa usuária.
* **Descrição:** Lançar uma nova atividade de estudo realizada.
* **Fluxo Principal:**
  1. O usuário seleciona o conteúdo estudado (ou acessa a partir de um atalho).
  2. Informa a data, tipo de atividade e preenche opcionalmente duração, questões e acertos.
  3. Salva a sessão.
  4. O sistema valida que `acertos <= questoes`, grava a sessão e atualiza o status/indicadores do conteúdo.
* **Resultado Esperado:** Nova sessão registrada no histórico imutável.

### UC-04 --- Consultar estudos realizados (Histórico)
* **Ator:** Pessoa usuária.
* **Descrição:** Consultar, filtrar, paginar, visualizar detalhes, editar e excluir registros do histórico de estudos.
* **Pré-condição:** Acesso à funcionalidade de histórico/estudos realizados.
* **Fluxo Principal:**
  1. O usuário acessa a tela de *Histórico de Estudos*.
  2. O sistema consulta o backend e exibe a tabela paginada com a ordenação padrão (Data mais recente primeiro).
  3. O usuário pode aplicar filtros (período, disciplina, conteúdo, tipo de atividade) ou realizar busca textual.
  4. O sistema executa a consulta filtrada no MySQL e atualiza a listagem e a paginação.
  5. O usuário pode clicar em um registro para **Visualizar Detalhes**.
  6. O usuário pode acionar a **Edição** de uma sessão, alterar os dados e salvar; o sistema atualiza o registro e recalculou os indicadores.
  7. O usuário pode acionar a **Exclusão** de uma sessão; o sistema solicita confirmação, remove o registro do banco de dados e recalcula os indicadores derivados.
* **Resultado Esperado:** Consulta eficiente do histórico com capacidade total de manutenção dos registros.

### UC-05 --- Consultar o progresso de um conteúdo
* **Ator:** Pessoa usuária.
* **Descrição:** Analisar a situação e o acumulado de um conteúdo específico.
* **Fluxo Principal:**
  1. O usuário navega pelo catálogo e seleciona um conteúdo.
  2. O sistema apresenta o status atual (*Não iniciado*, *Em andamento*, *Estudado*), total de sessões, taxa de acertos em questões e próxima revisão agendada.
  3. O usuário pode alterar manualmente o status de conclusão do conteúdo.
* **Resultado Esperado:** Visão clara do nível de cobertura daquele conteúdo.

### UC-06 --- Programar e gerenciar revisões
* **Ator:** Pessoa usuária.
* **Descrição:** Configurar prazos e gerar agendamentos de revisão para os conteúdos.
* **Fluxo Principal:**
  1. Após registrar um estudo, o sistema sugere a criação de revisões com base nos intervalos padrão.
  2. O usuário confirma ou ajusta manualmente as datas das revisões.
  3. O sistema grava as revisões no status *Pendente*.
* **Resultado Esperado:** Agenda de revisões atualizada.

### UC-07 --- Concluir ou dispensar revisão
* **Ator:** Pessoa usuária.
* **Descrição:** Registrar a realização ou dispensa de uma revisão agendada.
* **Fluxo Principal:**
  1. O usuário acessa a lista de revisões (no painel inicial ou na aba de revisões).
  2. Seleciona a revisão desejada e marca como *Concluída* ou *Dispensada*.
  3. Opcionalmente, registra uma nova sessão de estudo associada à revisão realizada.
* **Resultado Esperado:** Status da revisão atualizado mantendo a data original prevista registrada.

### UC-08 --- Consultar visão operacional do dia
* **Ator:** Pessoa usuária.
* **Descrição:** Visualizar pendências imediatas e decidir a próxima atividade de estudo.
* **Fluxo Principal:**
  1. O usuário acessa o Painel Inicial.
  2. O sistema lista revisões atrasadas, revisões do dia e atalhos para conteúdos em andamento.
  3. O usuário clica na atividade desejada para registrar a sessão de estudo.
* **Resultado Esperado:** Orientação rápida para o planejamento diário de estudos.

---

## 8. Requisitos funcionais (RF) e não funcionais (RNF)

### Requisitos funcionais

| ID | Requisito |
| :--- | :--- |
| **RF-01** | Cadastrar, editar, consultar e arquivar disciplinas, tópicos e subtópicos. |
| **RF-02** | Manter a estrutura hierárquica de conteúdos em até 3 níveis (Disciplina -> Tópico -> Subtópico). |
| **RF-03** | Registrar sessões de estudo com data, conteúdo, tipo de atividade e campos opcionais de duração, questões, acertos e observação. |
| **RF-04** | Validar que a quantidade de acertos é menor ou igual à quantidade de questões informada. |
| **RF-05** | Consultar a listagem de estudos realizados em tabela paginada, ordenável e com suporte a filtros server-side. |
| **RF-06** | Permitir busca por palavra-chave, filtro por período (data inicial/final), disciplina, conteúdo e tipo de atividade no histórico de estudos. |
| **RF-07** | Permitir visualizar detalhes, editar e excluir sessões de estudo registradas, mediante confirmação prévia para exclusão. |
| **RF-08** | Manter o histórico de estudos totalmente acessível mesmo quando o conteúdo ou disciplina correspondente estiver arquivado. |
| **RF-09** | Manter e permitir atualização manual do status de progresso de cada conteúdo (*Não iniciado*, *Em andamento*, *Estudado*). |
| **RF-10** | Agendar, consultar, editar, concluir e dispensar revisões para os conteúdos. |
| **RF-11** | Sugerir datas de revisão com base em intervalos configuráveis no sistema. |
| **RF-12** | Apresentar um painel operacional com revisões do dia, revisões atrasadas e resumo simples de tempo e questões da semana. |
| **RF-13** | Recalcular automaticamente indicadores de aproveitamento acumulado ao editar ou excluir sessões de estudo. |

### Requisitos não funcionais

| ID | Requisito |
| :--- | :--- |
| **RNF-01** | **Performance e Paginação:** Consultas de histórico, ordenação e filtros devem ser processadas no banco MySQL via backend. Não carregar todos os registros no frontend para filtragem local. |
| **RNF-02** | **Simplicidade de Arquitetura:** O backend deve ser construído como uma API REST monolítica em Node.js e TypeScript, e o frontend em React, sem adicionar microserviços ou mensageria. |
| **RNF-03** | **Usabilidade e Feedback:** A interface da tabela de histórico deve fornecer feedback visual para estados de carregamento (*loading*), pesquisas sem retorno e ausência de dados cadastrados. |
| **RNF-04** | **Integridade de Dados:** Garantir chaves estrangeiras e relacionamentos adequados no MySQL para evitar a perda indevida do histórico de sessões em caso de exclusão/arquivamento de conteúdos. |
| **RNF-05** | **Manutenibilidade e Tipagem:** Utilizar TypeScript de ponta a ponta (React no frontend e Node.js no backend) compartilhando a definição das interfaces de dados. |
| **RNF-06** | **Testabilidade:** As regras de negócio críticas (cálculo de aproveitamento, validação de questões/acertos, regras de agendamento de revisão) devem ser isoladas e testáveis de forma automatizada. |

---

## 9. Modelo de dados e regras de negócio

### Modelo conceitual de dados (MySQL)

#### Tabela: `disciplinas`
* `id`: INT / BIGINT (PK, Auto-increment)
* `nome`: VARCHAR(100) (NOT NULL)
* `descricao`: TEXT (NULL)
* `ativo`: BOOLEAN (DEFAULT TRUE)
* `created_at` / `updated_at`: TIMESTAMP

#### Tabela: `conteudos`
* `id`: INT / BIGINT (PK, Auto-increment)
* `disciplina_id`: INT / BIGINT (FK -> disciplinas.id, NOT NULL)
* `conteudo_pai_id`: INT / BIGINT (FK -> conteudos.id, NULL - para tópicos/subtópicos)
* `nome`: VARCHAR(150) (NOT NULL)
* `descricao`: TEXT (NULL)
* `ordem`: INT (DEFAULT 0)
* `status_progresso`: ENUM('NAO_INICIADO', 'EM_ANDAMENTO', 'ESTUDADO') (DEFAULT 'NAO_INICIADO')
* `ativo`: BOOLEAN (DEFAULT TRUE)
* `created_at` / `updated_at`: TIMESTAMP

#### Tabela: `sessoes_estudo`
* `id`: INT / BIGINT (PK, Auto-increment)
* `conteudo_id`: INT / BIGINT (FK -> conteudos.id, RESTRICT/SET NULL - preserva histórico)
* `data_estudo`: DATETIME (NOT NULL)
* `tipo_atividade`: ENUM('TEORIA', 'QUESTOES', 'REVISAO', 'SIMULADO', 'LEITURA_ANOTACAO') (NOT NULL)
* `duracao_minutos`: INT (NULL)
* `questoes_feitas`: INT (NULL)
* `questoes_acertos`: INT (NULL)
* `observacoes`: TEXT (NULL)
* `created_at` / `updated_at`: TIMESTAMP

#### Tabela: `revisoes`
* `id`: INT / BIGINT (PK, Auto-increment)
* `conteudo_id`: INT / BIGINT (FK -> conteudos.id, NOT NULL)
* `sessao_origem_id`: INT / BIGINT (FK -> sessoes_estudo.id, NULL)
* `data_prevista`: DATE (NOT NULL)
* `data_conclusao`: DATE (NULL)
* `status`: ENUM('PENDENTE', 'CONCLUIDA', 'DISPENSADA') (DEFAULT 'PENDENTE')
* `observacoes`: TEXT (NULL)
* `created_at` / `updated_at`: TIMESTAMP

#### Tabela: `configuracoes_revisao`
* `id`: INT / BIGINT (PK, Auto-increment)
* `nome`: VARCHAR(50) (NOT NULL)
* `dias_intervalo`: INT (NOT NULL)
* `ativo`: BOOLEAN (DEFAULT TRUE)

### Contrato da API para Histórico de Estudos (`GET /api/sessoes-estudo`)

**Parâmetros de Consulta (Query Params):**
* `page`: número da página (padrão: 1)
* `limit`: número de itens por página (padrão: 10 ou 20)
* `sort_by`: campo para ordenação (ex.: `data_estudo`, `duracao_minutos`, `questoes_feitas`)
* `order`: sentido da ordenação (`asc` ou `desc`, padrão: `desc`)
* `data_inicio`: filtro por data inicial (`YYYY-MM-DD`)
* `data_fim`: filtro por data final (`YYYY-MM-DD`)
* `disciplina_id`: filtro por ID da disciplina
* `conteudo_id`: filtro por ID do conteúdo
* `tipo_atividade`: filtro por tipo de atividade
* `busca`: termo de pesquisa textual

**Exemplo de Resposta JSON:**
```json
{
  "data": [
    {
      "id": 105,
      "data_estudo": "2026-10-20T14:30:00Z",
      "disciplina": { "id": 2, "nome": "Banco de Dados" },
      "conteudo": { "id": 12, "nome": "Comandos DDL e DML" },
      "tipo_atividade": "QUESTOES",
      "duracao_minutos": 45,
      "questoes_feitas": 20,
      "questoes_acertos": 17,
      "aproveitamento_percentual": 85.0,
      "observacoes": "Dificuldade na sintaxe do ALTER TABLE no MySQL."
    }
  ],
  "meta": {
    "total_records": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

---

## 10. Regras de cálculo e tratamento de dados

1. **Percentual de Aproveitamento por Sessão:**
   $$	ext{Aproveitamento (\%)} = \left( rac{	ext{questoes\_acertos}}{	ext{questoes\_feitas}} 
ight) 	imes 100$$
   * Se `questoes_feitas` for nulo ou igual a zero, a taxa de aproveitamento deve ser retornada como **indisponível / N/A** (não exibir 0%).
2. **Aproveitamento Acumulado por Conteúdo ou Período:**
   $$	ext{Aproveitamento Geral (\%)} = \left( rac{\sum 	ext{questoes\_acertos}}{\sum 	ext{questoes\_feitas}} 
ight) 	imes 100$$
   * É vedado calcular o aproveitamento acumulado tirando a média aritmética simples dos percentuais das sessões, pois isso causaria distorções matemáticas.
3. **Soma do Tempo Dedicado:**
   * Somar exclusivamente os valores do campo `duracao_minutos` das sessões em que o campo foi preenchido.
4. **Preservação de Relacionamentos:**
   * A exclusão de um conteúdo no banco de dados deve ser tratada preferencialmente com **Soft Delete** (`ativo = false`) ou mantida com `RESTRICT/SET NULL` para proibir a exclusão em cascata das sessões de estudo registradas.

---

## 11. Plano de implementação incremental por fases

1. **Fase 1: Setup e Infraestrutura Base**
   * Configuração do repositório, ambiente Node.js com TypeScript, projeto React com Vite e banco de dados MySQL.
   * Criação do esquema de banco de dados inicial e conexão do ORM/Query Builder.
2. **Fase 2: Catálogo de Disciplinas e Conteúdos**
   * Implementação das APIs e telas para cadastro, edição, listagem e arquivamento de disciplinas, tópicos e subtópicos.
3. **Fase 3: Registro de Sessões de Estudo**
   * Implementação do formulário de registro de sessão com validações de campos e gravação no MySQL.
4. **Fase 4: Tela de Histórico de Estudos (Consultar Estudos Realizados)**
   * Implementação da consulta paginada no backend com suporte a ordenação e múltiplos filtros.
   * Construção da tabela no React com paginação, ordenação por colunas, filtros, busca, detalhes, edição e exclusão de registros.
5. **Fase 5: Gerenciamento de Revisões**
   * Implementação da lógica de agendamento automático de revisões com base nos intervalos configurados.
   * Listagem de revisões pendentes/atrasadas e fluxo de conclusão/dispensa.
6. **Fase 6: Visão Operacional Simples do Painel Inicial**
   * Construção do painel inicial integrando as pendências do dia, revisões atrasadas e os consolidados semanais simples.
7. **Fase 7: Validação E2E, Refinamentos e Ajustes de Usabilidade**
   * Testes integrados dos fluxos principais, tratamento de exceções, refinamento visual e correção de inconsistências.
8. **Fase 8: Evoluções Futuras (Pós-MVP)**
   * Planejamento de dashboards analíticos, módulos de concurso/edital e importação assistida de PDFs.

---

## 12. Resumo das principais mudanças em relação à versão original (v1)

1. **Definição Clara da Stack Tecnológica:** Formalização da stack fullstack composta por **React (TypeScript + Vite)** no frontend, **Node.js (TypeScript)** no backend e **MySQL** como banco de dados relacional.
2. **Nova Funcionalidade Explicita - Consultar Estudos Realizados:** Inclusão detalhada do caso de uso `UC-04` e da especificação técnica completa da tela de histórico de estudos com tabela, paginação, filtros, ordenação, busca textual, detalhes, edição e exclusão de registros.
3. **Processamento Server-side Obrigatório:** Determinação arquitetural para que paginação, filtros e ordenação do histórico de estudos sejam obrigatoriamente processados no backend MySQL via API REST, estabelecendo o contrato de API em formato JSON.
4. **Isolamento de Dashboards Analíticos:** Separação explícita entre a **visão operacional simples do MVP** e os **dashboards analíticos gráficos**, que foram formalmente reclassificados como evolução futura pós-MVP.
5. **Aprimoramento do Modelo de Dados:** Evolução das tabelas conceituais para MySQL com suporte a imutabilidade do histórico e preservação de dados diante do arquivamento de conteúdos.
6. **Reorganização das Fases de Desenvolvimento:** Reestruturação do plano de implementação em 8 fases claras e incrementais, priorizando o entregável funcional básico do sistema.
