# Product Manager

O **Product Manager** é uma aplicação web desenvolvida com **Angular** e **Tailwind CSS** que permite gerenciar produtos. A aplicação oferece funcionalidades para:
- Visualização de produtos com paginação.
- Adição de novos produtos através de um modal com formulários.
- Filtragem e busca de produtos por nome e por categoria (incluindo suporte para letras com e sem acento).
- Visualização da descrição completa do produto em um modal de detalhes.
- Integração com uma API simulada utilizando o **json-server**.

## Funcionalidades

- **Listagem de Produtos:** Visualize todos os produtos cadastrados com informações como nome, categoria, preço e descrição.
- **Busca e Filtro:** Filtre os produtos digitando no campo de busca (suporta acentuação) e/ou clicando em botões de categoria.  
- **Paginação:** Exibe os produtos de forma paginada, permitindo navegar entre as páginas.
- **Modais:**
  - Modal para adicionar novos produtos.
  - Modal para exibir a descrição completa de um produto.
- **Interface Responsiva:** Layout adaptado para diferentes tamanhos de tela, com design moderno utilizando Tailwind CSS.

---


## Instalação e Execução

Você pode rodar o projeto localmente de duas maneiras: **sem Docker** ou **com Docker**.

### 1. Executando o Projeto Sem Docker

#### Requisitos:
- **Node.js** (versão LTS recomendada)
- **npm** (geralmente instalado junto com o Node.js)
- **Angular CLI** (opcional, mas recomendado para desenvolvimento)

#### Passos:
1. **Clone o repositório:**

   ```bash
   git clone https://github.com/arthurabreu2/v1-product-manager.git
   cd v1-product-manager/product_manager/
   ```
2. **Navegue até o projeto:**

   ```bash
   cd v1-product-manager/product_manager/
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Rodar a aplicação e a API simultaneamente** *(método recomendado)*:

   ```bash
   npm run start:all
   ```

   Esse comando inicia o **json-server** (API na porta **3001**) e o **servidor Angular** (porta **4200**) ao mesmo tempo.

5. **Rodar manualmente em dois terminais** *(opcional)*:
   - Em um terminal, inicie a API:

     ```bash
     npm run start:api
     ```

   - Em outro terminal, inicie o Angular:

     ```bash
     npm start
     ```

   A aplicação será aberta (ou você pode acessar via `http://localhost:4200/`).

6. **Utilização:**
   - Use o campo de busca e os botões de categoria para filtrar os produtos.
   - Clique em “Add product” para abrir o modal e cadastrar um novo produto.
   - Clique no botão de “More Info” para visualizar a descrição completa do produto.
   - Após salvar um produto, um modal de sucesso será exibido.

---



### 2. Executando o Projeto Com Docker

#### Requisitos:
- **Docker Desktop** (para Windows ou macOS) ou **Docker Engine** (para Linux)

> **Observação:**  
> Se você ainda não instalou o Docker, siga os passos abaixo para o download:
>
> - **Windows e macOS:**  
>   Acesse [Docker Desktop](https://www.docker.com/products/docker-desktop) e baixe a versão correspondente ao seu sistema operacional. Siga as instruções de instalação fornecidas no site.
>
> - **Linux:**  
>   Consulte a [documentação oficial do Docker para Linux](https://docs.docker.com/engine/install/) para a instalação.

#### Passos para rodar com Docker:

1. **Construa a imagem Docker:**

   ```bash
   docker-compose build
   ```

2. **Inicie os contêineres:**

   ```bash
   docker-compose up
   ```

   Você deverá ver o Angular rodando na porta **4200** e o **json-server** na porta **3001**. Acesse a aplicação pelo navegador em `http://localhost:4200/`.

---

## Decisões Técnicas

- **Angular + Tailwind CSS:**  
  Foi escolhido o Tailwind CSS pois possibilita um design moderno, responsivo e altamente customizável por meio de classes utilitárias.

- **json-server:**  
  Utilizado para simular uma API REST, facilitando o desenvolvimento e testes da aplicação sem a necessidade de um back-end completo.

- **Docker & Docker Compose:**  
  A utilização do Docker possibilita a padronização do ambiente de desenvolvimento e produção, garantindo que todos os desenvolvedores e sistemas de integração contínua (CI) tenham as mesmas configurações. O Docker Compose é usado para orquestrar a aplicação Angular e o json-server em contêineres separados, mas que trabalham em conjunto.

- **Concurrently:**  
  Para rodar o Angular e o json-server simultaneamente dentro do contêiner, foi utilizado o pacote `concurrently`, facilitando a execução de múltiplos comandos em paralelo.

---

## Requisitos Adicionais

- **Docker Desktop ou Docker Engine:**  
  Necessário para rodar o ambiente com Docker.

- **Node.js e Angular CLI:**  
  Caso opte por rodar o projeto sem Docker, certifique-se de ter o Node.js (versão LTS) e o Angular CLI instalados.

---

## Passos Finais

Após seguir as instruções acima, o projeto **Product Manager** deverá estar rodando localmente com todas as suas funcionalidades. Se houver qualquer dúvida ou problema, verifique as mensagens de log no terminal e consulte a documentação oficial dos frameworks utilizados.

