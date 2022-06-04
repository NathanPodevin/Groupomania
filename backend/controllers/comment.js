const models= require("../models");

// Fonction création d'un commentaire
exports.createComment = (req, res) => {
    models.Comment.create({
        userId: req.body.userId,
        content: req.body.content,
        postId: req.body.postId,
    })
    .then((newComment) => res.status(201).json({ newComment}))
    .catch(error => res.status(500).json({ error }));
};