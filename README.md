# Barbapp

Barbapp is a web application designed to connect barber shops, beauty shops, and professionals within the beauty industry with potential customers. The platform allows users to search for services, book appointments, and leave reviews, while shop owners can manage their services, staff, and client interactions.

## Table of Contents

-   [Features](#features)
-   [Technology Stack](#technology-stack)
-   [Installation](#installation)
    -   [Backend Setup](#backend-setup)
    -   [Frontend Setup](#frontend-setup)
-   [Running the Application](#running-the-application)
    -   [Backend](#backend)
    -   [Frontend](#frontend)
-   [Environment Variables](#environment-variables)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   User authentication with OAuth2 (Google)
-   Role-based access control (customers, shop owners, and employees)
-   Profile management
-   Appointment booking system
-   Service management for shop owners
-   Review and rating system
-   Responsive design

## Technology Stack

-   **Frontend:** React, Redux, Tailwind CSS
-   **Backend:** Django, Django REST Framework
-   **Database:** PostgreSQL
-   **State Management:** Redux
-   **Authentication:** Google OAuth2, Django Sessions
-   **Deployment:**

## Installation

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/serjt12/barbapp.git
    cd barbapp

    1.  Set up a virtual environment:

     python3 -m venv env source env/bin/activate

    ```

2. Install backend dependencies:

    pip install -r requirements.txt

3. Set up the PostgreSQL database:

    Create a PostgreSQL database and user, then update the database settings in settings.py.

4. Apply migrations:

    python manage.py makemigrations python manage.py migrate

5. Create a superuser:

    python manage.py createsuperuser

6. Start the Django development server:

    python manage.py runserver

### Frontend Setup

1.  Navigate to the frontend directory:

    cd frontend

2.  Install frontend dependencies:

    npm install

3.  Start the React development server:

    npm start

## Running the Application

### Backend

The Django backend runs on `http://localhost:8000`. Use the following command to start the server:

python manage.py runserver

### Frontend

The React frontend runs on `http://localhost:3000`. Use the following command to start the development server:

npm start

## Environment Variables

The application requires the following environment variables:

-   SECRET_KEY: Django secret key
-   DEBUG: Set to `True` for development, `False` for production
-   DATABASE_URL: PostgreSQL database URL
-   GOOGLE_CLIENT_ID: Google OAuth2 Client ID
-   GOOGLE_CLIENT_SECRET: Google OAuth2 Client Secret

Create a `.env` file in the root of your project and add the necessary variables.

## Usage

1.  Visit the homepage: Explore services and search for beauty professionals in your area.
2.  Register/Login: Users can register using Google OAuth2 or log in if they already have an account.
3.  Book Appointments: Browse available services and book appointments with your chosen service provider.
4.  Manage Services: Shop owners can add, edit, or remove services offered at their shop.
5.  Leave Reviews: Customers can leave reviews and rate their experience after receiving a service.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature-name`.
3.  Make your changes.
4.  Commit your changes: `git commit -m 'Add some feature'`.
5.  Push to the branch: `git push origin feature-name`.
6.  Submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
