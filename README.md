## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/get-npm) (v6 or later)
- [Firebase CLI](https://firebase.google.com/docs/cli)

## Firebase Setup

1. **Create a Firebase Project**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the steps to create a new Firebase project.

2. **Add a Service Account**
   - Navigate to `Project Settings` > `Service accounts`.
   - Click on `Generate new private key` and download the JSON file. Save this file as `key.json` in the root directory of your project.

3. **Enable Firestore**
   - In the Firebase Console, go to `Firestore Database` and click on `Create database`.
   - Follow the steps to set up Firestore in production or test mode.

## Project Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kenanargya/SkyAfra.git
   cd SkyAfra
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   ```bash
   JWT_SECRET=your_jwt_secret
   ```
   
4. Add Firebase Key
   Place the key.json file you downloaded from the Firebase Console in the config directory.

## Usage

**Running the Server**
```bash
node app.js
```
The server will run on http://localhost:8080 by default.

## API Endpoints

1. **Register**
   - URL: `/auth/register`
   - Method: `POST`
   - Headers: Content-Type: `application/json`
   - Body:
   ```json
      {
     "email": "user@example.com",
     "username": "user123",
     "password": "password123"
      }
     ```
   
   ![Screenshot 2024-06-05 005340](https://github.com/kenanargya/SkyAfra/assets/71255346/98e331c2-0c01-4905-af4f-c4038e3ceeee)

2. **Login**
   - URL: `/auth/login`
   - Method: `POST`
   - Headers: Content-Type: `application/json`
   - Body:
   ```json
      {
     "email": "user@example.com",
     "password": "password123"
      }
     ```
   
   ![Screenshot 2024-06-05 005632](https://github.com/kenanargya/SkyAfra/assets/71255346/b1d7eb4f-c3af-47e3-bc48-78dcf4778daf)

3. **Logout**
   - URL: `/auth/logout`
   - Method: `POST`
   - Headers:
      - Content-Type: `application/json`
      - Authorization: `Bearer your_jwt_token`
   - Body:
   ```json
   {}
   ```
   
   ![Screenshot 2024-06-05 010401](https://github.com/kenanargya/SkyAfra/assets/71255346/f647a4ac-252e-43ac-a6e3-96f66e0cfbe8)
