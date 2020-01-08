const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res) => {
    Review
      .create(req.body)
      .then(review => res.send(review));
  })

  .get('/', (req, res) => {
    Review
      .find()
      .lean()
      .then(reviews => {
        reviews.forEach(review => {
          delete review.reviewerId;
          delete review.__v;
        });
        res.send(reviews);
      });
  })

  .delete('/:id', (req, res) => {
    Promise.all([
      Review.findByIdAndDelete(req.params.id),
    ])
      .then(([review]) => res.send(review));
  });
