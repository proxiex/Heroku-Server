Hello-Book

Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc.
Features

    Create an account.
    Login with you new details.
    Add books to library.
    View all books in library.
    Borrow and return books.

Installation

To install this application,

    git clone this repository
    Open the command line and cd into the folder you just cloned
    Run npm install to install dependencies
    Then run npm start:dev to start the application

Built with

    NodeJS - A Javscript runtime built runtime that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
    ExpressJS - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
    PostgreSQL - A powerful, open source object-relational database system.
    Sequelize - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.

API

The routes currently specified in the application are as follows:

    '/api/users/signup'
        POST - Creates a new user using a username, email and password.

    '/api/users/signin'
        POST - Allows an already existing user to sign in into the application with a username and password.

    'api/books'
        POST - Creates a new book in the library

    'api/books/:bookId'
        PUT - Enables User to edit or update information about a book.

    'api/books'
        GET - Rettrieve all books in library
