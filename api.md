# API
## User

### Create
#### PUT `/user/`
Parameters:
```javascript
"email":    "Email address of the user"
"firstName":  "First name of the user"
"lastName":   "Last name of the user"
```

Response:

`301 CREATED`
```javascript
{
  "id": string
}
```


### Update
#### POST `/user/{id}`
Parameters:
```javascript
"email":    "Email address of the user"
"firstName":  "First name of the user"
"lastName":   "Last name of the user"
```


### Read
#### GET `/user/{id}`

Response:

`200 OK`
```javascript
{
  "email": string
  "firstName": string
  "lastName": string
}
```
