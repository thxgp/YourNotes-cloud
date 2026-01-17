# Project Plan: Secure Containerized Application

## 1. Project Overview
**Title**: Secure Containerized Application in the Public Cloud
**Objective**: To design, deploy, and secure a containerized Node.js application using industry-standard DevSecOps practices.

## 2. Timeline & Milestones
| Phase | Duration | Activities | Status |
|-------|----------|------------|--------|
| **Phase 1: Planning** | Week 1 | Requirement gathering, Architecture design, Stack selection | [x] Completed |
| **Phase 2: Development** | Week 2 | Application coding, Containerization (Docker), Local testing | [x] Completed |
| **Phase 3: Infrastructure** | Week 3 | VPC Design, Terraform setup, IAM configuration | [x] Completed |
| **Phase 4: Security** | Week 3 | Hardening Dockerfile, RLS Policies, Vulnerability Scanning | [x] Completed |
| **Phase 5: Orchestration** | Week 4 | Kubernetes deployment, Service mesh, Ingress setup | [x] Completed |
| **Phase 6: Reporting** | Week 5 | Documentation, Final Report, Presentation | [In Progress] |

## 3. Methodology
We utilized the **DevSecOps** methodology, integrating security at every stage:
*   **Plan**: Threat modeling and Architecture review.
*   **Code**: Secure coding practices (SAST).
*   **Build**: Minimal base images (Alpine), Non-root users.
*   **Test**: Vulnerability scanning (Trivy).
*   **Deploy**: Infrastructure as Code (Terraform), Orchestration (K8s).
*   **Monitor**: Logging and Incident Response.

## 4. Resource Allocation
*   **Development**: VS Code, Node.js, Git
*   **Containerization**: Docker Desktop
*   **Cloud Provider**: AWS (Simulated via Terraform), Render (PaaS)
*   **Security Tools**: Trivy, Snyk, Clerk (IAM)
