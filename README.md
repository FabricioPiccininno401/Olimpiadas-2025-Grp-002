# Olimpiadas-2025-Grp-002
Backend (Servidor del sistema) y dos Frontend (Uno de la aplicación web: React y otro de la aplicación móvil: React Nativo)
Para correr el proyecto se debe: 
1-Descargar el archivo con la extension .sql, abrir Localhost/phpmyadmin (Teniendo previsto que activo el Apache y Mysql de Xampp).
Crear una BD llamada especificamente agencia e importar el archivo sql.
2-Descargar como .rar el backend y el front end (Se puede descargar el proyecto completo sin drama)
Ir ala carpeta desde el CMD (La consola de Windows), y al momento de tener tu ruta de esta forma "ruta/agencia-viajes/backend>" 
escribir el siguiente comando: node index.js
3-Realizar lo mismo pero con el frontend que prefiera visualizar, navegue con su consola de windows hasta frontend1 o frontend2
y teniendo la ruta "ruta/agencia-viajes/frontend1>" escribir: npm run dev
en caso de haber ido a "ruta/agencia-viajes/frontend2>" escribir: npx expo start
Sobre la aplicacion movil (Frontend2), es necesario que utilice la version web de la aplicacion.
Pero en caso de querer ver la version Movil utilizando la aplicacion "Expo Go" tendra que entrar a todas las pestañas de la aplicacion
Desde un edior de codigo y cambiar cada "fetch("http:localhost:3001..." por "fecth("http:TU_IP:3001"
Si desea tomarse el tiempo de cambiarlo, tiene que escribir ipconfig en su terminar para saber que debe colocar como TU_IP
