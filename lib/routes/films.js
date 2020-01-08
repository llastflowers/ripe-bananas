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
      .select({ title: true, released: true, studioId: true })
      .populate('studio')
      .then(films => res.send(films));
  })

  .get('/:id', (req, res) => {
    Film
      .findById(req.params.id)
      .populate('studio')
      .populate('cast')
      .populate({
        path: 'reviews',
        populate: {
          path: 'reviewer'
        } 
      })
      .then(films => res.send(films));
  });
