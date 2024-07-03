## Available Scripts

### `npm run dev`

Run the server in development mode. (5000 port by default)

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first). (5000 port by default)

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.

## Additional Notes

- You need to add your db credentials as `DB_USER, DB_PASSWORD` in env/development.env file in you run in dev mode, and in env/production.env if you run in prod mode

- `/doc` is the address where you will find the `swagger documentation`

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`.
