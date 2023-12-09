# Smart Elevator Client

This repository is the client for the smart-elevator project using React.

## Installation

1. Clone the smart elevator repository.
2. Navigate to the client directory using `cd client`.
3. Install the dependencies using `npm install`.
4. Add a `.env` file to the root of the client directory with the minimum of the following contents:

```
REACT_APP_FLOOR=<floor number where application will run>
```

A `REACT_APP_FLOOR` is required to be set in the `.env` file.

By default the api base url will be `"http://localhost:3001/api"`. If you require the api
to be running on a different port, add the following to the `.env` file:

```
REACT_APP_API_URL=<api base url>
```

The default polling interval is 10 seconds. If you require a different polling interval,
add the following to the `.env` file:

```

```

5. Run the client using `npm start`.
6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you require a dummy server to be running locally, follow the instructions in the [server repository](../server/README.md).

## Developer's Notes

### Assumptions and Design Decisions

- If the floor the user is on is not a destination of a given lift the lift will not stop at that floor. Therefore, if the lift is not currently on the user's floor, it should not be listed on the panel.
- As there could be multiple panels, it is assumed that the state management of the system is all handled by the backend. Ideally, an approach such as a WebSocket would allow live updates to the panels. Since the state data is retrieved from the backend via a REST API, a polling approach has been used to update the state of the panel. The polling interval is configurable via the `.env` file.
- As the application is fairly simple, the state management is handled by the `App` component. If the application were to grow the Context API or a state management library such as Redux could be used.
- Likewise, as the application is fairly simple, the `App` component handled most of the logic. Again, if the application were to grow, the logic could be moved into separate components.
- If a user calls a lift to a floor that is already a destination of a suitable given lift, this lift will be displayed in the modal and no call will be made to the API.
- It is assumed the API will always be able to return a response with an available lift. If an error occurs, the error will be logged. More advanced error handling can be implemented when the API is more mature.
