[![Build Status](https://travis-ci.com/JacopoDaeli/codito-jan2017.svg?token=yeGiy41t7dXuXzCiGV4X&branch=master)](https://travis-ci.com/JacopoDaeli/codito-jan2017)

# codito-jan2017
Presentation repository at Codito Ergo Sum hosted by TheFamily in Paris, Jan 19th 2017. Edit

### Demo
- Create a K8S cluster
- Get the cluster credentials

- Create a Private GitHub repo containing your application code, etc.

- Create and add the Dockerfile
- Build and test the Docker image
- Push the Docker image in GCR: `gcloud docker -- push gcr.io/tribe-testing/codito-jan2017:pre`

- Create the K8S deployment and allow external traffic to the application

(At this point you have the application/container running in the cluster!!!)

- Enable the created repo on Travis
- Create and add the .travis.yml and deploy.sh file
- Run `chmod +x resources/deploy.sh` to give execution permission to the deploy.sh file

- Create and download a gcloud key in JSON format
- Run `cat gcloud.json | base64` and copy the output
- Create a secret `GCLOUD_SERVICE_KEY` variable in the Travis repo settings

- Commit the everything

### Build and test the container
```
docker build -t gcr.io/tribe-testing/codito-jan2017:pre .
docker run -d -p 8080:8080 --name codito_jan2017 gcr.io/tribe-testing/codito-jan2017:pre
```

### Get cluster credentials
```
gcloud --quiet config set project tribe-testing
gcloud --quiet config set container/cluster cluster-codito-jan2017
gcloud --quiet config set compute/zone us-east1-b
gcloud --quiet container clusters get-credentials cluster-codito-jan2017
```

### Create the deployment
```
kubectl run codito-jan2017 --image=gcr.io/tribe-staging/codito-jan2017:pre --port=8080
kubectl expose deployment codito-jan2017 --type="LoadBalancer"
```

### Connect to the cluster
```
gcloud container clusters get-credentials cluster-codito-jan2017 --zone us-east1-b --project tribe-testing
kubectl proxy
```

### Scale up the application (optional)
```
kubectl scale deployment codito-jan2017 --replicas=3
```
