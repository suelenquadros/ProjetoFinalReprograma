class OngDao {

    constructor(db) {
        this._db = db;
    }

    adiciona(ong) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO ong (
                    nome_ong, 
                    email,
                    senha,
                    descricao,
                    ramo_atuacao,
                    foto_url
                ) values (?,?,?,?,?,?)
                `,
                [
                    ong.nome_ong,
                    ong.email,
                    ong.senha,
                    ong.descricao,
                    ong.ramo_atuacao,
                    ong.foto_url
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adicionar a ong!');
                    }

                    resolve();
                }
            )
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM ong',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar as Ongs!');

                    return resolve(resultados);
                }
            )
        });
    }

//     buscaPorId(id) {

//         return new Promise((resolve, reject) => {
//             this._db.get(
//                 `
//                     SELECT *
//                     FROM ong
//                     WHERE id = ?
//                 `,
//                 [id],
//                 (erro, ong) => {
//                     if (erro) {
//                         return reject('Não foi possível encontrar o livro!');
//                     }
//                     return resolve(ong);
//                 }
//             );
//         });
//     }

//     atualiza(ong) {
//         return new Promise((resolve, reject) => {
//             this._db.run(`
//                 UPDATE livros SET
//                 nome_ong = ?
//                 email = ?
//                 senha = ?
//                 descricao = ?
//                 ramo_atuacao = ?
//                 foto_url = ?
//                 WHERE id = ?
//             `,
//             [
//                 ong.nome_ong, 
//                 ong.email,
//                 ong.senha,
//                 ong.descricao,
//                 ong.ramo_atuacao,
//                 ong.foto_url
//             ],
//             erro => {
//                 if (erro) {
//                     return reject('Não foi possível atualizar a Ong!');
//                 }

//                 resolve();
//             });
//         });
//     }

//     remove(id) {

//         return new Promise((resolve, reject) => {
//             this._db.get(
//                 `
//                     DELETE 
//                     FROM ong
//                     WHERE id = ?
//                 `,
//                 [id],
//                 (erro) => {
//                     if (erro) {
//                         return reject('Não foi possível remover a Ong!');
//                     }
//                     return resolve();
//                 }
//             );
//         });
//     }
// }

module.exports = OngDao;