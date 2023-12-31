# Smart Elevator Client

This repository is the client for the [smart-elevator](https://github.com/samueljacobs98/smart-elevator) project using React, SCSS, axios, Jest, and React-testing-library.

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
to have a different base url, add the following to the `.env` file:

```
REACT_APP_API_URL=<api base url>
```

The default polling interval is 10 seconds. If you require a different polling interval,
add the following to the `.env` file:

```
REACT_APP_POLLING_INTERVAL="10"
```

5. Run the client using `npm start`.
6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you require a dummy server to be running locally, follow the instructions in the [server repository](../server/README.md).

## Testing

To run the tests, run `npm test`.

When creating a pull request, the tests will be run automatically using GitHub Actions. A build will also be run to ensure the application builds successfully.

## Developer's Notes

### Assumptions and Design Decisions

- If the floor the user is on is not a destination of a given lift it will not be expected to stop at that floor. Therefore, if the lift is not currently on the user's floor, it should not be listed on the panel.
- As there could be multiple panels, it is assumed that the state management of the system is all handled by the backend. Ideally, an approach such as a WebSocket would allow live updates to the panels. Since the system state data is retrieved from the backend via a REST API, a polling approach has been used to update the state of the panel. The polling interval is configurable via the `.env` file.
- If a user calls a lift to a floor that is already a destination of a suitable given lift, this lift will be displayed in the modal and no call will be made to the API.
- It is assumed the API will always be able to return a response with an available lift. If an error occurs, the error will be logged. More advanced error handling can be implemented when the API is more mature.
- It is assumed the backend won't incorrectly return a lift for a given floor that is not on its `serviced_floors` list..
- Where animations have been used, they have been created in the file that uses them. If the application were to grow and animations reused, it would be better to create a separate file for animations to avoid duplication.

### Future Improvement Ideas

#### Top Priority

- Add App.test.jsx for the `App` component.
- Completed the unit tests for the `ButtonPanel` component.
- Add integration and end-to-end tests.
- Improve error handling (**blocker**: requires the API to be more mature).

#### Other

- Add request and response data validation using a library such as [yup](https://www.npmjs.com/package/yup)
- Use a WebSocket for live updates to the panel and delegate all lift-related state management to the backend.
- Incorporate lift location relative to the panel into the config so that the user can be accurately informed of the lift's location.
- Currently, to indicate that a lift is at the current floor, it is highlighted in yellow and made bold. However, this isn't very accessible. An alternative approach would be better. A key could be added to dictate what the yellow and bold means, though the yellow doesn't benefit people with colour-blindness. Collaboration with a UX designer would be beneficial.
