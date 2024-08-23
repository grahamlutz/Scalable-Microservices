# ticketing_microservices

To start, run:

`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/cloud/deploy.yaml`

`skaffold dev `

To set an env var in this kubernetes environment, run

`kubectl create secret generic jwt-secret --from-literal JWT_KEY=<put-whatever-you-want-as-a-key-here>`
