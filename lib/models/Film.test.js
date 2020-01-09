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

    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });

  it('has a required release year', () => {
    const studio = new Studio({ name: 'Laika' });
    const film = new Film({ title: 'The Cat', studio: studio._id, cast: [{ role: 'the cat' }] });
    const { errors } = film.validateSync();

    expect(errors.released.message).toEqual('Path `released` is required.');
  });

  it('has a required actor', () => {
    const studio = new Studio({ name: 'Laika' });
    const film = new Film({ title: 'The Cat', studio: studio._id, released: 1991, cast: [{ role: 'the cat' }] });
    const { errors } = film.validateSync();

    expect(errors['cast.0.actor'].message).toEqual('Path `actor` is required.');
  });
  
});
