# FCC Quality Assurance — Metric/Imperial Converter

Express API that converts between metric and imperial units, covered by functional and unit tests, built for the FreeCodeCamp Quality Assurance certification.

## Features

- `GET /api/convert?input=<value><unit>` — parses a combined number/unit string and returns the converted value and unit
- Supports six unit pairs: `gal`↔`L`, `lbs`↔`kg`, `mi`↔`km`
- Returns a human-readable `string` field alongside numeric `initNum`, `initUnit`, `returnNum`, `returnUnit`
- Responds with `"invalid number"`, `"invalid unit"`, or `"invalid number and unit"` on bad input
- Unit tests cover `getNum`, `getUnit`, `getReturnUnit`, `convert`, and `getString` in `controllers/convertHandler.js`
- Functional tests cover valid conversions and error paths via `chai-http`

## Tech Stack

- Node.js
- Express
- Chai / Mocha

## Requirements

- Node.js 16+
- Yarn 1.x or npm 8+

## Installation

```bash
yarn install
```

## Environment Variables

Derived from `sample.env`:

- `PORT` — server port (defaults to `3000`)
- `NODE_ENV` — `development` | `test` | `production`

## Usage

```bash
yarn start
```

Server listens on `http://localhost:3000`.

## Testing

```bash
NODE_ENV=test yarn start
```

## API

- `GET /api/convert` — convert a unit string (query param `input`, e.g. `3.1mi`)

## Project Structure

```
.
├── controllers/
├── routes/
├── tests/
├── public/
├── views/
├── server.js
└── package.json
```

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file.
