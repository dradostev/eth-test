exports.up = (pgm) => {
  pgm.createTable('accounts', {
    id: { type: 'varchar(255)', notNull: true, primaryKey: true },
    balance: { type: 'float', notNull: true },
  });
};
