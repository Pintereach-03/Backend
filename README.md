# Backend

```https://pintereach-03.herokuapp.com```

## Articles (Restricted)

### Method

| REST    | Endpoint          |
| :------ | :---------------- |
| GET     | /api/articles     |
| GET     | /api/articles/:id |
| POST    | /api/articles     |
| PUT     | /api/articles/:id |
| DELETE  | /api/articles/:id |

### Schema

| Property   | Type   |
| :--------- | :----- |
| id         | Number |
| title      | String |
| link       | String |
| category   | String |
| created_at | String |
| user_id    | Number |

### Payload

```js
    {
        title: '',      // (Required)
        link: '',       // (Required)
        description: '', // (Required)
        category: ''    // (Optional)
    }
```

### Response

```js
    {
        id: 0,
        title: '',
        link: '',
        category: '',
        created_at: '',
        user_id: 0
    }
```

## Categories (Restricted)

### Method

| REST    | Endpoint            |
| :------ | :------------------ |
| GET     | /api/categories     |
| GET     | /api/categories/:id |
| POST    | /api/categories     |
| PUT     | /api/categories/:id |
| DELETE  | /api/categories/:id |

### Schema

| Property   | Type   |
| :--------- | :----- |
| id         | Number |
| name       | String |
| created_at | String |
| user_id    | Number |

### Payload

```js
    {
        name: '' // (Required | Unique)
    }
```

### Response

```js
    {
        id: 0,
        name: '',
        created_at: '',
        user_id: 0
    }
```

## Auth

### Method

| REST     | Endpoint           |
| :------- | :----------------- |
| POST     | /api/auth/register |
| POST     | /api/auth/login    |

### Schema

| Property | Type   |
| :------- | :----- |
| id       | Number |
| username | String |
| password | String |

### Payload

```js
    {
        username: '', // (Required | Unique)
        password: ''  // (Required)
    }
```

### Response - Sign Up

```js
    {
        id: 0,
        username: '',
        password: ''
    }
```

### Response - Sign In

```js
    {
        id: 0,
        message: '',
        token: ''
    }
```

## Users (Restricted)

| REST    | Endpoint       |
| :------ | :------------- |
| GET     | /api/users     |
| GET     | /api/users/:id |

### Response

```js
    {
        id: 0,
        username: '',
        password: ''
    }
```
