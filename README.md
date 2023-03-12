# Cauldron Cuisine - MERN
Grupo:
- Dahiana Orue
- Divina Benitez
- Diana Coronel
- Donato Garcia


## Wireframe del proyecto:

https://www.figma.com/file/GBXyndw40CSfYQiCfbE2WY/Cooking-Site-Wireframe?node-id=0%3A1&t=giwIKZTexoi789xS-1


## BackEnd

Se utilizo las siguientes librerias:
1. Bcryptjs
2. Cookie parser
3. Cors
4. DotEnv
5. Express y express async handler
6. JWT
7. Mongoose
8. Multer


### Las rutas del backend son las siguientes

Ruta Base: localhost:8000/

- User - /api/user/
	* getUsuarios: obtiene todos los datos(excepto password) de todos los usuarios (ruta no necesaria) - protegido
	* getUsuario - obtiene todos los datos(excepto password) del usuario del token - protegido
	* newUsuario - registra un nuevo usuario
	* updateUsuario - actualiza los datos del usuario del token - protegido
	* deleteUsuario - elimina el usuario del token - protegido
	* loginUsuario - verifica email y password en base de datos y retorna el cookie con el token
	* isLogged - verifica el token si esta activo - protegido
	* logOut - elimina el token - protegido
	* getSavedRecipes - trae todos los datos del usuario incluyendo las recetas guardadas - protegido
	* saveNewRecipe - guarda el id de la receta como fav - protegido
	
- Recipe - /api/recipe/
	* getRecipes - obtiene todos los datos de todas las recetas
	* getRecipe/:id - obtiene los datos de una solo receta en particular a traves de su id
	* getMyRecipes - obtiene todos los datos de las recetas del usuario del token - protegido ::Falta testear::
	* newRecipe - registra una nueva receta, incluye multer - protegido
	* newRecipe2 - registra una nueva receta, sin multer - protegido
	* updateRecipe/:id - actualiza una receta - protegido
	* deleteRecipe/:id - elimina una receta - protegido
	* getLikeRecipes - obtiene todas las recetas con name similar (para la busqueda de recetas) 