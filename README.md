# docker-php-debugger
A Docker container that is designed to let you debug PHP Scripts using Visual Studio Code and XDebug

## Instructions for Installation and Configuration:

1. Clone the repo to a folder on your system.
2. Navigate into the cloned folder.
3. Run the following command: `docker-compose build`

    * This command builds the image and installs Xdebug
4. You will need to change some options in the configuraiton files
    
    * The default port for Xdebug is 9000, but if that port is already taken, you will need to change the ports settings in docker-compose.yml under "web" to whichever port you want to use.  
    * You will also need to change the port number in xdebug.ini at xdebug.remote_port  
    * In docker-compose.yml you will need insert your computer's IP address at remote_host=
5. Open Visual Studio Code then open the repo folder
6. Be sure to install PHP Debug in Visual Studio
7. Click on the debug section on the side tab. Click on the configuration drop down and select "add configuration", then select PHP.
8. Replace the contents of the newly created confgiuration with the contents of launch.json, included in the repo.
    * If you changed the default port from 9000 to another value, you will need to replace that port number in this configuration file.
9. Once the image is finished being made, the server is configured and VS Code is configured, start the PHP server with the following command:
    * `docker-compose up`
    * You can navigate to the running webserver at [http://localhost:8000](http://localhost:8000)
    * phpinfo() is loaded by default at this address. You can confirm that Xdebug is listed in the info page

## Instructions for Use

1. Open up the included "index.php" file in visual studio code and select a breakpoint.
2. From the debug tab, select "Listen for XDebug" and click the green play button.
3. Load the page at [http://localhost:8000](http://localhost:8000)

Visual Studio Code should display information about the script and the browser window should halt.