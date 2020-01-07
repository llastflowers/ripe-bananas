require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');

describe('reviewer routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let reviewer;
  beforeEach(async() => {
    reviewer = await Reviewer.create({
      name: 'Roger Ebert',
      company: 'The Chicago Sun-Times'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Ebert',
        company: 'The Chicago Sun-Times'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Ebert',
          company: 'The Chicago Sun-Times',
          __v: 0
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await Reviewer.create([
      { name: 'Roger Ebert', company: 'The Chicago Sun-Times' },
      { name: 'Jeannette Catsoulis', company: 'The New York Times' },
      { name: 'Justin Chang', company: 'The Los Angeles Times' }
    ]);

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers.forEach(reviewer => {
          expect(res.body).toContainEqual({
            _id: reviewer._id.toString(),
            name: reviewer.name,
            company: reviewer.company
          });
        });
      });
  });

  it('gets a reviewer by id', async() => {
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toMatchObject({
          _id: expect.any(String),
          name: 'Roger Ebert',
          company: 'The Chicago Sun-Times',
          __v: 0
        });
      });
  });

  it('updates a reviewer by id', async() => {
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Roger Eggbert' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Eggbert',
          company: 'The Chicago Sun-Times',
          __v: 0
        });
      });
  });

  it('deletes a reviewer by id', async() => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Ebert',
          company: 'The Chicago Sun-Times',
          __v: 0
        });

        return Reviewer.find();
        //   })
        //   .then(reviews => {
        //     expect(reviews).toHaveLength(0);
      });
  });
});
