require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');
// const Film = require('../lib/models/Film');

describe('studio routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let studio;
  // let films;
  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Laika',
      address: { city: 'Portland', state: 'Oregon', country: 'USA' }
    });

    // films = await Film.create([
    //   {
    //     studioId: studio._id,
    //     title: ,
    //     released: ,
    //     cast: [{
    //       role: ,
    //       actor: ,
    //     }]
    //   }
    // ]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Laika',
        address: { city: 'Portland', state: 'Oregon', country: 'USA' }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Laika',
          address: { city: 'Portland', state: 'Oregon', country: 'USA' },
          __v: 0
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await Studio.create([
      { name: 'Laika' },
      { name: 'Studio Ghibli' },
      { name: 'Madhouse, Inc.' }
    ]);

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id.toString(),
            name: studio.name
          });
        });
      });
  });

  it('gets a studio by id', async() => {
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toMatchObject({
          _id: expect.any(String),
          name: 'Laika',
          address: { city: 'Portland', state: 'Oregon', country: 'USA' },
          // films : JSON.parse(JSON.stringify(films)),
          __v: 0
        });
      });
  });
});
