const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('data.db');

const USUARIOS_SCHEMA = `

CREATE TABLE IF NOT EXISTS ong (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nome_ong VARCHAR(40) NOT NULL UNIQUE, 
    email VARCHAR(255) NOT NULL, 
    senha VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    ramo_atuacao VARCHAR(255) NOT NULL,
    foto_url VARCHAR(255) NOT NULL
    
)
`;

const INSERIR_USUARIO_1 = 
`
INSERT INTO ong (
    nome_ong, 
    email,
    senha,
    descricao,
    ramo_atuacao,
    foto_url
) select 'ONG DO AMANHÃ', 'ongdoamanha@gmail.com', '123','Criando hoje o futuro','educacao', 'https://meubolsafamilia.com/wp-content/uploads/2019/01/crianca-feliz.jpg' where not exists (select * from ong where email = 'ongdoamanha@gmail.com' ) 
`;

bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
    bd.run(USUARIOS_SCHEMA);
    bd.run(INSERIR_USUARIO_1);
 

    bd.each("SELECT * FROM ong", (err, usuario) => {
        console.log('Usuario: ');
        console.log(usuario);
    });
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;