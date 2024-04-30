# Radar



## Getting Started (running on localhost)

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before you begin, ensure you have the following installed:

* Node.js and npm (Node Package Manager)
* Git (for cloning the repository)

### Installing

Follow these steps to get your development environment running

1. Clone the repository:
    ```
    git clone https://github.com/Martin19999/Radar.git
    ``` 
1. Install the necessary packages for the frontend::
    ```
    cd [project directory name]/client
    npm install
    ```
1. Install the necessary packages for the backend::
    ```
    cd ../server
    npm install
    ```
1. Run back-end server:
    ```
    npm run dev
    ```
1. Go to app(client) folder, run the front-end application:
    ```
    cd ../app
    npm run start
    ```
1. The application should now be running on localhost. You can access the frontend at http://localhost:3000 



## Deployment




## Running the tests

For testing the application, use the following commands:

### Frontend Tests with Cypress

To run end-to-end tests for the frontend:

```
cd client
npm run cypress
```

### Backend Tests with Jest

To run automated tests for the backend:

```
cd server
npm test
```


## Built With

* React.js - The frontend framework 
* Express.js - The backend framework
* Cypress - Testing for frontend
* Jest - Testing for backend


## Authors

* **Jianhao Feng** - *Initial work* - (https://github.com/Martin19999)



## Acknowledgments


