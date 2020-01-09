require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

describe('film routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let studio;
  let film;
  let reviewer;
  let review;
  let actor;

  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Laika',
    });
    
    reviewer = await Reviewer.create({
      name: 'Roger Eggbert',
      company: 'The Chicago Sun-Times'
    });    
    
    actor = await Actor.create({
      name: 'Dakota Fanning',
      dob: new Date('1994-02-23T00:00:00'),
      pob: 'Conyers, GA'
    });
    
    film = await Film.create({
      title: 'Coraline',
      studio: studio._id,
      released: 2009,
      cast: [{
        role: 'Coraline',
        actor: actor._id
      }],
      reviews: []
    });

    review = await Review.create(
      { rating: 5, reviewer: reviewer._id, review: 'Simply the bestest', film: film._id }
    );

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a film', () => {
    return request(app)
      .post('api/v1/films')
      .send({
        title: 'Coraline',
        studio: studio._id,
        released: 2009
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Coraline',
          studio: studio._id,
          released: 2009,
          __v: 0
        });
      });
  });
	
  // it('gets all films', async() => {

  it('gets a film by id', () => {
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          title: film.title,
          released: film.released,
          studio: {
            _id: studio._id.toString(),
            name: studio.name
          },
          cast: [{
            _id: film.cast[0]._id.toString(),
            role: film.cast[0].role,
            actor: {
              _id: actor._id.toString(),
              name: actor.name
            }
          }],
          reviews: [{
            _id: review._id.toString(),
            rating: review.rating,
            review: review.review,
            reviewer: {
              _id: reviewer._id.toString(),
              name: reviewer.name
            }
          }]
        });
      });
  });
});
