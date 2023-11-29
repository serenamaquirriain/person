# person

1. For this project to run successfully, it is necessary to have installed PostgreSQL.
The project also requires the user to create a database called 'persondb.'
The name may vary, but it will be necessary to update it in the .env file, along with
the other credentials for launching the project.

2. Once that is set, the user should open two terminals. In one, he should be in the source directory
and run the command
    npm run build
Alternatively, he may skip this step and use the /dist that ships with the project.

4. Run
    npm start
To start the database server.
The output 'Database connected. Server on port' indicates a successful connection.

3. On the other terminal, the user should be in the client directory. From the root of the project, the user
may do this with the following command
    cd client

4. All that is left to do is run
    npm start
To launch the React application in the web browser

