# iMIS

## Installation and Setup

1. **Install Git**  
   Download Git from [https://git-scm.com/download/win](https://git-scm.com/download/win)  
   Choose the 64-bit Git for Windows Setup.

2. **Download PostgreSQL and pgAdmin**  
   Visit [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)  
   Click "Download the Installer."

3. **Download Python**  
   Get Python from [https://www.python.org/downloads/](https://www.python.org/downloads/)

   - Check "Admin privileges" when installing `py.exe`.
   - Check "Add python.exe to PATH."
   - Click "Customized installation."
   - Check "Install Python for all users."

4. **Download Node.js**  
   Visit [https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)  
   Download the LTS version.

5. **Download VS Code**  
    Download from [https://code.visualstudio.com/download](https://code.visualstudio.com/download)

   **Install the following extensions:**

   - Prettier
   - Python
   - Django
   - ES7 React/Redux/GraphQL/React-Native snippets
   - JavaScript (ES6) code snippets

6. **Download dependencies for frontend**

   - Navigate to the `frontend` folder.
   - Run the command: `npm i`
   - Check if the frontend app can run successfully: `npm run dev`

7. **Download dependencies for backend**

   - Navigate to the `backend` folder.
   - Run the command: `pip install -r .\requirements.txt`
   - Check if the backend server can run successfully: `python manage.py runserver`

8. **Connect to Database**

   - Open pgAdmin and create a new database.
   - Go to the `backend/backend/settings.py` file.
   - Update the `DATABASES` block with the new database name and password.

9. **Data Schema Migration**

   - Run: `python manage.py makemigrations`
   - Then: `python manage.py migrate`

10. **Run historical migrations scripts**
    - Navigate to the `historical_migrations` folder.
    - Run: `python import_parts.py`
    - Run: `python import_companies.py`

## Running the App

### On Mac:

1. Navigate to the `iMIS` folder.
2. Run the script: `./start-app-mac.sh`

### On Windows:

1. Navigate to the `iMIS` folder.
2. Run the script: `start-app-windows.bat`
   or double click the start-app-windows.bat file

## Modification

1. **Migrate whenever you change the data model.**
   - Run: `python manage.py makemigrations`
   - Then: `python manage.py migrate`
