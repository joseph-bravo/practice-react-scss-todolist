# Frontend Technical Challenge for Focus 360

## A todo-list created in React with TypeScript and styled with SCSS to demonstrate technical skill.

### Technologies Used

- Language: TypeScript
- UI: React 18 (with React Hooks)
- Styling: SCSS
- Build Tool: Parcel
- Testing: Jest

#### Libraries

- Random UUIDs for tasks: [`uuid`](https://www.npmjs.com/package/uuid)
- Animations: [`@formkit/auto-animate`](https://auto-animate.formkit.com/)

### Features and Functionality

- User can create tasks.
- User can view all tasks.
- User can mark tasks as "done" and differentiate them from incomplete tasks.
- User can remove tasks.
  - User can remove all tasks marked as "done" with a single button.
- User can filter tasks by state ("all", "active", "completed").
- User can search for tasks in search bar.
- User's data is automatically saved in Local Storage.
  - If user doesn't have any previous data in Local Storage, loads default data from JSON array of Todo objects.

### Development

#### System Requirements

- Node.js

#### Steps

- Clone the repository.
- Use `npm i` to install dependencies.
- Use `npm run dev` to launch test server.
- Use `npm test` to run test scripts.
- Use `npm run test:watch` in a separate terminal to run tests upon file save.
