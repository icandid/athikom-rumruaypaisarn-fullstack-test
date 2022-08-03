# Exam - Full Stack Software Engineer - CivicLedger

In the project directory, you can run:

### `docker-compose up --build`

Runs the app in the development mode.\

## Frontend
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Launches the test runner:
### `docker exec frontend npm test`


## Backend Application Structure
- config -- environment variables
- db -- loads the knexfile using settings for the current environment
- controllers -- business logic for handling API endpoints
- utils -- modules for common functions that use a cross the app
- models  -- simple collections of db queries and utilities
- routes -- defines API endpoints and passes requests to corresponding controllers
- index.js -- the main Express app
- knexfile.js -- defines all database settings for different environments

## Error Handling

In `utilities/error-handling.ts`, I define all error-handling middleware for handling all server errors

Launches the test runner
### `docker exec backend npm test`

