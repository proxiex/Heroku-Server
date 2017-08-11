# Hello-Book

Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc.
**Features**
 * Create an account with Hello Books.
 * Login to Hello Books.
 * Add books to library.
 * View all books in library.
 * Borrow and return books.
 * View all Borrowed book
 * View all Borrowed books that are not returned

## Installation

To install this application,
    * git clone this repository
    * Open the command line and cd into the folder you just cloned
    * Run ```npm install ``` to install dependencies
    * Then run ```npm start``` to start the application

## Created with
   1 **NodeJS** -  is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world. READ MORE https://nodejs.org/
   
   2 **ExpressJS** - Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love. Its a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints https://expressjs.com/.
    
   3 **PostgreSQL** - A powerful, open source object-relational database system.
    
   4 **Sequelize** - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.

# API

The routes currently specified in the application are as follows:

    /api/v1/users/signup
        * GET - Get's displays the registratin page
        
    /api/v1users/signup
        * POST - Crates a user
        
    /api/v1/users/signin
        * POST - Sign's in
        
    /api/v1/books
        * GET - Get's all books in the library
        
    /api/v1/books
        * POST - Add's a book to the libray
        
    /api/v1/books/:bookId/
        * GET - Get's on specific boook
    
    /api/v1/books/:bookId/
        * PUT - Updates a specific book

    /api/v1/users/:userId/books
        * POST - Allows a user to borrow a book
        
    /api/v1/users/:userId/books
        * GET - Allows a user to View Yet to return books
        
    /api/v1/users/:userId/books
        * PUT - Allows a user to return a book
    
    api/v1/users/:userId/books/history
        * GET - Allow a user to view borrowed book histor
