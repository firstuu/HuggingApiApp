# Sentiment Analysis App

## Description

A React application that analyzes text sentiment using the Hugging Face API.

## Technologies Used

- **React** (19.0.0)
- **TypeScript** (4.9.5)
- **Tailwind CSS** (3.4.17)
- **React Hook Form** (7.54.2)
- **Zod** (3.24.2)
- **Hugging Face API** (Model: `twitter-roberta-base-sentiment`)

## Setup

### Prerequisites

- Node.js
- npm
- Hugging Face API key

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/sentiment-analysis-app.git
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   ```sh
   cp .env.example .env
   ```
4. **Start development server**
   ```sh
   npm start
   ```

## Development

### Scripts

- **Format code**
  ```sh
  npm run format
  ```
- **Lint code**
  ```sh
  npm run lint
  ```
- **Run tests**
  ```sh
  npm test
  ```

## Technical Challenges & Solutions

### 1. Type Safety with API Responses

- **Challenge:** Ensuring type safety for the Hugging Face API responses.
- **Solution:** Implemented Zod schemas for runtime validation and TypeScript type inference.

### 2. Form Validation

- **Challenge:** Handling form validation with proper error messages.
- **Solution:** Integrated React Hook Form with Zod for robust form validation and type safety.

### 3. State Management

- **Challenge:** Managing loading states and error handling.
- **Solution:** Implemented proper error boundaries and loading states with TypeScript types.

### 4. Code Quality

- **Challenge:** Maintaining consistent code style across the project.
- **Solution:** Set up ESLint, Prettier, and Husky for pre-commit hooks.
