## Start the project

```
git clone
npm i
cp .env.default .env
edit your .env
npm run start
```

### Available endpoints:

### Auth

Create an account: `POST /signup`  
Auth: not required

##### Parameters

```
{
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "race": "string"
}
```
* Login to your account: `POST /login`  
Auth: not required

##### Parameters

```
{
	"email": "string",
	"password": "string"
}
```

* Logout your account: `POST /logout`  
Auth: required

##### Parameters

no parameters

* Logout your account from all plateforms where you login: `POST /logout/all`  
Auth: required

##### Parameters

no parameters

### Monster

* Get all monsters `GET /monsters`  
Auth: not required

##### Parameters

no parameters

* Update monster `PATCH /monsters/me`  
Auth: required + only for the connected user

##### Parameters

*can be all these parameters or just one of them*
```
{
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "race": "string",
    "avatar": "string"
}
```

* Delete monster `DELETE /monsters/me`  
Auth: required + only for the connected user

##### Parameters

no parameters

### Follow

* Follow a monster `POST /follow/:id`  
Auth: required + only for the connected monster

##### Parameters

```
{
    "id": "string"
}
```

* Get monster followers `GET /followers/me`  
Auth: required + only for connected monster

##### Parameters

no parameters

* Get monster following `GET /following/me`  
Auth: required + only for connected monster

##### Parameters

no parameters

* Unfollow a monster `POST /unfollow/:id`  
Auth: required + only for the connected monster

##### Parameters

```
{
    "id": "string"
}
```

