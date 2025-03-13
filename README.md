Email Writer Assistance

<img width="1920" alt="Screenshot 2025-03-13 at 14 28 13" src="https://github.com/user-attachments/assets/c45a870c-215b-44a2-8cd4-3a4bbef18afb" />
Overview


Email Writer Assistance is an AI-powered tool designed to generate professional email replies using the Gemini API. The backend is built with Spring Boot, and the tool integrates with Gmail to provide AI-generated responses directly in the compose window.

Features

AI-generated email replies using the Gemini API

Customizable tone for email responses

Spring Boot backend to handle API requests

Chrome extension for Gmail integration

Technologies Used

Backend: Spring Boot, Spring AI, WebClient

Frontend: JavaScript (content script for Gmail integration)

API: Gemini AI

Storage: Local Storage for settings

Installation

Backend Setup

Clone the repository:

git clone https://github.com/your-repo/email-writer-assistance.git
cd email-writer-assistance

Set up environment variables:

gemini.api.url: URL of the Gemini API

gemini.api.key: Your API key for authentication

Build and run the Spring Boot application:

mvn spring-boot:run

Chrome Extension Setup

Navigate to chrome://extensions/ in Google Chrome.

Enable "Developer mode" (toggle at the top right).

Click "Load unpacked" and select the extension folder.

Usage

Open Gmail and start composing a reply.

Click the AI Reply button to generate a response based on the email content.

The generated text will be inserted into the compose box.

API Endpoints

POST /api/email/generate

Generates an AI-powered email reply.

Request Body:

{
  "emailContent": "Original email text here",
  "tone": "professional"
}

Response:

"Generated email response text here"

Project Structure

/email-writer-assistance
│── src/main/java/com/email
│   ├── controller/EmailGeneratorController.java
│   ├── service/EmailGeneratorService.java
│   ├── app/EmailRequest.java
│── extension/
│   ├── content.js (Gmail integration script)
│   ├── content.css (Styling)
│   ├── manifest.json (Chrome extension manifest)
│── README.md

Contributing

Fork the repository.

Create a new branch: git checkout -b feature-branch

Commit changes: git commit -m 'Add new feature'

Push to the branch: git push origin feature-branch

Submit a pull request.

License

This project is licensed under the MIT License.


