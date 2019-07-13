const OngDao = require('../infra/ong-dao');
const db = require('../config/database');

module.exports = (app) => {
    app.get('/', function(req, resp) {
    });
    
    app.get('/ong', function(req, resp) {
        console.log(req)
        const ongDao = new OngDao(db);
        ongDao.lista()
                .then(ongs =>
                  resp.send(ongs)
                 )
                .catch(erro => console.log(erro));
    });



    app.get('/ong/form/:id', function(req, resp) {
        const id = req.params.id;
        const ongDao = new OngDao(db);

        ongDao.buscaPorId(id)
                .then(livro => 
                    resp.marko(
                        require('../views/ong/form'), 
                        { ong: ong }
                    )
                )
                .catch(erro => console.log(erro));
    });

    app.post('/ong', function(req, resp) {

        console.log(req.body);
        const ongDao = new OngDao(db);
        
        ongDao.adiciona(req.body)
                .then(resp.status(201).send(req.body))
                .catch(erro => console.log(erro));
        
    });

    app.put('/ong', function(req, resp) {
        console.log(req.body);
        const ongDao = new OngDao(db);
        
        ongDao.atualiza(req.body)
                .then(resp.redirect('/ong'))
                .catch(erro => console.log(erro));
    });

    app.delete('/ong/:id', function(req, resp) {
        const id = req.params.id;

        const ongDao = new OngDao(db);
        ongDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
    });
};