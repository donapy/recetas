# Cauldron Cuisine - MERN
Grupo:
- Dahiana Orue / Front-End
- Divina Benitez / Front-End
- Diana Coronel / Front-End 
- Donato Garcia / Back-End


## Descripcion General del Proyecto
El proyecto "Cauldron Cuisine" trata sobre una web que almacena recetas generadas por usuarios, en el cual cualquier persona puede buscar una receta y ver todo lo que se necesita para realizarla.
Un usuario no registrado puede ver las recetas disponibles solamente.
Un usuario registrado puede ver, crear, guardar, editar y eliminar recetas, pero lo de editar y eliminar solo las recetas creadas por el usuario.
Cada formulario cuenta con validaciones tanto en el frontend como en el backend, ademas de que el frontend es responsive.
El frontend tambien cuenta con rutas protegidas a traves del token que almacena la cookie, esto quiere decir que el token que almacena el cookie tiene que ser uno valido.


### Rutas Protegidas
```
host:port/my-recipes
host:port/recipes/:id
host:port/recipes/new
host:port/saved-recipes
host:port/my-recipes/edit/:id
```

### Rutas No Protegidas
```
host:port/
host:port/login
host:port/register
host:port/recipeSearch/:id
```

## Wireframe del proyecto:

https://www.figma.com/file/GBXyndw40CSfYQiCfbE2WY/Cooking-Site-Wireframe?node-id=0%3A1&t=giwIKZTexoi789xS-1


---------


## FrontEnd

Para iniciar el frontend, es necesario ubicarse en la carpeta **client** y ejecutar el siguiente comando:

> npm start

### Para la parte de frontend se utilizó las siguientes liberias
1. @tanstack/react-query
2. axios
3. flowbite
4. flowbite-react
5. match-sorter
6. react-router-dom
7. react-tag-input
8. react-tagsinput
9. react-loading




## BackEnd

Para iniciar el backend, es necesario configurar previamente su **.env**, luego ubicarse en la carpeta **backend** y a continuacion ejecutar el siguiente comando:

> npm run server

### El **.env** consta de los siguientes parametros

```
PORT = 8000
MONGO_URI = mongodb://mongouser:mongopass@localhost:27017/recipes_db
JWT_SECRET = jwtsecret
JWT_EXPIRES_IN = 3h
```

### Para la parte de backend se utilizó las siguientes liberias
1. Bcryptjs
2. Cookie parser
3. Cors
4. DotEnv
5. Express y express async handler
6. JWT
7. Mongoose


### Las rutas del backend son las siguientes

Ruta Base: **host:port**

- User - /api/user/
	* getUsuarios - obtiene todos los datos(excepto password) de todos los usuarios (ruta no necesaria) - protegido
	* getUsuario - obtiene todos los datos(excepto password) del usuario del token - protegido
	* newUsuario - registra un nuevo usuario
	* updateUsuario - actualiza los datos del usuario del token - protegido
	* deleteUsuario - elimina el usuario del token - protegido
	* loginUsuario - verifica email y password en base de datos y retorna el cookie con el token
	* isLogged - verifica el token si esta activo - protegido
	* logOut - elimina el token - protegido
	* getSavedRecipes - obtiene las recetas guardadas por el usuario utilizando population por los datos anidados - protegido
	* saveNewRecipe - guarda el id de la receta en el usuario - protegido
	* deleteSavedRecipe - elimina de la lista de recetas guardadas la recete en cuestion - protegido
	
- Recipe - /api/recipe/
	* getRecipes - obtiene todos los datos de todas las recetas incluyendo el user que creo utilizando population por los datos anidados
	* getRecipe/:id - obtiene los datos de una solo receta en particular a traves de su id
	* getMyRecipes - obtiene todos los datos de las recetas del usuario del token - protegido
	* newRecipe2 - registra una nueva receta - protegido
	* updateRecipe/:id - actualiza una receta - protegido
	* deleteRecipe/:id - elimina una receta, en caso de que la receta fue guardada por otro usuario, no lo elimina - protegido
	* getLikeRecipes - obtiene todas las recetas con name similar (para la busqueda de recetas) 
