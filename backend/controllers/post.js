const models = require('../models');

exports.createPost = (req, res, next) => {
  models.Post.create({
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      like: 0,
    }) 
    .then((newPost) => res.status(201).json({ newPost }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
    var limit   = parseInt(req.query.limit);
    var order   = req.query.order;

    models.Post.findAll({
      limit: (!isNaN(limit)) ? limit : 10,
      order: [(order != null) ? order.split(':') : ['createdAt', 'DESC'],[models.Comment, 'createdAt', 'DESC']],
      include: [
        {model: models.User, as: 'User', attributes: [ 'firstname', 'name' ]},
        {model: models.Comment, attributes: [ 'content','userId'], 
          include: [{model: models.User, as:'user', attributes: [ 'firstname', 'name' ] }]},
      ]
    })
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(400).json({ error }));
};

exports.deletePost = async (req, res, next) => {
  models.Post.destroy({where: {userId: req.params.id}})
        .then(() => res.status(200).json({ message : 'Post(s) supprimé(s) !'}))
        .catch(error => res.status(500).json({ error }))
};