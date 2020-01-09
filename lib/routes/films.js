const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res) => {
    Film
      .create(req.body)
      .then(film => res.send(film));
  })

  .get('/', (req, res) => {
    Film
      .find()
      .select({ title: true, released: true, studio: true })
      .populate('studio')
      .then(films => res.send(films));
  })

  .get('/:id', (req, res) => {
    Film
      .findById(req.params.id)
      .lean()
      .populate('studio')
      .populate('cast.actor', { name: true })
      .populate({
        path: 'reviews',
        select: 'rating review reviewer',
        populate: {
          path: 'reviewer',
          select: 'name'
        } })
      .then(film => { 
        delete film.studio.__v;
        delete film.__v;
        delete film.cast.__v;
        delete film.reviews[0].__v;
        delete film.reviews[0].film;
        delete film._id;
        res.send(film);
      });
  });
