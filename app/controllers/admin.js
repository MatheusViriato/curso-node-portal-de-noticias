module.exports.formulario_inclusao_noticia = function(app, req, res){
    res.render('admin/form_add_noticia', {validacao: false, noticia: {}});
}

module.exports.noticias_salvar = function(app, req, res){
    var noticia = req.body;

    //validando os campos do form com express validator
    req.assert('titulo', 'Titulo é obrigatório').notEmpty();
    req.assert('titulo', 'Titulo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'Autor é obrigatório').notEmpty();
    // req.assert('data', 'Data é obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
    req.assert('noticia', 'Notícia é obrigatório').notEmpty();

    var erros = req.validationErrors();

    //se houver erros no formulário, não salva os dados e renderiza o form de novo
    if(erros){
        var arrayErros = [];
        arrayErros.push(erros);
        res.render('admin/form_add_noticia', {validacao: erros, noticia: noticia});
        return;
    }

    //para salvar no bd
    //recuperar conexao
    //recuperar model
    //salvar noticia

    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia, function(error, result){
        res.redirect('/noticias');         
    });
}