
# Portfolio - Express TypeScript Backend


This repository contains the backend for my new portfolio, built using `Express.js` and `TypeScript`. It serves as the backend API for handling portfolio-related data and requests.


## Features

- **Zod** for request validation and schema enforcement.

- **Rate Limiter**  to prevent abuse and enhance security.
- **Redis** for caching
- **Basic Authentication**   for additional security measures
- **TypeScript**: Developed with TypeScript for type safety and better development experience

- **Express.js** for a robust and scalable backend

- **MongoDB** for efficient data storage.

- **CORS**: enabled for seamless frontend integration.








## Installation

Clone the repository

```bash
git clone git clone https://github.com/nagendrayakkaladevara/newPortfolio_Express_TypeScript_Backend.git
```
Install dependencies
```bash
npm install
```
Create a .env file in the root directory and add necessary environment variables:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASIC_AUTH_USERNAME=
BASIC_AUTH_PASSWORD=

REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
```

Run the app
```bash
npm run dev
```
The app should now be running on http://localhost:5000/.
