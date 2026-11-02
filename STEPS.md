# Run order (copy-paste in the terminal, from the project folder)

1. docker build -t k8s-demo-app:1.0 .
2. docker run -d -p 3000:3000 --name demo k8s-demo-app:1.0
3. docker ps && curl http://localhost:3000 && docker logs demo
4. docker stop demo && docker rm demo
5. Cluster: Docker Desktop -> enable Kubernetes, OR in Codespaces:
   curl -Lo kind https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64
   chmod +x kind && sudo mv kind /usr/local/bin/ && kind create cluster
6. kind load docker-image k8s-demo-app:1.0        (kind only)
7. kubectl apply -f k8s/deployment.yaml
8. kubectl apply -f k8s/service.yaml
9. kubectl get deployments && kubectl get pods -o wide && kubectl get svc
10. kubectl port-forward svc/demo-app-service 8080:80
    (Docker Desktop alternative: open http://localhost:30007)
11. Load balancing: see README.md
12. kubectl delete pod <pod-name>, then kubectl scale deployment demo-app --replicas=5
13. Push to GitHub: git init && git add . && git commit -m "Docker and K8s" 
    then create repo, git remote add origin <url>, git push -u origin main
