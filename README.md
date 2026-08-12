# Smart Ecommerce

Smart Ecommerce is a Laravel-based backend API for a simple e-commerce application. The project currently focuses on product browsing, user authentication, OTP-based email verification and password recovery, shopping cart operations, notifications, and basic payment handling.

## Overview

This repository implements a JSON API for an online store experience. It provides endpoints for browsing products and categories, registering and authenticating users, managing a persistent cart, viewing notifications, and handling a basic checkout/payment flow.

The codebase is structured around Laravel controllers, form requests, API resources, service classes, and Eloquent models. Authentication is handled with JWT for API access, while the project also includes Laravel Sanctum support and Google OAuth integration via Laravel Socialite.

## Features

### Authentication and account management
- User registration with validation and password hashing
- Email verification through OTP codes
- Login with JWT-based API authentication
- Logout and token invalidation
- Password reset and OTP resend flow
- Google OAuth login flow

### Catalog and products
- Category listing
- Product listing and product detail retrieval
- Product image and review data included in product detail responses
- Seeded product and category data for local development

### Cart
- Create or retrieve a user cart
- Add products to the cart
- Remove products from the cart
- Cart totals are recalculated from item quantities and product prices

### Notifications
- List notifications for the authenticated user
- List unread notifications
- Mark individual notifications as read
- Mark all notifications as read
- Delete notifications

### Orders and payments
- Order and payment models are present
- A checkout endpoint creates a payment record with a simulated transaction identifier
- No third-party payment gateway integration is configured in the repository

## Technology Stack

| Technology | Purpose |
| --- | --- |
| PHP 8.3 | Backend runtime |
| Laravel 13.8 | Main application framework |
| Laravel Sanctum | API token support |
| tymon/jwt-auth | JWT authentication |
| Laravel Socialite | Google OAuth authentication |
| SQLite | Default database configuration in the example environment |
| Vite | Frontend asset bundling |
| Tailwind CSS | Frontend styling support |
| PHPUnit | Automated testing |

## Project Architecture

The application follows a conventional Laravel MVC-style structure with a clear API layer:

- Controllers handle request entry points and return JSON responses
- Form requests validate incoming data
- API resources shape the JSON payloads returned to clients
- Service classes encapsulate reusable business logic for cart operations, OTP handling, and social authentication
- Eloquent models represent users, products, categories, carts, notifications, payments, and reviews

This makes the project a backend-first API service rather than a full server-rendered web application.

## Project Structure

```text
smart-ecommerce/
├── app/
│   ├── Enums/
│   ├── Helpers/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Requests/
│   │   └── Resources/
│   ├── Mail/
│   ├── Models/
│   ├── Notifications/
│   ├── Providers/
│   └── Services/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
├── routes/
├── tests/
└── vendor/
```

Key directories:
- app/Models: core domain models such as User, Product, Cart, Order, and Payment
- app/Http: controllers, validation requests, and API resources
- app/Services: reusable business logic for cart, OTP, and social auth flows
- database/migrations: schema definitions for users, products, carts, orders, notifications, reviews, and payments
- database/seeders: sample categories, products, and a test user
- routes/api.php: API route definitions

## Installation and Setup

### Prerequisites

- PHP 8.3 or newer
- Composer
- Node.js and npm (optional, but required if you want to run the Vite frontend tooling)
- A database engine. The repository defaults to SQLite in the example environment

### Setup

```bash
git clone <repository-url>
cd smart-ecommerce
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

If you want to build the frontend assets as well:

```bash
npm install
npm run build
```

## Environment Configuration

The repository ships with an example environment file at .env.example. The most important values are:

| Variable | Purpose | Example |
| --- | --- | --- |
| APP_NAME | Application name | Smart Ecommerce |
| APP_ENV | Runtime environment | local |
| APP_KEY | Encryption key | Set via php artisan key:generate |
| APP_URL | Base URL | http://localhost |
| DB_CONNECTION | Database driver | sqlite |
| DB_DATABASE | Database name/path | database/database.sqlite |
| QUEUE_CONNECTION | Queue backend | database |
| CACHE_STORE | Cache backend | database |
| MAIL_MAILER | Mail transport | log |
| GOOGLE_CLIENT_ID | Google OAuth client ID | Not specified in the repository |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | Not specified in the repository |
| GOOGLE_REDIRECT_URI | Google OAuth redirect URI | Not specified in the repository |
| JWT_SECRET | JWT signing secret | Not specified in the repository |

> Do not commit your real .env file to the repository. Keep secrets such as OAuth credentials and JWT secrets out of version control.

## Database Setup

The project is configured to use SQLite by default in .env.example. To initialize the database locally:

```bash
php artisan migrate --seed
```

The seeders create sample categories, products, and a test user.

## Dependencies and Packages

### Backend dependencies
- laravel/framework: core Laravel framework
- laravel/sanctum: API token authentication support
- laravel/socialite: Google OAuth login integration
- laravel/tinker: interactive REPL for local development
- tymon/jwt-auth: JWT-based authentication for the API

### Development dependencies
- fakerphp/faker: test and seed data generation
- laravel/pint: code formatting
- laravel/pail: local debug/log tool
- mockery/mockery: mocking framework for tests
- phpunit/phpunit: test runner

### Frontend dependencies
- vite: build tooling
- tailwindcss: styling support
- laravel-vite-plugin: Laravel integration for Vite
- concurrently: run multiple local dev processes together

## Running the Project

### Start the API server

```bash
php artisan serve
```

### Recommended local development workflow

The project includes a Composer script that starts the Laravel server, queue worker, log viewer, and Vite dev server together:

```bash
composer run dev
```

## API Endpoints

The API routes are defined in routes/api.php.

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/verify-otp | Verify email using OTP |
| POST | /api/auth/login | Authenticate a user and return a JWT |
| POST | /api/auth/logout | Invalidate the current JWT |
| GET | /api/auth/google/redirect | Start Google OAuth login |
| GET | /api/auth/google/callback | Handle Google OAuth callback |
| POST | /api/auth/forget-password | Send a password reset OTP |
| POST | /api/auth/verify-password | Verify the password reset OTP |
| POST | /api/auth/reset-password | Reset the password |
| POST | /api/auth/resend-otp | Resend the OTP |

### Products and categories

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/categories | List categories |
| GET | /api/products | Product collection endpoint |
| GET | /api/products/{product} | Product detail endpoint |
| POST | /api/products | Admin product creation endpoint |
| PUT/PATCH | /api/products/{product} | Admin product update endpoint |
| DELETE | /api/products/{product} | Admin product deletion endpoint |

### Cart and notifications

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/cart | Get the authenticated user cart |
| POST | /api/cart/add | Add a product to the cart |
| DELETE | /api/cart/remove/{productId} | Remove a product from the cart |
| GET | /api/notifications | List notifications |
| GET | /api/notifications/unread | List unread notifications |
| PATCH | /api/notifications/{id}/read | Mark one notification as read |
| PATCH | /api/notifications/read-all | Mark all notifications as read |
| DELETE | /api/notifications/{id} | Delete a notification |

### Payments

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /api/orders/{order}/checkout | Create a payment record for an order |

## Authentication

Authentication is implemented with JWT for the main API flow. The app also includes Laravel Sanctum support and uses JWT for the authenticated routes defined in routes/api.php.

The login and registration flow is as follows:
1. A user registers through /api/auth/register.
2. An OTP is generated and sent using the mail layer.
3. The user verifies the OTP through /api/auth/verify-otp.
4. The user can then log in via /api/auth/login and receive an access token.

Protected routes such as cart and notifications require an authenticated user.

## Testing

The repository includes a basic Laravel test setup based on PHPUnit.

Run the test suite with:

```bash
php artisan test
```

The current test suite contains a simple application smoke test in tests/Feature/ExampleTest.php.

## Code Quality and Static Analysis

The project includes Laravel Pint for formatting:

```bash
./vendor/bin/pint
```

No PHPStan, Larastan, ESLint, or Prettier configuration is present in the repository.

## Queues, Jobs, and Background Processes

The project is configured to use a database-backed queue in .env.example and includes the standard jobs table migration. However, the current implementation does not dispatch custom queue jobs in the codebase. The queue worker is available for future use and is included in the local development script.

## External Services and Integrations

### Google OAuth
- Used for social authentication through Laravel Socialite
- Requires GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI values in the environment

### Mail
- OTP emails are sent through the Laravel mail layer
- The default configuration in .env.example uses the log driver, which is suitable for local development

### Payments
- The current payment flow is a simulated implementation that creates a payment record and returns a fake transaction identifier
- No real payment gateway integration is configured

## DevOps and Deployment

No Docker, Docker Compose, GitHub Actions, Kubernetes, or other deployment automation files are present in the repository.

For deployment, the application can be hosted on any PHP-compatible web server that supports Laravel. A typical production setup should include:
- PHP 8.3+
- A database server compatible with the selected connection
- A web server such as Nginx or Apache
- Queue workers if background processing is introduced
- Proper environment variables for mail, OAuth, and JWT settings

## Production Deployment Notes

A production-like deployment should include the following steps:

```bash
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

Additional operational considerations:
- Ensure the application has write access to storage and bootstrap/cache
- Configure a real mail driver instead of the local log driver when needed
- Keep APP_KEY, JWT secrets, and OAuth credentials secure
- Set APP_ENV=production and APP_DEBUG=false in production

## Security Recommendations

- Never commit the real .env file
- Keep JWT secrets and OAuth credentials private
- Use HTTPS in production
- Ensure authentication is required for protected endpoints
- Validate and sanitize all user input through form requests
- Keep dependencies updated

## Development Guidelines

The repository does not currently include project-specific contribution rules. A sensible workflow is:
- Create a feature branch for each change
- Keep changes scoped to a single concern
- Run tests before opening a pull request
- Run Pint for formatting
- Update documentation when behavior changes

## Git Workflow

```bash
git checkout -b feature/your-change
git add .
git commit -m "feat: your change"
git push origin feature/your-change
```

## Troubleshooting

### Composer install fails
- Ensure PHP 8.3+ is installed and Composer is up to date
- Check that required PHP extensions are available

### App key missing
- Run:

```bash
php artisan key:generate
```

### Database connection errors
- Verify your .env database settings
- If using SQLite, ensure the database file path is writable

### Migration errors
- Run:

```bash
php artisan migrate:fresh --seed
```

### OTP or mail issues
- Check MAIL_MAILER and related mail settings in .env
- The default example environment uses the log driver for local testing

## Project Status

Project status is not specified in the repository. The codebase appears to be an active development backend API with several implemented modules and some incomplete or placeholder areas.

## License

This project uses the MIT license, consistent with the default Laravel project structure.
