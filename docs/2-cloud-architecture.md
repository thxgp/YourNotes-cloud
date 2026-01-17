# Cloud Architecture & Logical Network Topology

## 1. High-Level Architecture Diagram

```mermaid
graph TB
    subgraph "AWS Region: us-east-1"
        subgraph "VPC: 10.0.0.0/16"
            IGW((Internet Gateway))
            
            subgraph "Public Subnet: 10.0.1.0/24"
                LB[Load Balancer / Ingress]
                NAT[NAT Gateway]
            end
            
            subgraph "Private Subnet: 10.0.2.0/24"
                subgraph "Security Group: App-SG"
                    App1[Node Container 1]
                    App2[Node Container 2]
                end
            end
        end
    end
    
    User((Client)) --> IGW
    IGW --> LB
    LB --> App1
    LB --> App2
    App1 --> Supabase[(Supabase DB)]
    App2 --> Supabase
```

## 2. Logical Network Topology Description
*   **VPC**: A dedicated virtual network (`10.0.0.0/16`) isolates our resources.
*   **Public Subnet**: Hosts the Ingress Controller and Load Balancer. Accessible from the internet (`0.0.0.0/0`) via the Internet Gateway.
*   **Private Subnet**: Hosts the application containers. purely internal. No direct internet access.
*   **NAT Gateway**: Allows private instances to initiate outbound connections (e.g., to fetch updates or connect to Supabase) without accepting inbound traffic.
*   **Route Tables**:
    *   *Public RT*: Routes `0.0.0.0/0` to Internet Gateway.
    *   *Private RT*: Routes `0.0.0.0/0` to NAT Gateway.
