# Social Network API

![License](https://img.shields.io/badge/License-BSD-blue.svg)

## Description
The Social Network API is a back-end application designed to power a social networking web platform. It utilizes **Express.js** for routing, **MongoDB** for data storage, and the **Mongoose ODM** for data modeling. This API enables users to share their thoughts, react to friends’ posts, and manage a friend list. Built to handle large volumes of unstructured data efficiently, it meets the following core requirements:

- **User Management:** Create, update, and delete user profiles. User data is linked to their posted thoughts and friend connections.
- **Thoughts and Reactions:** Users can post new thoughts (with support for a 1-280 character limit), update or delete them, and add reactions as sub-documents to existing thoughts.
- **Friend Functionality:** Easily add or remove friends from a user’s friend list, with associated updates to the user’s data.
- **Testing & Validation:** All routes (GET, POST, PUT, DELETE) are verified via Insomnia, ensuring that the API returns formatted JSON and performs the proper CRUD operations on the MongoDB database.

This project adheres to the user story of providing a robust NoSQL-based API for a social media startup, ensuring that the website can manage large amounts of unstructured data while offering a seamless user experience.

## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [Walkthrough Video](#Walkthrough-Video)
- [Contribution](#Contribution)
- [Tests](#Tests)
- [License](#License)
- [Questions](#Questions)

## Installation
To set up the project locally, follow these steps:
1. **Clone the Repository:**  
   ```bash
   1. git clone https://github.com/hazyplebian/Social-Network-API
   2. cd main
   3. npm install

## Usage

Start the API server with the following command:

npm start

Once the server is running, you can test the API endpoints using Insomnia or any other REST client. The routes support creating, reading, updating, and deleting users, thoughts, friend lists, and reactions, ensuring all functionality meets the acceptance criteria.

## Walkthrough Video
https://drive.google.com/file/d/1Oy_UjO4evc2-DnsonpU7ViOagdvqGzlD/view

## Contribution
Contributions are welcome! If you have ideas, improvements, or bug fixes:

Fork the repository.

Create a new branch for your feature or fix.

Submit a pull request with detailed information about your changes.

## Tests
To test the API:

Start the server:

npm start

Use Insomnia (or a similar REST client) to test the following endpoints:

Users: GET all users, GET a single user by ID (with populated thoughts and friends), POST a new user, PUT updates, and DELETE a user.

Thoughts: GET all thoughts, GET a single thought, POST a new thought (ensure the thought ID is pushed to the associated user's thoughts array), PUT updates, and DELETE a thought.

Friends: POST to add a friend, and DELETE to remove a friend.

Reactions: POST to create a reaction in a thought’s reactions array, and DELETE to remove a reaction by its ID.

## License

This project is licensed under the BSD license.

## Questions
For further questions or feedback, please contact me at:

Email: michael.mangieri@yahoo.com

GitHub: hazyplebian