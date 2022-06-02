const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require("../models");
require('dotenv').config();

// Regex pour vérifier le format de l'email et du mot de passe
var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
var emailRegex = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

// Fonction pour s'enregistrer
exports.signup = async (req, res, next) => {
    var name = req.body.name;
    var firstname = req.body.firstname;
    var email    = req.body.email;
    var password = req.body.password;
// On vérifie que les champs ont bien été remplies
    if (req.body.name == null || req.body.firstname == null || req.body.email == null || req.body.password == null) {
      return res.status(400).json({ 'error': 'Merci de renseigner tous les champs !'});
    }
// On vérifie que l'utilisateur n'a pas déjà créé un compte avec son email
    models.User.findOne({
      attributes: ['email'],
      where: { email: email }
    })
    .then(function(user) {
// Si l'utilisateur n'existe pas déjà on vérifie les infos et on créé son compte      
      if(!user) {
      let testEmail = emailRegex.test(req.body.email);
      let testPassword = passwordRegex.test(req.body.password);
      if(testEmail && testPassword){
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const newUser = {
              name: name,
              firstname: firstname,
              email: email,
              password: hash
          };
          models.User.create(newUser)
            .then((newUser) => res.status(201).json({ newUser }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
      }
      else{
        return res.status(401).json({ error: 'Adresse email ou mot de passe invalide ! (de 8 à 15 caractères, au moins une lettre minuscule, au moins une lettre majuscule, au moins un chiffre, au moins un de ces caractères spéciaux: $ @ % * + - _ !)' });
      }
    } else {
      return res.status(409).json({ 'error': 'utilisateur déjà existant' });
    }
  })
  .catch(function(err) {
    return res.status(500).json({ 'error': "impossible de vérifier l'utilisateur" });
  });
};

// Fonction pour se connecter
exports.login = async (req, res, next) => {

      var email    = req.body.email;
      var password = req.body.password;

      if (req.body.email == null || req.body.password == null) {
        return res.status(400).json({ 'error': 'Merci de renseigner tous les champs !'});
      }
// On cherche l'utilisateur avec son email
      models.User.findOne({
        where: { email: email }
      })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
// On compare les mots de passe
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
// Utilisateur connecté et on lui assigne un token
            res.status(200).json({
              userId: user.id,
              token: jwt.sign(
                { userId: user.id },
                process.env.TOKEN_KEY,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

//fonction pour retrouver un utilisateur
exports.getProfile = async (req, res, next) => {
  models.User.findByPk(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json({ error }))
};

//fonction pour supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
  models.User.destroy({where: {id: req.params.id}})
        .then(() => res.status(200).json({ message : 'Utilisateur supprimé !'}))
        .catch(error => res.status(500).json({ error }))
};

