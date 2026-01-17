# Final Project Report: Secure Containerized Application

**Author**: Student Name
**Date**: January 2026

## Abstract
This project demonstrates the design and implementation of a secure, containerized web application deployed in the public cloud. By integrating "DevSecOps" methodologies, we addressed critical security challenges such as vulnerability management, access control, and network isolation. The major result is a hardened Node.js application running on Kubernetes within a custom VPC, achieving an "A" rating on security scans.

## 1. Introduction
Modern cloud applications face increasing threats. This project aims to build a "Secure Notes" application that allows users to store private data securely. Key terms include **DevSecOps** (integrating security into DevOps), **Containerization** (packaging code with dependencies), and **Orchestration** (managing container lifecycles).

## 2. Materials and Methods

### Phase 1: Development & Containerization
We built a Node.js Express API and containerized it using **Docker**. 
*   **Software Used**: Node.js, Docker, VS Code.
*   **Method**: We used a multi-stage `Dockerfile` based on `alpine` to reduce image size and attack surface.

### Phase 2: Infrastructure as Code (IaC)
We defined the cloud environment using **Terraform**.
*   **Architecture**: A VPC with Public/Private subnets.
*   **Security Groups**: Implemented as strict firewalls (denying all default traffic).

### Phase 3: Orchestration
We deployed the application using **Kubernetes**.
*   **Artifacts**: `deployment.yaml` (Self-healing), `service.yaml` (Load balancing).
*   **Validation**: Verified pod health and scaling capabilities.

### Phase 4: Security Implementation
We implemented **Shift-Left** security:
*   **SAST**: Code analysis during development.
*   **SCA**: `trivy` scans for dependency vulnerabilities.
*   **IAM**: Least-privilege roles for AWS resources.

## 3. Results and Comparison
*   **Predicted**: Application should handle 100 concurrent requests securely.
*   **Actual**: Load testing confirmed stability.
*   **Security**: Initial scan showed 12 vulnerabilities (high). Final hardened image showed 0 critical/high vulnerabilities.

## 4. Conclusions
The project successfully met all security and functional requirements. We proved that by defining infrastructure as code and automating security checks, we can deploy robust applications that are resistant to common attacks. Future work includes implementing a Service Mesh (Istio) for mTLS.
