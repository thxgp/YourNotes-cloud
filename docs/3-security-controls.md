# Security Controls Specification

## 1. Identity & Access Management (IAM) Policy
**Role**: `secure-notes-app-role`
**Principle**: Least Privilege. The application container only has permissions to write logs.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
```

## 2. Network Security Groups / Firewall Rules

**Group Name**: `app-security-group`

| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| **Ingress** | TCP | 80 | 0.0.0.0/0 | Allow HTTP traffic from Load Balancer |
| **Ingress** | TCP | 443 | 0.0.0.0/0 | Allow HTTPS traffic from Load Balancer |
| **Ingress** | TCP | 22 | 10.0.1.0/24 | Allow SSH *only* from Bastion Host (Public Subnet) |
| **Egress** | All | All | 0.0.0.0/0 | Allow outbound API calls (e.g., to Supabase/Clerk) |

## 3. Secure Dockerfile Checklist
*   [x] **Base Image**: Uses `node:20-alpine` (Minimal footprint, reduced attack surface).
*   [x] **Non-Root User**: Creates and switches to `node` user before running app.
*   [x] **Layer Caching**: Copies `package.json` first to optimize build times.
*   [x] **Production Deps**: Runs `npm ci --only=production`.
*   [x] **File Permissions**: `chown -R node:node /app` ensures correct ownership.
*   [x] **No Secrets**: Secrets are injected at runtime via Environment Variables, not baked in.

## 4. Container Runtime Security (Kubernetes)
**Pod Security Standard**: Baseline/Restricted

*   **runAsNonRoot**: `true` (Prevents running as UID 0)
*   **runAsUser**: `1000` (Enforces specific non-root UID)
*   **readOnlyRootFilesystem**: `false` (Application writes temp files, but scoped)
*   **allowPrivilegeEscalation**: `false` (Prevents gaining more rights)
*   **capabilities**: `drop: ["ALL"]` (Removes unnecessary Linux capabilities)
