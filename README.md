# Redux Authentication App
  - Project Overview
      - This is a React and Redux-based authentication app that manages user authentication with username and password. The app stores user data in localStorage and provides protected routes for authenticated users.

  - Features
      - User authentication (Signup & Login)
      - Protected routes for Counter and Todo pages
      - State management using Redux (with Redux Toolkit)
      - Data persistence using localStorage

  - Usage
      - Signup
          - Users can register with an email, username, and password. The registration process stores user data but does not log in the user automatically.
    
      - Login
          - Users log in with their registered username and password. After successful login, they can access protected routes.
    
      - Protected Pages
          - Counter Page: Accessible only after login.
          - Todo Page: Accessible only after login.
  
 - Technologies Used
     - React
     - Redux (with reducers, Redux Toolkit)
     - Vite
     - localStorage
