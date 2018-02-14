# open ports (8025,8080)

# docker
sudo apt-get remove docker docker-engine docker.io
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce -y
sudo usermod -aG docker ${USER}

# docker-compose
sudo apt install docker-compose -y
sudo reboot

# transfer.sh
docker run -d -p 8025:8080 dutchcoders/transfer.sh:latest --provider local --basedir /tmp/
# curl --upload-file <filepath> http://<url>/<filename>
# curl http://<url>/<prefix>/<filename> -o- > ~/<filename>

docker build -t mhsallam/bxcli -f ./bxcli.dockerfile

# drone ci
curl -L https://github.com/drone/drone-cli/releases/download/v0.8.0/drone_linux_amd64.tar.gz | tar zx
sudo install -t /usr/local/bin drone