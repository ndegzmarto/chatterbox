# ChatterBox AI: Your AI Chat Assistant

## Overview

ChatterBox AI is a simple yet powerful AI chat application built with a FastAPI backend and a Next.js frontend. It allows users to have conversations with an AI assistant and review their conversation history.  The UI is inspired by modern chat applications, providing a clean and intuitive experience.

## Features

-   **AI Chat:**  Engage in conversations with the AI assistant, powered by a language model (e.g., Llama 3 by Meta).
-   **Conversation History:** Review past conversations in an organized, easily accessible format.  History is stored in a SQLite database for persistence.
-   **Clean UI:**  A dark-themed, intuitive user interface based on modern chat application designs.
-   **Collapsible Sidebar:**  Hide or expose the navigation bar with a simple arrow button for a focused chat experience.
-   **Timezone Support:** Displays timestamps in the East Africa Time (EAT) timezone.

## Technologies Used

-   **Backend:**
    -   FastAPI:  A modern, fast (high-performance), web framework for building APIs with Python 3.7+
    -   SQLite:  A lightweight, disk-based database for storing conversation history.
    -   SQLAlchemy:  Python SQL toolkit and Object-Relational Mapper.
-   **Frontend:**
    -   Next.js:  A React framework with hybrid static & server rendering, TypeScript support, and smart bundling.
    -   Tailwind CSS:  A utility-first CSS framework for rapidly building custom designs.

## Setup Instructions

### 1. Clone the Repository

	
	git clone https://github.com/ndegzmarto/chatterbox
 	cd chatterbox
	


### 2. Backend Setup (FastAPI)

1.  **Navigate to the backend directory:**

    ```
    cd backend
    ```
2.  **Create a virtual environment (recommended):**

    ```
    python3 -m venv .venv
    source .venv/bin/activate  # On Linux/macOS
    .venv\Scripts\activate  # On Windows
    ```
3.  **Install dependencies:**

    ```
    pip install -r requirements.txt
    ```
4.  **Set up environment variables:**

    -   Create a `.env` file in the `backend` directory.
    -   Add your OpenAI API key (or any other required environment variables):

        ```
        OPENAI_API_KEY=your_openai_api_key
        ```
5.  **Run the backend server:**

    ```
    uvicorn app.main:app --reload
    ```

    The API will be available at `http://127.0.0.1:8000`.  You can view the interactive API documentation at `http://127.0.0.1:8000/docs`.

### 3. Frontend Setup (Next.js)

1.  **Navigate to the frontend directory:**

    ```
    cd ../frontend
    ```
2.  **Install dependencies:**

    ```
    npm install
    # or
    yarn install
    ```
3.  **Run the frontend development server:**

    ```
    npm run dev
    # or
    yarn dev
    ```

    The frontend will be available at `http://localhost:3000`.

### 4. Database Setup (SQLite)

-   The backend uses SQLite, and the database file (`queries.db`) is automatically created when the backend runs for the first time.
-   **Note:** It's recommended not to commit the `queries.db` file to version control. Add it to your `.gitignore` file.  Instead, version control your database schema (e.g., SQLAlchemy models).

### 5. CORS Configuration

Ensure that your FastAPI backend has CORS (Cross-Origin Resource Sharing) enabled to allow requests from your Next.js frontend.  Add the following middleware to your FastAPI application:
	```
	from fastapi.middleware.cors import CORSMiddleware

	app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:3000"], # Replace with your frontend's origin
	allow_credentials=True,
	allow_methods=[""],
	allow_headers=[""],
	)

	```


## Usage

1.  Start both the backend and frontend servers.
2.  Open your browser and go to `http://localhost:3000`.
3.  You will see the chat UI. Type your questions in the input area and press send.
4.  The AI assistant will provide responses.
5.  Click on the history list entries to load previous questions and answers.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

- The Unlicensed

