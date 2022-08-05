# Technical Challenge

## A todo-list created in React with TypeScript and styled with SCSS to demonstrate technical skill.

### Technologies Used

- Language: TypeScript
- UI: React 18 (with React Hooks)
- Styling: SCSS
- Build Tool: Parcel
- Testing: Jest

#### Libraries

- Random UUIDs for tasks: [`uuid`](https://www.npmjs.com/package/uuid)
- Drag and Drop functionality: [`react-sortablejs`](https://www.npmjs.com/package/sortablejs)
- Error Toasts: [`react-toastify`](https://www.npmjs.com/package/react-toastify)

### Features and Functionality

- User can create tasks.
  - User can associate a color with each of their tasks.
  - User can attach an Image URL to their tasks.
- User can view all tasks.
- User can mark tasks as "done" and differentiate them from incomplete tasks.
- User can remove tasks.
  - User can remove all tasks marked as "done" with a single button.
- User can filter tasks by state ("all", "active", "completed").
- User can search for tasks in search bar.
- User's data is automatically saved in Local Storage.
  - If user doesn't have any previous data in Local Storage, loads default data from JSON array of Todo objects.
- User can drag and drop todos to reorder them.
  - If user is currently searching or is filtering list, the feature is disabled.
- User can navigate the site with keyboard controls.

### Development

#### System Requirements

- Node.js

#### Steps

- Clone the repository.
- Use `npm i` to install dependencies.
- Use `npm run dev` to launch test server.
- Use `npm test` to run test scripts.
- Use `npm run test:watch` in a separate terminal to run tests upon file save.

NOTE: `/docs` has the pre-built site for local previewing via local server or through GitHub Pages.
