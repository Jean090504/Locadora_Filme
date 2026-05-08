# Cria database do projeto de filmes
create database db_filmes_2026_a;

# Ativa o uso do database de filmes
use db_filmes_2026_a;

# Cria a tabela de filme
create table tbl_filme(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lancamento date not null,
    duracao time not null,
    sinopse text not null,
    avaliacao decimal(3,2) default null,
    valor decimal(5,2) not null default 0,
    capa varchar(255)	
);

# Cria a tabela classificacao
create table tbl_classificacao(
	id int not null primary key auto_increment,
    nome varchar(15) not null,
    sigla varchar(5) not null,
    descricao varchar(255) not null
);

# Cria a tabela genero
create table tbl_genero(
	id int not null primary key auto_increment,
    nome varchar(40) not null
);

# Inserir dados 
insert into tbl_filme (
						nome, 
						data_lancamento,
                        duracao, sinopse, 
						avaliacao, 
						valor, 
                        capa)
						values(
								'Super Mario Galaxy', 
								'2026-03-02', 
                                '01:39:00', 
                                'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. 
                                Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.', 
                                3, 
                                50.70, 
                                'https://br.web.img2.acsta.net/c_150_200/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg'
                                );

# Mostra os atributos da tabela
desc tbl_classificacao;

select * from tbl_genero;

# Update no filme selecionado 
update tbl_filme 
set nome = 'Vingadores: Guerra Infinita',
    data_lancamento = '2018-04-26',
    duracao = '02:29:00',
    sinopse = 'Os Vingadores se unem para combater Thanos, que planeja destruir metade da vida no universo.',
    avaliacao = '8.4',
    valor = '35.00',
    capa = 'https://upload.wikimedia.org/wikipedia/pt/9/9b/Avengers_Infinity_War.jpg'
where id = 2;

# Deletar filme selecionado
delete from tbl_filme where id = 2;

