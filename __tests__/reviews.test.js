require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');

describe('review routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let studio;
  let reviewer;
  let film;
  let reviews;
  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Laika',
    });
      
    reviewer = await Reviewer.create({
      name: 'Roger Eggbert',
      company: 'The Chicago Sun-Times'
    });
      
    film = await Film.create({
      title: 'Coraline',
      studio: studio._id,
      released: 2009
    });

    reviews = await Review.create([
      { rating: 5, reviewer: reviewer._id, review: 'Simply the bestest', film: film._id },
      { rating: 3, reviewer: reviewer._id, review: 'Simply the okayest', film: film._id },
      { rating: 1, reviewer: reviewer._id, review: 'Simply the worstest', film: film._id }
    ]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        reviewer: reviewer._id.toString(),
        review: 'Simply the bestest',
        film: film._id.toString()
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 5,
          reviewer: reviewer._id.toString(),
          review: 'Simply the bestest',
          film: film._id.toString(),
          __v: 0
        });
      });
  });

  it('gets all reviews', async() => {
    const reviewsJSON = JSON.parse(JSON.stringify(reviews));
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        reviewsJSON.forEach(review => {
          expect(res.body).toContainEqual({
            _id: review._id.toString(),
            rating: review.rating,
            review: review.review,
            film: film._id.toString()
          });
        });
      });
  });

  it('deletes a review by id', async() => {
    return request(app)
      .delete(`/api/v1/reviews/${reviews[0]._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 5,
          reviewer: reviewer._id.toString(),
          review: 'Simply the bestest',
          film: film._id.toString(),
          __v: 0
        });

        return Review.find();
      });
  });
});
