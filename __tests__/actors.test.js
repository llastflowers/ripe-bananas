require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');

describe('actor routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let actor;
  beforeEach(async() => {
    actor = await Actor.create({
      name: 'Dakota Fanning',
      dob: new Date('1994-02-23T00:00:00'),
      pob: 'Conyers, GA'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Dakota Fanning',
        dob: new Date('1994-02-23T00:00:00'),
        pob: 'Conyers, GA'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Dakota Fanning',
          dob: expect.any(String),
          pob: 'Conyers, GA',
          __v: 0
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await Actor.create([
      { name: 'Dakota Fanning' },
      { name: 'Yuriko Ishida' },
      { name: 'Megumi Hayashibara' }
    ]);

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: actor._id.toString(),
            name: actor.name
          });
        });
      });
  });

  it('gets an actor by id', async() => {
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toMatchObject({
          _id: expect.any(String),
          name: 'Dakota Fanning',
          dob: expect.any(String),
          pob: 'Conyers, GA',
          __v: 0
        });
      });
  });
});
