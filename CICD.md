# CI/CD Recreation Documentation
This Ci/CD documentation will be oriented for ReportHub project

## Prerequisite
1. **Docker** is about the only primary requirement you need for setting up this CI/CD server. If you are using Window and Docker is properly installed (along with docker-compose tool) and you want to use it for your CI/CD server then you can move to (Installing Drone) section
2. Docker-compose
3. Drone CLI (Optional)

##  Installation Steps
In my scenario I'm using a fresh Amazon EC2 Ubuntu instance, but you can do the same setup with Ubuntu anywhere; on virtualbox, vagrant or bare-metal.

### Installing Docker and Docker Compose
```
$ sudo apt-get remove docker docker-engine docker.io
$ sudo apt-get update
$ sudo apt-get install apt-transport-https ca-certificates curl $ software-properties-common -y
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-compose -y
$ sudo usermod -aG docker ${USER}
$ sudo reboot
```

### Installing and running Drone server
1. *Create ```drone-compose.yml``` file*: We are using [Drone](http://drone.io) for our CI/CD, and now that we have installed Docker all we need to do is polling and running drone images (Drone Server & Drone Agent).

```
version: '2'

services:
  drone-server:
    image: drone/drone
    ports:
      - 8000
      - 9000
    volumes:
      - /var/lib/drone:/var/lib/drone/
    restart: always
    environment:
      - DRONE_OPEN=true
      - DRONE_ADMIN=<your github id>,<other github ids>
      - DRONE_HOST=${HOST_SERVER}
      - DRONE_GITHUB=true
      - DRONE_GITHUB_CLIENT=${GITHUB_CLIENT}
      - DRONE_GITHUB_SECRET=${GITHUB_SECRET}
      - DRONE_SECRET=${DRONE_SECRET}

  drone-agent:
    image: drone/agent
    command: agent
    restart: always
    depends_on:
      - drone-server
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DRONE_SERVER=drone-server:9000
      - DRONE_SECRET=${DRONE_SECRET}
```
Note: Remember to replace ```<your github id>,<other github ids>``` with your actual Github ids, those gGithub users will have administration privileges on the CI/CD server.

2. *Setting Envirounment Variables*: You notice that in ```drone-compose.yml``` file we are using ${HOST_SERVER}, ${GITHUB_CLIENT}, ${GITHUB_SECRET} environment variables; and before we run ```compose up``` to execute the yaml file we need to set values into these variables.
```
$ export HOST_SERVER=http://<your aws ec2 public ip address>
$ export GITHUB_CLIENT=<your github application client id>
$ export GITHUB_SECRET=<your github application secret code>
```
Note: to generate both Github application client id and secret code
1. Go to [OAuth Apps](https://github.com/settings/developers)
2. Click *New OAuth App* button
3. In *Register a new OAuth apllication* form enter Application name, set Homepage URL to ```http://<your aws ec2 public ip address>:8000```, and *Authorization callback URL* to ```http://<your aws ec2 public ip address>:8000/authorize```

Notes:
+ If you are using your local machine as Drone server use http://localhost:8000 instead
+ We specifically set the port number to 8000 because this is the port number we have specified in ```drone-compose.yml``` file, to change it to 8080 for instance you, need to replace the line ``` - 8000``` to ```- 8080:8000``` in the yaml file.

4. *Running Drone Server*: Now that everything is in place, all you need to do is to launch drone server using the following command:

```
$ docker-compose -f drone-compose.yml up -d
```
After executing the previous command, docker will poll and run the required images. You will be able to access drone web application through this URL ```http://<your aws ec2 public ip address>:8000```

5. *Installing Drone CLI* (Optional): You might find it faster to manage drone server through cli command instead of the web application interface, and for that reason you can install Drone/CLI using the following curl command:

```
$ curl -L https://github.com/drone/drone-cli/releases/download/v0.8.3/drone_linux_amd64.tar.gz | tar zx
$ sudo install -t /usr/local/bin drone
```

### Using Drone CI/CD server
1. Go to ```http://<your aws ec2 public ip address>:8000```
2. Click on the orange *Authorize* button, and use your Github credentials, or the credentials of any of the uses you specified in ```drone-compose.yml``` file
3. To start syncing e.g. with ReportHub repo [iMMAP/rh](https://github.com/iMMAP/rh), activate the button next to the iMMAP/rh repository from the repositories list
4. To monitor build activities of the repository, click and navigate to the specific repository from the list

### Setting Up Github Repository
For the Github repository to be integrated and monitored by this server we need to add ```.drone.yml``` file to the root of the repository, in our ReportHub scenario we are using this [.drone.yml](https://github.com/iMMAP/rh/blob/master/.drone.yml) file.

I'm using certain account credentials for automating access to services like Docker Hub and BlueMix within Drone CI/CD, this secrets should not be expose directly in ```.drone.yml``` file that's why we are using drone secrets.

#### Adding Drone Secrets
There are two ways for adding drone secrets like ```docker_password```:
+ Using Drone web application you can navigate to the repository where you need to limit the usage of the secret to certain repository and then from the main menu click Secrets. Type ```docker_password``` in Secret Key field and then enter the actual password in Secret Value field.
+ The other way is by using Drone CLI:

```
$ drone secret add --repository iMMAP/rh --name docker_username --value <actual docker hub username>
$ drone secret add --repository iMMAP/rh --name docker_password --value <actual docker hub password>
```

Using the secret within .drone.yml file will be something like:

```
  api:
    image: plugins/docker
    context: api
    dockerfile: api/Dockerfile
    repo: immap/rhapi
    secrets: [ docker_username, docker_password ]
```

And might differ based on the plugin we are using

### Important Notes
 + As you can see, there are certain ports that need to be publicly accessible, e.g. if you are using AWS EC2 make sure to open these ports in that instance's Security Groups

### Adding Building Status Badge
You can add building status badge to your documentation e.g. (http://<your aws ec2 public ip>:8000/api/badges/immap/rh/status.svg)

![ReportHub Build Status](http://54.165.3.6:8000/api/badges/iMMAP/rh/status.svg)