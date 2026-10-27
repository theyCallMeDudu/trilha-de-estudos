# Projeto: Trilha de Estudos

## Documento inicial de visão de produto e requisitos de negócio

**Versão:** 0.1\
**Status:** Esboço para orientar o primeiro MVP\
**Objetivo:** transformar o controle de estudos em uma aplicação
simples, útil no dia a dia e que possa evoluir sem exigir uma
arquitetura complexa desde o início.

------------------------------------------------------------------------

## 1. Visão do produto

A **Trilha de Estudos** é uma ferramenta pessoal para registrar o que
foi estudado, acompanhar a evolução por assunto e organizar revisões. A
primeira versão deve substituir a parte mais trabalhosa de uma planilha
de acompanhamento, sem tentar virar uma plataforma completa de
concursos.

A aplicação começa com um catálogo de conteúdos independente de edital
ou concurso. A pessoa organiza disciplinas, tópicos e subtópicos,
registra sessões de estudo, acompanha questões feitas e acertos quando
quiser, e agenda revisões. No futuro, esse catálogo poderá ser associado
a diferentes concursos e editais, inclusive com apoio à leitura de PDFs,
sem precisar redesenhar o produto inteiro.

### Princípios do produto

1.  **Começar pequeno:** a primeira versão deve ser útil mesmo com
    cadastro manual dos conteúdos.
2.  **Registrar o estudo, não burocratizar:** preencher uma sessão
    precisa ser rápido.
3.  **Flexibilidade sem complexidade prematura:** não exigir concurso,
    edital, banca ou cargo para cadastrar um conteúdo.
4.  **Histórico confiável:** manter o registro das sessões realizadas,
    sem sobrescrever o passado quando um assunto muda.
5.  **Ajudar a decidir o próximo passo:** destacar conteúdos pendentes
    de estudo ou revisão.
6.  **Automação progressiva:** primeiro automatizar cálculos e datas;
    importação de edital e recomendações inteligentes ficam para depois.
7.  **IA como apoio opcional:** o sistema não deve depender de IA para
    funcionar.

------------------------------------------------------------------------

## 2. Problema que resolve

O acompanhamento em planilhas pode funcionar, mas tende a exigir
manutenção manual: atualizar status, controlar datas de revisão,
calcular indicadores e consultar o que está atrasado. Também é fácil
misturar o planejamento futuro com o histórico do que realmente foi
feito.

A aplicação deve facilitar respostas a perguntas como:

-   Quais conteúdos já estudei e quais ainda não comecei?
-   O que estudei recentemente?
-   Quais revisões estão previstas para hoje ou estão atrasadas?
-   Em quais assuntos tenho feito questões e qual é meu percentual de
    acerto?
-   Quais disciplinas estão ficando para trás?
-   Quanto tempo estou dedicando aos estudos ao longo da semana?
-   O que devo estudar ou revisar na próxima sessão?

O objetivo não é prometer aprovação nem determinar sozinho um plano
perfeito. É tornar o acompanhamento mais consistente e reduzir o esforço
de organização.

------------------------------------------------------------------------

## 3. Público e cenário inicial

**Público inicial:** uma pessoa que estuda para concursos e quer
controlar os conteúdos estudados com uma ferramenta própria.

**Cenário inicial:** uso individual, sem cadastro de outros usuários,
compartilhamento, assinatura ou colaboração.

**Restrição importante:** não será necessário cadastrar bancos de
questões nem armazenar enunciados. O sistema acompanha a prática de
questões por assunto usando contagens e resultados informados pela
pessoa.

O projeto também deve servir como exercício de programação: cada etapa
precisa produzir algo funcional, permitir decisões técnicas conscientes
e ser implementável sem depender de código gerado integralmente por IA.

------------------------------------------------------------------------

## 4. Escopo do MVP

### 4.1 Catálogo de conteúdos

A pessoa poderá criar e organizar conteúdos de estudo em uma hierarquia
simples:

-   **Disciplina:** por exemplo, Língua Portuguesa, Banco de Dados ou
    Engenharia de Software.
-   **Tópico:** por exemplo, SQL ou Modelagem de Dados.
-   **Subtópico:** por exemplo, comandos DDL e DML.

A hierarquia pode permitir que um tópico não tenha subtópicos. O
conteúdo deve continuar utilizável sem que a pessoa informe um concurso.

Cada item de conteúdo poderá ter:

-   nome;
-   descrição ou observações opcionais;
-   item pai, quando fizer parte de outro tópico;
-   posição de exibição;
-   estado ativo ou arquivado.

**Regra de negócio:** arquivar um conteúdo não deve apagar as sessões de
estudo nem as revisões já registradas.

### 4.2 Registro de sessão de estudo

A pessoa poderá registrar uma sessão relacionada a um ou mais conteúdos.

Campos sugeridos:

-   data do estudo;
-   conteúdo estudado;
-   tipo de atividade: teoria, questões, revisão, simulado ou
    leitura/anotação;
-   duração em minutos, opcional;
-   quantidade de questões feitas, opcional;
-   quantidade de acertos, opcional;
-   observações e dificuldades, opcionais.

O preenchimento deve ser rápido. Duração e observações não devem ser
obrigatórias.

**Regras de negócio:**

-   A quantidade de acertos não pode ser maior que a quantidade de
    questões feitas.
-   O percentual de acerto é calculado quando há uma quantidade válida
    de questões.
-   Não se deve obrigar a pessoa a informar questões em uma sessão de
    teoria ou leitura.
-   Uma nova sessão deve acrescentar histórico, e não substituir
    registros anteriores.
-   A data pode ser corrigida quando houver erro de lançamento.

### 4.3 Acompanhamento do conteúdo

A aplicação deve apresentar, para cada conteúdo, uma visão resumida do
progresso.

Informações iniciais:

-   status: não iniciado, em andamento ou estudado;
-   data do último estudo;
-   quantidade acumulada de questões, quando houver;
-   percentual de acertos calculado a partir dos dados disponíveis;
-   próxima revisão prevista, quando houver;
-   observações relevantes.

O status pode ser atualizado automaticamente a partir das sessões, mas a
regra precisa ser simples e explícita. Por exemplo:

-   **Não iniciado:** ainda não há sessão registrada.
-   **Em andamento:** há sessão registrada, mas a pessoa ainda não
    marcou o conteúdo como estudado/concluído.
-   **Estudado:** a pessoa marcou o conteúdo como estudado pelo menos
    uma vez.

É preferível manter o status do conteúdo separado do histórico de
sessões. Assim, a pessoa pode considerar a teoria concluída e continuar
fazendo questões e revisões depois.

### 4.4 Revisões

Ao registrar uma sessão, a pessoa poderá programar uma ou mais revisões
para aquele conteúdo.

Para o MVP, as opções podem ser simples e configuráveis, por exemplo:

-   revisão 1: 1 dia depois;
-   revisão 2: 7 dias depois;
-   revisão 3: 30 dias depois.

Os intervalos devem ser uma configuração do sistema, não uma regra
espalhada pelo código. A pessoa pode ajustar as datas manualmente.

Cada revisão deverá ter:

-   conteúdo relacionado;
-   data prevista;
-   status: pendente, concluída ou dispensada;
-   data de conclusão, quando aplicável;
-   observação opcional.

**Regras de negócio:**

-   Revisões vencidas continuam visíveis até serem concluídas ou
    dispensadas.
-   Concluir uma revisão não apaga a data originalmente prevista.
-   Uma revisão pode gerar uma nova sessão do tipo "revisão".
-   Alterar as configurações futuras de intervalo não deve modificar
    silenciosamente revisões já criadas.
-   No MVP, não é necessário implementar repetição espaçada adaptativa
    ou algoritmo baseado em IA.

### 4.5 Painel inicial

A tela inicial deve responder rapidamente "o que merece minha atenção
hoje?".

Exibir:

-   revisões previstas para hoje;
-   revisões atrasadas;
-   conteúdos ainda não iniciados;
-   últimos conteúdos estudados;
-   resumo semanal de sessões e tempo de estudo, caso a duração seja
    informada;
-   questões feitas e percentual de acertos no período, quando houver
    dados.

O painel não deve ficar cheio de gráficos sem utilidade. Cada indicador
deve ajudar a tomar uma decisão concreta.

### 4.6 Busca e filtros

A pessoa poderá localizar conteúdos por nome e filtrar por:

-   disciplina;
-   status;
-   tipo de atividade registrada;
-   existência de revisão pendente ou atrasada.

A busca deve funcionar mesmo que os conteúdos ainda não estejam
associados a nenhum concurso.

------------------------------------------------------------------------

## 5. Funcionalidades fora do MVP

Os itens abaixo são possibilidades futuras, não compromissos para a
primeira versão.

### 5.1 Concursos, cargos e editais

Permitir cadastrar um concurso, cargo, banca, datas relevantes e edital.
Depois, associar conteúdos do catálogo a um ou mais editais.

Um mesmo conteúdo pode aparecer em concursos diferentes. Evitar duplicar
a definição do conteúdo sempre que possível; a relação com o edital deve
registrar o contexto específico daquele concurso.

### 5.2 Importação e leitura de PDFs

Permitir enviar um edital em PDF e auxiliar na extração dos tópicos
programáticos.

Fluxo futuro sugerido:

1.  A pessoa cria um concurso e envia o edital.
2.  O sistema extrai texto do PDF.
3.  O sistema identifica uma proposta de estrutura de disciplinas,
    tópicos e subtópicos.
4.  A pessoa revisa, corrige e confirma os itens.
5.  Os itens confirmados são adicionados ao catálogo e associados ao
    edital.

**Regra essencial:** conteúdo extraído automaticamente nunca deve ser
publicado como definitivo sem revisão humana. PDFs podem ter tabelas,
colunas, digitalizações e formatações que prejudicam a extração.

A importação deve ser construída somente depois de o cadastro manual e o
acompanhamento estarem funcionando bem. Isso reduz o risco de gastar
tempo com processamento de documentos antes de validar a utilidade
central do produto.

### 5.3 Planejamento de ciclo de estudos

Criar um planejamento semanal com blocos por disciplina, prioridade,
peso e meta de questões. O plano deve sugerir uma distribuição, mas
permitir alterações manuais.

Não é necessário implementar calendário complexo no MVP.

### 5.4 Relatórios e exportação

Possibilidades futuras:

-   exportar dados para CSV ou planilha;
-   relatório de progresso por concurso;
-   comparação de desempenho por disciplina;
-   histórico de revisões concluídas e atrasadas.

### 5.5 Questões e simulados

Não faz parte do escopo inicial cadastrar enunciados, alternativas,
gabaritos ou bancos de questões. Esse trabalho pode ser grande e pouco
vantajoso para a proposta inicial.

Em vez disso, a pessoa informa quantas questões fez e quantas acertou
por sessão ou assunto. Integração com plataformas externas, se algum dia
fizer sentido, deve ser avaliada separadamente.

------------------------------------------------------------------------

## 6. Casos de uso principais

### UC-01 --- Cadastrar uma disciplina

**Ator:** pessoa usuária.

**Objetivo:** criar uma área de conteúdo para organizar os estudos.

**Fluxo principal:** 1. A pessoa abre o catálogo. 2. Escolhe criar
disciplina. 3. Informa o nome e, opcionalmente, uma descrição. 4. Salva.
5. A disciplina aparece na lista e pode receber tópicos.

**Exceções e regras:** - O nome é obrigatório. - A aplicação deve
alertar sobre nomes duplicados muito semelhantes, sem necessariamente
proibir disciplinas com o mesmo nome em contextos diferentes no futuro.

### UC-02 --- Cadastrar tópicos e subtópicos

**Objetivo:** organizar o conteúdo em partes menores.

**Fluxo principal:** 1. A pessoa seleciona uma disciplina ou tópico. 2.
Cria um tópico ou subtópico. 3. Informa o nome e, se quiser, uma
descrição. 4. Salva e visualiza a hierarquia atualizada.

**Regra:** deve ser possível começar com uma estrutura simples e
aprofundar a hierarquia depois, sem obrigar o cadastro de todos os
detalhes de uma vez.

### UC-03 --- Registrar um estudo

**Objetivo:** registrar o que foi feito em uma sessão.

**Fluxo principal:** 1. A pessoa seleciona um conteúdo. 2. Informa data
e tipo de atividade. 3. Preenche, se quiser, duração, quantidade de
questões, acertos e observações. 4. Salva. 5. O histórico do conteúdo e
os indicadores são atualizados.

**Resultado esperado:** a sessão aparece no histórico e passa a
contribuir para os indicadores pertinentes.

### UC-04 --- Consultar o progresso de um conteúdo

**Objetivo:** saber o estado atual de um assunto.

**Fluxo principal:** 1. A pessoa abre o catálogo e seleciona um
conteúdo. 2. Visualiza status, sessões anteriores, questões e acertos
informados e próximas revisões. 3. Pode registrar uma nova sessão ou
alterar o status.

### UC-05 --- Programar revisões

**Objetivo:** evitar depender da memória para lembrar quando revisar.

**Fluxo principal:** 1. Ao registrar um estudo, a pessoa escolhe criar
revisões. 2. O sistema sugere datas com base nos intervalos
configurados. 3. A pessoa confirma ou ajusta as datas. 4. As revisões
aparecem no painel e na página do conteúdo.

### UC-06 --- Concluir uma revisão

**Objetivo:** registrar que uma revisão foi realizada.

**Fluxo principal:** 1. A pessoa abre a lista de revisões pendentes ou
atrasadas. 2. Seleciona uma revisão. 3. Marca como concluída e,
opcionalmente, registra duração, questões ou observações. 4. O sistema
preserva a data prevista e registra a conclusão.

### UC-07 --- Consultar prioridades do dia

**Objetivo:** decidir o próximo estudo sem ter de examinar toda a
planilha.

**Fluxo principal:** 1. A pessoa abre o painel. 2. Visualiza revisões
atrasadas e previstas para hoje. 3. Consulta conteúdos em andamento ou
não iniciados. 4. Escolhe um item e inicia o registro da sessão.

### UC-08 --- Encontrar um conteúdo

**Objetivo:** localizar rapidamente um assunto.

**Fluxo principal:** 1. A pessoa pesquisa por nome ou aplica filtros. 2.
O sistema exibe resultados correspondentes. 3. A pessoa abre o conteúdo
ou registra uma sessão.

------------------------------------------------------------------------

## 7. Requisitos funcionais

  -----------------------------------------------------------------------
  ID                                  Requisito
  ----------------------------------- -----------------------------------
  RF-01                               Cadastrar, editar e arquivar
                                      disciplinas e conteúdos.

  RF-02                               Organizar conteúdos em uma
                                      hierarquia de disciplina, tópico e
                                      subtópico.

  RF-03                               Registrar sessões de estudo
                                      associadas a conteúdos.

  RF-04                               Registrar tipo de atividade, data e
                                      campos opcionais de duração,
                                      questões, acertos e observações.

  RF-05                               Calcular percentual de acertos
                                      quando houver dados suficientes.

  RF-06                               Consultar histórico de sessões por
                                      conteúdo.

  RF-07                               Manter um status de progresso para
                                      cada conteúdo.

  RF-08                               Criar, consultar, concluir e
                                      dispensar revisões.

  RF-09                               Sugerir datas de revisão a partir
                                      de intervalos configuráveis.

  RF-10                               Exibir painel com revisões,
                                      conteúdos e resumo de atividade.

  RF-11                               Pesquisar e filtrar conteúdos.

  RF-12                               Permitir edição manual de datas de
                                      revisão.

  RF-13                               Preservar histórico ao arquivar
                                      conteúdos ou concluir revisões.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 8. Requisitos não funcionais

-   **Usabilidade:** registrar uma sessão comum deve exigir poucos
    campos e poucos passos.
-   **Clareza:** rótulos e mensagens devem usar linguagem simples,
    evitando termos técnicos desnecessários.
-   **Integridade:** impedir valores inválidos, como acertos superiores
    ao número de questões.
-   **Consistência:** indicadores devem ser calculados a partir dos
    registros armazenados, sem duplicar valores manuais
    desnecessariamente.
-   **Evolução:** o modelo deve permitir introduzir concursos e editais
    futuramente sem exigir que todo conteúdo existente seja vinculado a
    um edital.
-   **Privacidade:** por ser uma ferramenta individual, evitar coletar
    dados pessoais desnecessários.
-   **Portabilidade:** considerar exportação dos dados em etapa futura;
    não depender de serviços externos para o funcionamento básico.
-   **Testabilidade:** regras de cálculo e agendamento de revisões devem
    poder ser testadas sem interface gráfica.

------------------------------------------------------------------------

## 9. Modelo conceitual inicial

Este é um modelo de negócio, não uma decisão definitiva de banco de
dados.

### Disciplina

Representa uma grande área de estudo.

Atributos conceituais: nome, descrição, estado ativo/arquivado.

### Conteúdo

Representa um tópico ou subtópico estudável.

Atributos conceituais: nome, descrição, disciplina, conteúdo pai
opcional, ordem de exibição, estado ativo/arquivado e status de
progresso.

### Sessão de estudo

Representa uma atividade realizada em determinado momento.

Atributos conceituais: conteúdo, data, tipo, duração opcional, questões
feitas opcional, acertos opcionais e observações opcionais.

### Revisão

Representa uma revisão programada para um conteúdo.

Atributos conceituais: conteúdo, sessão de origem opcional, data
prevista, status, data de conclusão opcional e observações opcionais.

### Configuração de revisão

Define os intervalos sugeridos para novas revisões.

Atributos conceituais: nome da configuração e lista de intervalos. As
revisões já criadas mantêm suas datas mesmo se a configuração mudar.

### Extensões futuras previstas

-   **Concurso:** representa uma seleção específica.
-   **Edital:** documento e metadados associados a um concurso.
-   **Item de edital:** associa um conteúdo a um edital, com texto
    original, observações e estado de conferência.
-   **Origem do conteúdo:** registra se o conteúdo foi criado
    manualmente ou sugerido pela importação de um edital.

O ponto mais importante é separar o **conteúdo reutilizável** do
**contexto do concurso**. No MVP, a pessoa cadastra conteúdos e estuda
normalmente. No futuro, um concurso poderá selecionar e organizar os
conteúdos relevantes sem tornar o concurso obrigatório para todo
registro.

------------------------------------------------------------------------

## 10. Regras de cálculo iniciais

### Percentual de acertos

Para uma sessão com questões respondidas:

`percentual = acertos / questões feitas × 100`

Quando a quantidade de questões for zero ou não tiver sido informada, o
percentual deve ficar indisponível, e não ser exibido como 0%.

Para um resumo de várias sessões, usar a soma dos acertos dividida pela
soma das questões feitas. Não tirar simplesmente a média dos percentuais
das sessões, pois elas podem ter quantidades diferentes de questões.

### Tempo de estudo

Somar a duração das sessões que tenham duração registrada. Sessões sem
duração não devem ser estimadas nem contabilizadas como zero em
indicadores que pretendam representar tempo real.

### Revisões atrasadas

Uma revisão está atrasada quando sua data prevista é anterior à data
atual e seu status continua pendente.

### Status do conteúdo

O status é uma informação de progresso, não uma prova objetiva de
domínio. Não inferir que a pessoa domina um assunto apenas porque
registrou uma sessão ou atingiu determinado percentual de acertos.

------------------------------------------------------------------------

## 11. Fluxo principal da aplicação

1.  A pessoa cadastra suas disciplinas.
2.  Organiza os conteúdos conforme seu nível de detalhe atual.
3.  Estuda e registra uma sessão.
4.  O sistema atualiza o histórico e os indicadores.
5.  A pessoa programa revisões.
6.  No dia a dia, consulta o painel para escolher uma revisão ou
    conteúdo.
7.  Conforme acumula dados, acompanha seu progresso por assunto.

A importação de edital deverá entrar como uma forma alternativa de criar
e organizar conteúdos, e não como uma dependência do fluxo principal.

------------------------------------------------------------------------

## 12. Plano de implementação incremental

### Etapa 1 --- Catálogo manual

-   Cadastrar e editar disciplinas.
-   Cadastrar tópicos e subtópicos.
-   Listar, pesquisar e visualizar conteúdos.
-   Arquivar itens sem perder histórico.

**Critério de conclusão:** a pessoa consegue reproduzir manualmente a
estrutura de conteúdos de uma planilha.

### Etapa 2 --- Registro de estudo

-   Criar sessões de estudo.
-   Registrar tipo, data e observações.
-   Registrar quantidade de questões e acertos quando aplicável.
-   Exibir histórico e calcular percentuais.

**Critério de conclusão:** a pessoa consegue registrar o que estudou e
consultar o histórico sem editar uma planilha.

### Etapa 3 --- Revisões

-   Configurar intervalos.
-   Criar revisões sugeridas.
-   Editar datas.
-   Concluir ou dispensar revisões.
-   Exibir revisões pendentes e atrasadas.

**Critério de conclusão:** o sistema ajuda a responder o que precisa ser
revisado hoje.

### Etapa 4 --- Painel e filtros

-   Painel inicial.
-   Busca e filtros.
-   Resumo semanal de atividade.
-   Indicadores básicos de progresso.

**Critério de conclusão:** a pessoa consegue decidir o que estudar a
seguir sem navegar por todos os conteúdos.

### Etapa 5 --- Validar antes de expandir

Usar a aplicação em uma rotina real de estudos e anotar o que é
incômodo, confuso ou está faltando. Só então escolher a próxima
funcionalidade.

Possíveis próximos passos: - ciclo semanal de estudos; - exportação para
CSV/planilha; - cadastro de concursos e editais; - importação assistida
de PDF.

------------------------------------------------------------------------

## 13. Critérios de sucesso do MVP

O MVP será considerado útil quando a pessoa conseguir:

-   cadastrar os conteúdos sem precisar criar um concurso;
-   registrar uma sessão de estudo em pouco tempo;
-   consultar o que estudou anteriormente;
-   saber quais revisões estão pendentes e atrasadas;
-   acompanhar questões e acertos sem cadastrar os enunciados;
-   usar a aplicação durante algumas semanas sem precisar manter a mesma
    informação em uma planilha paralela.

O sucesso não será medido pelo número de funcionalidades, mas pela
redução do trabalho manual e pela frequência com que a ferramenta é
realmente utilizada.

------------------------------------------------------------------------

## 14. Decisões deliberadamente adiadas

Para evitar que o projeto cresça antes de entregar valor, não decidir
agora:

-   qual biblioteca ou serviço fará leitura de PDF;
-   se haverá IA para classificar conteúdos;
-   como representar todos os formatos possíveis de edital;
-   se haverá múltiplos usuários;
-   como importar questões de plataformas externas;
-   qual algoritmo avançado de repetição espaçada usar;
-   qual arquitetura de implantação será necessária em produção.

Essas decisões devem ser tomadas quando houver uma necessidade concreta.

------------------------------------------------------------------------

## 15. Orientação para o desenvolvimento

A implementação deve ser guiada por pequenos problemas de negócio. Antes
de escrever código, definir o comportamento esperado e alguns exemplos;
depois implementar a menor solução que satisfaça esses exemplos.

A IA pode ajudar a esclarecer conceitos, sugerir casos de teste ou
revisar uma solução já escrita. Para preservar o aprendizado, evitar
pedir que gere o sistema inteiro de uma vez. Cada etapa deve deixar
claro o que foi construído, por que funciona e quais limitações ainda
existem.

**Próxima ação recomendada:** implementar somente o catálogo manual de
disciplinas, tópicos e subtópicos. Não começar por PDFs, concursos,
autenticação, dashboards elaborados ou integração com IA.

