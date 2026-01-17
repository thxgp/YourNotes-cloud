# 5. Security Groups (Meeting "Fine-grained network control")

resource "aws_security_group" "app_sg" {
  name        = "app-security-group"
  description = "Allow HTTP/HTTPS traffic"
  vpc_id      = aws_vpc.main_vpc.id

  # Ingress: Allow HTTP from anywhere
  ingress {
    description = "HTTP from Internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Ingress: Allow HTTPS from anywhere
  ingress {
    description = "HTTPS from Internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Egress: Allow all outbound traffic (for updates/external APIs)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "App-Security-Group"
  }
}

# 6. IAM Roles (Meeting "IAM Roles/Policies" requirement)

resource "aws_iam_role" "node_app_role" {
  name = "secure-notes-app-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "node_app_policy" {
  name = "secure-notes-app-policy"
  role = aws_iam_role.node_app_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}
