# User Transactions Challenge

## Migrations

### Creating a migration

Create a new migration file with specific name

```
yarn run typeorm migration:create ./src/infra/database/relational/migration/add-users-table
```

Generate a new migration based on current model and database state

```
yarn run typeorm migration:generate ./src/infra/database/relational/migration/add-users-table -d ./src/infra/database/relational/config/data-source.config.ts
```

### Running migration

Running all pending migrations

```
yarn run typeorm migration:run -d ./src/infra/database/relational/config/data-source.config.ts
```

### Revert

Reverting migration (one by one)

```
yarn run typeorm migration:revert -d ./src/infra/database/relational/config/data-source.config.ts
```
