# NX Workspace Example

1. Install dependencies via `yarn` or `npm install` (delete the `yarn.lock` if you use npm)

2. Run `yarn start:dev` to start the Postgres database, Adminer dashboard, and run the app in watch mode

3. Create database schema via `mikro-orm schema:create --run`. This will also create the database if it does not exist

4. API will be available at http://localhost:4000

5. Run `yarn start:prod` to start the database and admin panel, as well as build and run the app in a Docker container. (The API will still be available at http://localhost:4000)
