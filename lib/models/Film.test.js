const Film = require('./Film');
const Studio = require('./Studio');

describe('Film model', () => {
  it('has a required title', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('has a required studio', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.studioId.message).toEqual('Path `studioId` is required.');
  });

  it('has a required release year', () => {
    const studio = new Studio({ name: 'Laika' });
    const film = new Film({ title: 'The Cat', studioId: studio._id, cast: [{ role: 'the cat' }] });
    const { errors } = film.validateSync();

    expect(errors.released.message).toEqual('Path `released` is required.');
  });

  it('has a required actorId', () => {
    const studio = new Studio({ name: 'Laika' });
    const film = new Film({ title: 'The Cat', studioId: studio._id, released: 1991, cast: [{ role: 'the cat' }] });
    const { errors } = film.validateSync();

    expect(errors['cast.0.actorId'].message).toEqual('Path `actorId` is required.');
  });
  
});
