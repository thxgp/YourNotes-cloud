# Cloud Monitoring & Incident Response

## 1. Monitoring Configuration
We utilize a multi-layer monitoring approach:

### Metric Collection
*   **Infrastructure (AWS/Render)**:
    *   **CPU Usage**: Alert if > 80% for 5 minutes.
    *   **Memory Usage**: Alert if > 80% (indicates leak).
    *   **Disk I/O**: Monitor for unusual spikes.
*   **Application (Node.js)**:
    *   **Response Time**: Alert if p95 > 500ms.
    *   **Error Rate**: Alert if HTTP 5xx > 1%.
    *   **Active Connections**: Track concurrent users.

### Notification Channels
*   **Critical (P1/P2)**: PagerDuty (Phone Call/SMS) -> Developers
*   **Warning (P3/P4)**: Slack Channel `#ops-alerts`
*   **Info**: Weekly Email Report

## 2. Incident Response Plan (Basic)

### Phase 1: Detection
*   **Source**: Automated alert from Monitoring System or User Report.
*   **Action**: On-call engineer acknowledges alert within 15 mins.

### Phase 2: Containment
*   **Scenario**: Unauthorized Access (Compromised Token)
*   **Action**: 
    1. Revoke Clerk session immediately. 
    2. Block IP at Security Group level (`infrastructure/security.tf`).
    3. Rotate Database Credentials.

### Phase 3: Eradication
*   **Action**: 
    1. Identify vulnerability (e.g., weak dependency).
    2. Patch code.
    3. Build new Docker image (`docker build`).
    4. Run Trivy scan to verify fix.

### Phase 4: Recovery
*   **Action**: 
    1. Deploy patched image via Kubernetes (`kubectl rollout restart deployment`).
    2. Monitor error rates for instability.
    3. Restore service to full capacity.

### Phase 5: Post-Incident Activity
*   **Action**: Write Post-Mortem report within 24 hours.
