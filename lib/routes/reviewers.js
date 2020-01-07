const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer));
  })

  .get('/', (req, res) => {
    Reviewer
      .find()
      .select({ name: true, company: true })
      .then(reviewers => res.send(reviewers));
  })

  .get('/:id', (req, res) => {
    Reviewer
      .findById(req.params.id)
      .then(reviewers => res.send(reviewers));
  });
