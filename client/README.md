# Smart Elevator Client

This repository is the client for the smart-elevator project using React.

## Installation

1. Clone the smart elevator repository.
2. Navigate to the client directory using `cd client`.
3. Install the dependencies using `npm install`.
4. Add a `.env` file to the root of the client directory with the following contents:

```
REACT_APP_FLOOR=<floor number where application will run>
```

A `REACT_APP_FLOOR` is required to be set in the `.env` file.
By default the api base url will be `"http://localhost:3001/api"`. If you require the api
to be running on a different port, add the following to the `.env` file:

```
REACT_APP_API_URL=<api base url>
```

5. Run the client using `npm start`.
6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you require a dummy server to be running locally, follow the instructions in the [server repository](../server/README.md).
