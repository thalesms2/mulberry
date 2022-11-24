# mulberry

1. Cadastro de Marcas
Funcionalidades:
[X] Inserir
[X] Alterar
[X] Excluir
[X] Pesquisar
[X] Serializar (Conforme Parâmetros do Sistema)
[ ] Gerar LOG
Consistências:
[ ] Código da Marca deverá ser maior que “0” quando não serializar
[ ] Descrição da Marca não deverá ser nula
2. Cadastro de Grupos
Funcionalidades:
[ ] Inserir
[ ] Alterar
[ ] Excluir
[ ] Pesquisar
[ ] Serializar (Conforme Parâmetros do Sistema)
[ ] Gerar LOG
Consistências:
[ ] Código do Grupo deverá ser maior que “0” quando não serializar
[ ] Descrição do Grupo não deverá ser nula
3. Cadastro de Produtos
Funcionalidades:
 Inserir
 Alterar
 Excluir
 Pesquisar
 Serializar (Conforme Parâmetros do Sistema)
 Pesquisar Marcas
 Pesquisar Grupos
 Visualizar Descrição da Marca
 Visualizar Descrição do Grupo
 Calcular Preço de Venda a partir do % Lucro
9
Consistências:
 Código do Produto deverá ser maior que “0” quando não serializar
 Descrição do Produto não deverá nula
 Preço de Custo do Produto deverá ser maior que “0”
 % Lucro Produto deve ser maior ou igual “0” e menor ou igual “100”
 Somente calcular o Preço de Venda, quando o Preço de Custo for maior que “0”
 Preço de Venda do Produto não pode ser editado quando Preço de Custo for maior que
“0”
4. Alteração do Preço de Custo
Criar tela para aumentar o preço de custo dos produtos. O usuário poderá filtrar ou não a
marca e grupo dos produtos. Quando informar uma marca ou grupo, o código deve ser validado
e sua descrição visualizada na tela. Caso o código da marca e grupo for igual a “0”, a alteração
será para todas as marcas e grupos. Ao clicar no botão confirmar, o sistema deverá exibir ao
usuário a pergunta “Deseja Atualizar Variação ao Preço de Custo do Produto?”. Ao finalizar a
atualização, deverá ser exibido uma mensagem ao usuário. Na mesma tela o usuário poderá
ainda informar se deseja recalcular ou não o preço de venda, a partir do novo preço de custo e
percentuais de lucro informados no cadastro. Este processo deve ficar registrado no log do
sistema.
5. Movimentação no Estoque
Criar tela para lançar as entradas/saídas do estoque do produto. O usuário irá informar se a
movimentação será de entrada ou saída, o produto e a quantidade. Ao confirmar, o sistema
registrará a movimentação no estoque na tabela es004, preenchendo todas as informações da
tabela e também a atualização da posição física do produto na tabela es005. Esta operação
deverá ficar registada no log do sistema.
Algumas considerações sobre a operação:
O produto deverá existir
A descrição do produto deve ser visualizada em tela
A quantidade deve ser maior que “0”
O sistema deverá serializar o código do movimento (movcod) baseando-se na última
movimentação do tipo Manual registrada no sistema.
6. Consulta Posição Física
Criar tela para consultar a posição física dos produtos, listando o código do produto, a descrição
do produto e o saldo do produto no estoque. O usuário poderá filtrar marca e grupo. Quando o
produto estiver com o saldo abaixo de “0”, a linha deverá ficar em vermelho.
Para listar a descrição do produto, deve ser criado um subtipo de produto na tabela es005
(PosProCod).
7. Consulta Movimentação do Produto
Criar tela para ser chamada a partir da tela de Consulta Posição Física, que listará a
movimentação do produto no qual o usuário posicionou a linha. Serão listadas nesta tela data,
hora, código movimentação, tipo movimentação, movimentação, quantidade, valor e usuário.
A ordem listada será produto, data, hora, código movimentação.
O produto no qual a movimentação está sendo listada deve ser identificado no cabeçalho da
tela de consulta.
10
8. Cadastro de Estados
Funcionalidades:
 Inserir
 Alterar
 Excluir
 Pesquisar
 Gerar LOG
Consistências:
 Código do Estado não deverá ser nulo
 Nome do Estado não deverá nulo
9. Cadastro de Municípios
Funcionalidades:
 Inserir
 Alterar
 Excluir
 Pesquisar
 Pesquisar Estado
 Visualizar Nome do Estado
 Serializar (Conforme Parâmetros do Sistema)
 Gerar LOG
Consistências:
 Código do Município deverá ser maior que “0” quando não serializar
 Nome do Município não deverá nulo
10. Cadastro de Vendedores
Funcionalidades:
 Inserir
 Alterar
 Excluir
 Pesquisar
 Serializar (Conforme Parâmetros do Sistema)
 Gerar LOG
Consistências:
 Código do Vendedor deverá ser maior que “0” quando não serializar
 Nome do Vendedor não deverá nulo
 Percentual de Comissão deverá ser maior ou igual a “0”
11
11. Cadastro de Clientes
Funcionalidades:
 Inserir
 Alterar
 Excluir
 Pesquisar
 Serializar (Conforme Parâmetros do Sistema)
 Gerar LOG
Consistências:
 Código do Cliente deverá ser maior que “0” quando não serializar
 Nome do Cliente não deverá nulo
 CPF deverá ser validado (Procedimento GE105)
 Pesquisar Município
 Visualizar Nome do Município
 Visualizar Nome do Estado
 Data de Cadastro deve ser inicializada com Data Atual
 Tabela deve ser inicializada com “1”
 Data de Nascimento não deverá ser Nula
12. Vendas
Funcionalidades:
 Inserir
 Alterar
 Excluir
 Pesquisar
 Serializar
 Gerar LOG
Consistências:
 Data de Emissão deverá ser inicializada com Data Atual
 Hora de Emissão deverá ser inicializada com Hora Atual
 Data de Emissão não poderá ser editada
 Hora de Emissão não poderá ser editada
 Pesquisar Vendedor
 Visualizar Nome do Vendedor
 Pesquisar Cliente
 Visualizar Nome do Cliente
 Tabela de Preços da Venda deverá ser inicializada com a Tabela de Preços do Cliente
 Pesquisar Produto
 Visualizar Descrição do Produto
 Quantidade deve ser maior do que “0”
 Valor Unitário deverá ser inicializado com o valor do produto conforme tabela de
preços da venda
 Valor Unitário não poderá ser editado.
 Percentual de Desconto não pode ser menor do que “0” e maior do que 50,00
 Valor Total do Item não poderá ser editado.
12
 Avisar ao usuário quando o produto está ou ficará com o saldo em estoque menor ou
igual a “0”
 SubTotalizar Quantidade
 SubTotalizar Valor Desconto
 SubTotalizar Valor Venda
 Ao confirmar, abrir tela com Subtotal, Percentual Desconto, Valor Desconto e Valor
Total, para lançar desconto na finalização da Venda.
 Gravar os totais da finalização da venda
 Gravar Movimentação do Estoque
 Atualizar a Posição Física dos Produtos da Venda
13. Relatório de Clientes por Estado
Criar relatório que lista clientes, listando, nome do cliente, código do cliente, município, idade,
tabela de preço. O usuário irá selecionar o estado desejado. A ordem do relatório será por idade.
14. Relatório de Comissões por Vendedor
Criar relatório que liste as comissões que o vendedor tem direito em um determinado período. O
usuário poderá informar um vendedor por vez ou todos de uma só vez. O relatório deve “quebrar”
por vendedor, listando data emissão, hora emissão, nº venda,nome do cliente, valor da venda e
valor da comissão. O relatório deve ser ordenado por vendedor, data emissão, hora emissão e nº
venda. O usuário também deseja 2 totalizações, uma por vendedor e outra geral.
15. Relatório de Vendas por Período
Criar relatório que liste as vendas efetuadas em um determinado período. O relatório deve
“quebrar” por data de emissão, listando ao lado o dia da semana. Já as colunas do relatório serão
formadas pelo nº venda, nome do cliente, nome do vendedor, quantidade, valor desconto e valor
venda. O usuário também deseja 2 totalizações, uma por data e outra geral.
16. Geração de Arquivo .TXT de e-mails de clientes
Criar funcionalidade para gerar arquivo .TXT que contenha nome do cliente e e-mail do cliente. O
separador de campos do arquivo será “|” (pipe) Ex.: JOAO DA SILVA|joaodasilva@tecmicro.com.br
Deverá ser gerado um registro por linha.
O nome do arquivo será clientes_email.txt
O usuário poderá informar a pasta onde será gerado o arquivo.
17. Importação de Arquivo de estados no formato .XLS
Criar funcionalidade para importar e gravar na tabela de estados as informações contidas no
arquivo estados.xls
O usuário poderá informar onde está o arquivo.
18. Tela para Alteração de Senha
Criar tela, onde o usuário poderá alterar a senha. Nesta tela será informado o usuário, sua senha
atual e caso esta senha esteja correta, informar nova senha e confirmação da senha. Ao confirmar,
grava esta informação no usuário.
13
19. Implementação das Definições de Acesso do Usuário as Funcionalidades do Sistema
Implementar toda a parte de segurança das opções do menu, por usuário. O usuário deverá fazer o
login e esta informação quando necessitar ficará gravada no regedit do Windows. Sempre que o
usuário acessa o sistema, é informado na tela de senha do usuário, no campo usuário, o último
usuário que teve acesso ao sistema. Para cada opção do menu, deverá ser criado um programa de
acesso e associado ao usuário, para que o mesmo tenha permissão para as funcionalidades