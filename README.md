PROFE: Rama main
- Archivo .env:
por privado
- Si bien no era necesario el front. Hay varias cosas hechas con ello a travez de la carpeta Views,
el resto por thunderClient. 
- En archivo Readme hay mas data.---

Reclutadores:
npm run dev

PATRON
Modelo - Vista - Controlador - Services
rutas- controller- services - view

RUTAS DE LA APLICACION

rutas con vista html

GET: /login --> formulario de login

GET: /register --> formulario de registro

POST: /login --> realiza el proceso de login

POST: /register --> da de alta un nuevo usuario


/ (dashboard) --> panel de control

GET: /products/create --> formulario para un nuevo producto

GET: /products --> lista todos los productos

GET: /products/update/{id_producto} --> formulario para editar un producto

GET: /products/{id_producto} --> detalle de producto

POST: /products/actualize/{id_producto} --> accion de actualizar un producto

POST: /products/delete/{id_producto} --> elimina un producto


rutas API

GET: /api/users --> lista todos los usuarios

GET: /api/cart:{id_usuario} --> lista el carrito de un usuario si no existe lo crea

POST: /api/cart:{id_usuario} --> si no existe crea el carrito y agrega un producto


GET: /api/productos --> lista todos los productos

GET: /api/productos/{id_producto} --> muesta el detale de un producto

POST: /api/productos --> crea un producto

PUT: /api/productos/{id_producto} --> actualiza un producto

DELETE: /api/productos/{id_producto} --> elimina un producto

