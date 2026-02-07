# Shop365 — Lista de Produtos e Carrinho

Projeto desenvolvido como **prática** na **29ª Mentoria ao Vivo (04/02/2026)**, ministrada por **Nicholas Macedo**, dentro da **Trilha 02 — HTML, CSS e JavaScript**, que faz parte do **Curso de Desenvolvimento Web da DEVStart em parceria com a LAB365**.  
Fase 07 | Temas 69–72 — DOM: operações, eventos e fetch

O objetivo do projeto é consolidar conceitos fundamentais de **manipulação do DOM**, **eventos**, **estado global**, **persistência com localStorage** e **consumo de API**, utilizando apenas **HTML, CSS e JavaScript puro (Vanilla JS)**.

## Objetivo do Desafio

Completar a aplicação de e-commerce simples contendo:

- Listagem dinâmica de produtos  
- Carrinho de compras funcional  
- Controle de quantidade  
- Cálculo automático do total  
- Persistência dos dados no navegador  
- Interface moderna e responsiva  

## Funcionalidades

### Produtos
- Consumo de produtos via `fetch` da API https://dummyjson.com/products  
- Renderização dinâmica da lista de produtos  
- Exibição de imagem, nome, marca/categoria e preço  
- Ação de adicionar ao carrinho via modal  

### Carrinho de Compras
- Adicionar produtos com quantidade personalizada  
- Incrementar e decrementar quantidade  
- Remover itens individualmente  
- Resetar carrinho completo  
- Cálculo automático do valor total  
- Persistência dos dados com `localStorage`  

### Modal e Feedback
- Modal para adicionar produto ao carrinho  
- Modal de confirmação para finalizar compra  
- Toast de feedback visual (produto adicionado, compra finalizada, etc.)  

### Responsividade
- Layout adaptado para desktop, tablet e mobile  
- Carrinho fixo no desktop e integrado ao fluxo no mobile  

## Conceitos Trabalhados

- Manipulação do DOM com JavaScript  
- Eventos (click, submit, etc.)  
- Modularização com ES Modules  
- Gerenciamento de estado global  
- Observer pattern (subscribe / notify)  
- Fetch API  
- LocalStorage  
- Separação de responsabilidades (UI, Store, Utils)  
- CSS moderno com variáveis (Design System)  

## Estrutura do Projeto

📁 projeto  
├── index.html        # Estrutura principal da aplicação  
├── style.css         # Estilos globais e responsividade  
├── script.js         # Ponto de entrada da aplicação  
├── api.js            # Consumo da API de produtos  
├── ui.js             # Renderização da lista e modais  
├── cartUI.js         # Interface do carrinho  
├── cartStore.js      # Estado global do carrinho  
└── utils.js          # Funções utilitárias (modal, toast, moeda)  

## Como Executar o Projeto

1. Clone ou baixe o repositório  
2. Abra o arquivo `index.html` em um navegador moderno (Chrome, Edge ou Firefox)  
3. Não é necessário servidor ou build — projeto 100% frontend  

Para evitar problemas com ES Modules, recomenda-se usar um servidor local simples (ex: Live Server no VS Code).

## Modo Desenvolvimento

O projeto possui um **DEV_MODE** ativado no arquivo `cartStore.js`, que insere produtos de exemplo automaticamente no carrinho para facilitar testes durante o desenvolvimento.

## Resultado Esperado

Ao final do desafio, o projeto demonstra domínio prático dos conceitos abordados na mentoria, entregando uma aplicação funcional, organizada e com boa experiência de uso.

## Observações Finais

Este projeto tem fins **educacionais**, focado no aprendizado e prática de JavaScript moderno, sem uso de frameworks ou bibliotecas externas (exceto ícones e fontes).

## Trilha 02 — HTML, CSS e JavaScript

Mentores: **Nicholas Macedo** e **Tatiana Hiromi**<br />
Curso: **Desenvolvimento Web — DEVStart / LAB365**<br />
Data: **04/02/2026**


