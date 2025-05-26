# Deployment Guide

## Prerequisites
- AWS Account
- Docker installed
- AWS CLI configured
- Domain name (optional)

## Backend Deployment

### 1. Build Docker Image
```bash
cd backend
docker build -t companionsquared-backend .
```

### 2. Push to ECR
```bash
aws ecr create-repository --repository-name companionsquared-backend
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
docker tag companionsquared-backend:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/companionsquared-backend:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/companionsquared-backend:latest
```

### 3. Deploy to ECS
```bash
aws ecs create-cluster --cluster-name companionsquared
aws ecs create-service --cluster companionsquared --service-name backend --task-definition companionsquared-backend
```

## Frontend Deployment

### 1. Build Production Bundle
```bash
cd frontend
npm run build
```

### 2. Deploy to S3
```bash
aws s3 sync build/ s3://companionsquared-frontend
```

### 3. Configure CloudFront
```bash
aws cloudfront create-distribution --origin-domain-name companionsquared-frontend.s3.amazonaws.com
```

## Database Setup

### 1. Create RDS Instance
```bash
aws rds create-db-instance \
    --db-instance-identifier companionsquared \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username admin \
    --master-user-password $DB_PASSWORD
```

### 2. Run Migrations
```bash
psql -h $RDS_ENDPOINT -U admin -d companionsquared -f sql/schema.sql
```

## Environment Variables

Set up environment variables in AWS Systems Manager Parameter Store:

```bash
aws ssm put-parameter \
    --name "/companionsquared/backend/DATABASE_URL" \
    --value "postgresql://admin:$DB_PASSWORD@$RDS_ENDPOINT:5432/companionsquared" \
    --type SecureString
```

## Monitoring

1. Set up CloudWatch alarms for:
   - CPU utilization
   - Memory usage
   - Error rates
   - Response times

2. Configure logging:
   - Backend logs to CloudWatch
   - Frontend error tracking with Sentry

## SSL/TLS

1. Request SSL certificate:
```bash
aws acm request-certificate \
    --domain-name api.companionsquared.com \
    --validation-method DNS
```

2. Configure SSL in CloudFront and ALB

## Backup Strategy

1. Daily RDS snapshots
2. S3 versioning enabled
3. Cross-region replication for critical data

## Scaling

1. Configure Auto Scaling Groups
2. Set up load balancers
3. Implement caching strategy

## Security

1. Set up WAF rules
2. Configure security groups
3. Enable AWS Shield
4. Regular security audits 