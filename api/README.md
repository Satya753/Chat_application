# Structure
```
api/
```
For accessing services that use basic CRUD operations

```
socks/
```
For realtime communications

## API FLOW
```
HTTP Request =>
  => router =>
  => controller => middleware|validator => controller
  => service
```

### Router
Will call the appropriate Controller with the data (After parsing the requested URI) 

### Controller
Verify the data using using middlewares & validators
Then provide access to the appropriate service

### Services
All business logic & Database interactions will be present here

