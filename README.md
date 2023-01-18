npm run dev

PATRON

rutas- controller- services - view

RUTAS DE LA APLICACION

rutas con vista html

GET: /loguin --> formulario de loguin

GET: /register --> formulario de registro

POST: /loguin --> realiza el proceso de loguin

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

