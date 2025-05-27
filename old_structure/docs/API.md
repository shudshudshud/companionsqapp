# CompanionSquared API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Reflections
- `GET /reflections` - Get all reflections
- `POST /reflections` - Create a new reflection
- `GET /reflections/:id` - Get a specific reflection
- `PUT /reflections/:id` - Update a reflection
- `DELETE /reflections/:id` - Delete a reflection

### People
- `GET /people` - Get all people
- `POST /people` - Create a new person
- `GET /people/:id` - Get a specific person
- `PUT /people/:id` - Update a person
- `DELETE /people/:id` - Delete a person

### Subscriptions
- `POST /subscriptions/create` - Create a new subscription
- `POST /subscriptions/webhook` - Handle Stripe webhooks
- `GET /subscriptions/status` - Get subscription status

### Demo
- `POST /demo/process` - Process a demo reflection

## Error Responses
All error responses follow this format:
```json
{
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

## Rate Limiting
API requests are limited to 100 requests per minute per IP address. 