const Review = require('./Review');
const Reviewer = require('./Reviewer');
const Film = require('./Film');

describe('Review model', () => {
  it('has a required rating', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

  it('has a required reviewer', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.reviewerId.message).toEqual('Path `reviewerId` is required.');
  });

  it('has a required review', () => {
    const reviewer = new Reviewer({ name: 'Roger Ebert' });
    const film = new Film({ name: 'The Cat' });
    const review = new Review({ rating: 5, reviewerId: reviewer._id, filmId: film._id });
    const { errors } = review.validateSync();

    expect(errors.review.message).toEqual('Path `review` is required.');
  });

  it('has a required filmId', () => {
    const reviewer = new Reviewer({ name: 'Roger Ebert' });
    const review = new Review({ rating: 5, reviewerId: reviewer._id, review: 'AMAAAAZING' });
    const { errors } = review.validateSync();

    expect(errors.filmId.message).toEqual('Path `filmId` is required.');
  });
  
});
