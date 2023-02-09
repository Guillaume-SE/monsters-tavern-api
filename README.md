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

### Monster

* Get all monsters `GET /monsters`  
Auth: not required

##### Parameters

no parameters

* Get one monster by id `GET /monsters/:id`  
Auth: not required

##### Parameters

no parameters

* Update your account `PATCH /monsters/update/:id`  
Auth: required

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

* Delete your account `DELETE /monsters/delete/:id`  
Auth: required

##### Parameters

no parameters

### Follow

* Follow a monster `POST /follow/:id`  
Auth: required

##### Parameters

no parameters

* Get your followers `GET /followers/:id`  
Auth: required

##### Parameters

no parameters

* Get your following `GET /following/:id`  
Auth: required

##### Parameters

no parameters

* Unfollow a monster `POST /unfollow/:id`  
Auth: required

##### Parameters

no parameters

