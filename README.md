# Whats my IP - David Balko

A small code that create a server that returns the client's IP, with /ready and /health routes that return status code 200 as well.
The repo's CI process is using Github Actions.

There is no need to spin up a local cluster - the cluster that I use here is a minikube cluster that is living in an EC2 machine. I will send the pem key to the machine by email, so you can ssh to it and play with the cluster itself.

## CI process

The CI process is divided into two parts: Pull request and push

### PR
On PR, there is an automated lint check and unit tests.
The steps are simple:
Checkout the code, run 'npm install', run 'npx eslint' - which is the linter, and run 'npm test' - which uses the 'Jest' library to test the 3 routes of the app.

Only if the tests have passed, the PR will be allowed to merge with the 'main' branch.

### Push
On push, we build a docker image, push it to dockerhub, scan it with Trivy and save the result in the Github Actions artifact section (every action can save files that will be available to download), then if there are HIGH/CRITICAL vulnerabilities, the build will fail.
After that, I use a self hosted runner, which is the same EC2 machine that runs my cluster, to run 'helm lint' and then upgrade the helm release to use the new image, and then run a simple smoke test - curl to the main route of the app.
The reason I use the self hosted runner is so I can have easy access to the kubernetes cluster that sits in that same EC2 machine, for deploying and running the smoke test. In minikube, you have to use a service from the 'NodePort' type in order to be able to communicate with the pod from the machine itself, so this is what I'm doing here.
After that, using the github default runner again, there are two steps which only one will run at a time - one at failure and the other at success. Both steps publish a Slack notification about the result of the pipeline. I will email the slack invite link for the notifications channel.


## Helm chart

The helm chart is pretty simple, the default chart created by 'helm create' has almost everything that is asked, but I still had to add the option to provide environment variables by configmap or by secret.
To provide environment variables through a kubernetes secret, you have to create a secret yourself, and every key-value pair would get to the pod with the same name and value. You also have to name the secret the same name as the release name.
There is an option to have an Ingress resource as well, but I didn't add an ingress controller to the cluster so it won't work.
Apart from that - you can edit the resource requests and limits for the deployment, the replica number, the service type, add pod annotations, edit liveness and readiness probes and a some more.
