const Actor = require('./Actor');

describe('Actor model', () => {
  it('has a required name', () => {
    const actor = new Actor();
    const { errors } = actor.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required dob', () => {
    const actor = new Actor();
    const { errors } = actor.validateSync();

    expect(errors.dob.message).toEqual('Path `dob` is required.');
  });

  it('has a required pob', () => {
    const actor = new Actor();
    const { errors } = actor.validateSync();

    expect(errors.pob.message).toEqual('Path `pob` is required.');
  });
  
});
