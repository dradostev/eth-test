exports.up = (pgm) => {
  pgm.createTable('transactions', {
    id: { type: 'uuid', notNull: true, primaryKey: true },
    from: { type: 'varchar(255)', notNull: true },
    to: { type: 'varchar(255)', notNull: true },
    amount: { type: 'float', notNull: true },
    commited: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('transactions', 'transactions_from__accounts_fk', {
    foreignKeys: [
      {
        columns: 'from',
        references: 'accounts("id")',
      },
    ],
  });

  pgm.addConstraint('transactions', 'transactions_to__accounts_fk', {
    foreignKeys: [
      {
        columns: 'to',
        references: 'accounts("id")',
      },
    ],
  });
};
