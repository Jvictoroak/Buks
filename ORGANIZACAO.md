# iniciando o projeto
- clone o projeto
- abra o terminal
- cd buks
- npm install
- npm install react-router-dom@6
- npm install sweetalert2
- npm install jwt-decode
- olhar o README da pasta 'api'

# Criando Componentes
**Para que serve:** Crie componentes para todas as páginas, eles são necesssários por causa da forma que funciona o React. As sections e card você cria sempre que achar que um elemento ira ser reutilizado em outras partes do  site (Exemplo: um card padrão para o produto, um section para o cabecalho)

- Para criar um component entre em buks\src\components
- Para criar paginas crie uma pasta dentro de  **buks\src\components\paginas** 
- Para criar sections crie uma pasta dentro de  **buks\src\components\sections** 
- Para criar cards crie uma pasta dentro de  **buks\src\components\cards** 
- O nome da pasta deve ser o nome da component, section ou card
- Dentro da pasta deve haver um arquivo chamado index.tsx e index.css



# Importando componentes(Pagina)
- Para importar uma página você deve estar em **buks\src\App.tsx** 
- no inicio da página escrever: import nome_Pagina from 'caminho Componente'
- dentro de <Routes></Routes> coloque a tag <Route path="/url" element={<nome_Pagina />} /> sendo url o que virá depois do dominio do site e nome_Pagina o nome do import

# Links
- Caso seja uma página que deve ser acessada através do header entre em **buks\src\components\sections\header\index.tsx**
- Crie um <li><Link to="/url" className='texto t1 pag'><p>Texto</p></Link></li>
- o to="/url" a url deve ser a mesma colocada no <Route path="/url" ...>

# Importando componentes(cards e sections)
- dentro das páginas você tambem pode importar os componentes 
- import nome_Componente from 'path Componente'
- com <nome_Component/>
