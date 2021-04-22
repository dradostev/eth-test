exports.up = (pgm) => {
  pgm.createTable('accounts', {
    id: { type: 'varchar(255)', notNull: true, primaryKey: true },
    balance: { type: 'numeric(1000, 0)', notNull: true },
  });
};
