## Build and run

### Requires

- Docker
- docker-compose

### Build

Run `docker-compose build`

### Run locally

1. Copy `.env.dev` to `.env` (optionally change values)

2. Run `docker-compose up`

### Run in dev mode

1. Run `docker-compose -f docker-compose.dev.yml up`

2. Run `DATABASE_URL=postgres://ethereum:1234@localhost:5433/cryptocurrency yarn run migrate up`

3. Run `yarn run start:dev`

## Architecture

- `src/controllers` contains REST API controllers
- `src/models` contains domain models and DTOs
- `src/services` contains application services, including background jobs and external API client (Ethereum)
- `src/repositories` contains data access layer repositories
- `migrations` contains database migrations

In dev environment it interacts with Ganachi CLI as test Etherium node.

## API

`GET /api/accounts`
List of registered accounts (imported from blockchain) and balances.

`POST /api/transactions`

```json
{
	"from": "0x7c20581CAc7adC19F687Bb64bD649Dd2873f2390",
	"to": "0x6F656319447cccB5618ae2070C94759ceccA5498",
	"amount": "10"
}
```

Send transaction from one account to another using amount in ETH.
Returns transaction object.

`GET /api/transactions/{transactionId}`

Get data on particular transaction by id.
