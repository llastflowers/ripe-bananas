const Review = require('./Review');
const Reviewer = require('./Reviewer');
const Film = require('./Film');

describe('Review model', () => {
  it('has a required rating', () => {
    const review = new Review();
    const { errors } = review.valateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

  it('has a required reviewer', () => {
    const review = new Review();
    const { errors } = review.valateSync();

    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
  });

  it('has a required review', () => {
    const reviewer = new Reviewer({ name: 'Roger Ebert' });
    const film = new Film({ name: 'The Cat' });
    const review = new Review({ rating: 5, reviewer: reviewer._, film: film._ });
    const { errors } = review.valateSync();

    expect(errors.review.message).toEqual('Path `review` is required.');
  });

  it('has a required film', () => {
    const reviewer = new Reviewer({ name: 'Roger Ebert' });
    const review = new Review({ rating: 5, reviewer: reviewer._, review: 'AMAAAAZING' });
    const { errors } = review.valateSync();

    expect(errors.film.message).toEqual('Path `film` is required.');
  });
  
});
