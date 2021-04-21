exports.up = (pgm) => {
  pgm.createTable('accounts', {
    id: { type: 'varchar(255)', notNull: true, primaryKey: true },
    balance: { type: 'bigint', notNull: true },
  });
};
