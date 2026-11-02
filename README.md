# Containerization & Kubernetes Deployment

A simple Node.js (Express) app, containerized with Docker and deployed on Kubernetes with 3 replicas and a NodePort Service.

## Endpoints
- `/` returns a greeting with the pod hostname (shows load balancing)
- `/health` returns `OK` (used by readiness and liveness probes)

## Project structure
```
Dockerfile        .dockerignore     app.js     package.json
k8s/deployment.yaml   k8s/service.yaml   screenshots/
```

## Docker
```bash
docker build -t k8s-demo-app:1.0 .
docker images
docker run -d -p 3000:3000 --name demo k8s-demo-app:1.0
docker ps
curl http://localhost:3000
docker logs demo
docker stop demo && docker rm demo
```

## Kubernetes
```bash
# local cluster (Codespaces): kind create cluster
kind load docker-image k8s-demo-app:1.0
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get deployments
kubectl get pods -o wide
kubectl get svc
```

Access the app:
```bash
kubectl port-forward svc/demo-app-service 8080:80      # then open port 8080
```
Show load balancing (hostname changes):
```bash
kubectl run curl-test --rm -it --image=curlimages/curl --restart=Never -- sh -c 'for i in 1 2 3 4 5 6 7 8 9 10; do curl -s demo-app-service; echo; done'
```
Self-healing and scaling:
```bash
kubectl delete pod <pod-name>
kubectl scale deployment demo-app --replicas=5
kubectl scale deployment demo-app --replicas=3
```

## Dockerfile optimizations
Alpine base image, dependency layer caching (package.json copied first), `.dockerignore`, production-only dependencies, non-root user.

## Screenshots
Add your screenshots in the `screenshots/` folder and list them here:
- `docker build`, `docker images`, `docker ps`, `curl` output
- `kubectl get deployments / pods / svc`, `describe pod`, `logs`
- App in browser through the Service, load-balancing output
