-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-06-2025 a las 00:44:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_29`
--

CREATE TABLE `carrito_29` (
  `id` int(11) NOT NULL,
  `id_User` int(11) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gerentes`
--

CREATE TABLE `gerentes` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) NOT NULL,
  `DNI` int(10) NOT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `Contrasenia` varchar(120) DEFAULT NULL,
  `Creacion_Cuenta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gerentes`
--

INSERT INTO `gerentes` (`id`, `Nombre`, `Apellido`, `DNI`, `Email`, `Contrasenia`, `Creacion_Cuenta`) VALUES
(3, 'Federico', 'Luz', 34506223, 'agenciasViajes.Gerencia@gmail.com.ar', '$2a$10$HWRJArnHwBq3t.1obVezJOWZdKEPxey0KXOswRqZwpWHKdOvtSe6a', '2025-06-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_29`
--

CREATE TABLE `historial_29` (
  `id` int(11) NOT NULL,
  `id_User` int(11) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `Fecha_Entregado` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_29`
--

INSERT INTO `historial_29` (`id`, `id_User`, `id_Producto`, `cantidad`, `Fecha_Entregado`) VALUES
(1, 29, 2, 1, '2025-06-21'),
(2, 29, 13, 1, '2025-06-21'),
(3, 29, 15, 1, '2025-06-21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pendiente_29`
--

CREATE TABLE `pendiente_29` (
  `id` int(11) NOT NULL,
  `id_User` int(11) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `precioOriginal` int(11) DEFAULT NULL,
  `ahorro` int(11) DEFAULT NULL,
  `paquete` varchar(50) DEFAULT NULL,
  `salida` varchar(255) DEFAULT NULL,
  `combo` varchar(100) DEFAULT NULL,
  `imagen` varchar(230) DEFAULT NULL,
  `duracion` varchar(100) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `estrellas` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `precio`, `precioOriginal`, `ahorro`, `paquete`, `salida`, `combo`, `imagen`, `duracion`, `rating`, `estrellas`, `cantidad`) VALUES
(1, 'Paquetes a San Carlos de Bariloche', 100000, 120000, 20000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://www.borispatagonia.com/images/san-carlos-de-bariloche-patagonie-argentine-nord.webp', '12 DÍAS / 11 NOCHES', 10.0, 5, 1),
(2, 'Paquetes a Salta', 95000, 110000, 15000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/128000/128973-Ruta-Del-Vino--Salta-Wine-Route-.jpg', '5 DÍAS / 4 NOCHES', 7.6, 3, 1),
(3, 'Paquetes a Mendoza', 110000, 130000, 20000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Panor%C3%A1mica_Ciudad_de_Mendoza.jpg/330px-Panor%C3%A1mica_Ciudad_de_Mendoza.jpg', '6 DÍAS / 5 NOCHES', 8.6, 4, 1),
(4, 'Paquetes a Rio de Janeiro', 110000, 130000, 20000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://comercioyjusticia.info/wp-content/uploads/2025/03/Cristo-Redentor-y-Pan-de-Azucar_RJ_Foto-Pedro-Kirilos_Riotur.jpg', '6 DÍAS / 5 NOCHES', 8.9, 4, 1),
(5, 'Paquetes a Jujuy', 90000, 170000, 27000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://i0.wp.com/leerdelviaje.com/wp-content/uploads/2020/01/IMG_7665B.jpg?resize=1098.5%2C706&ssl=1', '7 DÍAS / 6 NOCHES', 8.2, 4, 1),
(6, 'Paquetes a Tucuman', 92000, 107000, 15000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://comunicacionsmt.gob.ar/download/multimedia.grande.ad78d276b8e8a1fb.RFNDXzExODFfZ3JhbmRlLndlYnA%3D.webp', '6 DÍAS / 5 NOCHES', 6.8, 3, 1),
(7, 'Paquetes a Puerto Iguazú', 108000, 123000, 15000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://media.traveler.es/photos/613768f03decec3303bab7da/16:9/w_1856,h_1044,c_limit/158835.jpg', '8 DÍAS / 7 NOCHES', 8.6, 4, 1),
(8, 'Paquetes a San Luis', 102000, 118000, 16000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://cloudfront-us-east-1.images.arcpublishing.com/artear/C5DNOQH6TJBMJGIPWB2HU4QCNQ.jpeg', '5 DÍAS / 4 NOCHES', 9.5, 4, 1),
(11, 'Paquetes a San Juan', 190000, 230000, 40000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel+Vuelo', 'https://sanjuan-tur-ar.b-cdn.net/media/mod_zentools2/cache/images/e2bf3b11df0b872112757f1c2fee6e32-a023f2fec8abb316831bd84607a8a9ec.jpg', '8 Días/7 Noches', 8.9, 3, 1),
(12, 'Paquetes Cordoba', 100000, 120000, 20000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://api-inprotur-hom.turismo.gob.ar/files/uploads/1656700926864-cordoba_capital_horizontales__8___1_.jpg', '5 Dias/4 Noches', 9.0, 4, 1),
(13, 'Paquetes a Machupichu', 150000, 180000, 30000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://caminoincamachupicchu.org/cmingutd/wp-content/uploads/2021/06/machu-picchu-ci.jpg', '8 Días/7 Noches', 8.7, 3, 1),
(15, 'Paquetes a Roma', 200000, 230000, 30000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://losapuntesdelviajero.com/wp-content/uploads/2009/05/Lugares-que-ver-en-Roma-Italia.jpg', '5 dias/4 noches', 9.8, 3, 1),
(16, 'Paquetes a Venecia', 190000, 220000, 30000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://content-viajes.nationalgeographic.com.es/medio/2018/02/19/vencia-gran-canal_9670bbbd.jpg', '8 dias/7 noches', 9.0, 4, 1),
(17, 'Paquetes a La Rioja', 110000, 120000, 10000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://upload.wikimedia.org/wikipedia/commons/b/b4/TALMLR.jpg', '8 Días/7 Noches', 9.0, 3, 1),
(18, 'Paquetes a Montevideo', 100000, 130000, 30000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/The_City_%28198895997%29.jpeg/330px-The_City_%28198895997%29.jpeg', '5 Dias/4 Noches', 9.0, 4, 1),
(21, 'Paquetes a Paris', 250000, 300000, 50000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/474000/474240-Left-Bank-Paris.jpg', '5 Dias/4 Noches', 9.0, 4, 1),
(24, 'Paquetes a Mar del Plata', 200000, 230000, 30000, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 'https://turismo-en-argentina.com/wp-content/uploads/2024/05/turismo-en-mar-del-plata.jpg', '6 Días/5 Noches', 9.0, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(60) DEFAULT NULL,
  `Apellido` varchar(50) NOT NULL,
  `DNI` int(10) NOT NULL,
  `Email` varchar(70) DEFAULT NULL,
  `Contrasenia` varchar(120) DEFAULT NULL,
  `Creacion_Cuenta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `Nombre`, `Apellido`, `DNI`, `Email`, `Contrasenia`, `Creacion_Cuenta`) VALUES
(29, 'Juan', 'Alvarez', 47802998, 'piccininno.fabriciol@gmail.com', '$2b$10$XoBcvppK84sFvz06TqUsOO/BAWA.WGiqOQVYWPJTom/KT5zU1rHjq', '2025-06-21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito_29`
--
ALTER TABLE `carrito_29`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`id_User`),
  ADD KEY `id_Producto` (`id_Producto`);

--
-- Indices de la tabla `gerentes`
--
ALTER TABLE `gerentes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial_29`
--
ALTER TABLE `historial_29`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`id_User`),
  ADD KEY `id_Producto` (`id_Producto`);

--
-- Indices de la tabla `pendiente_29`
--
ALTER TABLE `pendiente_29`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`id_User`),
  ADD KEY `id_Producto` (`id_Producto`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito_29`
--
ALTER TABLE `carrito_29`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `gerentes`
--
ALTER TABLE `gerentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `historial_29`
--
ALTER TABLE `historial_29`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pendiente_29`
--
ALTER TABLE `pendiente_29`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito_29`
--
ALTER TABLE `carrito_29`
  ADD CONSTRAINT `carrito_29_ibfk_1` FOREIGN KEY (`id_User`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `carrito_29_ibfk_2` FOREIGN KEY (`id_Producto`) REFERENCES `servicios` (`id`);

--
-- Filtros para la tabla `historial_29`
--
ALTER TABLE `historial_29`
  ADD CONSTRAINT `historial_29_ibfk_1` FOREIGN KEY (`id_User`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `historial_29_ibfk_2` FOREIGN KEY (`id_Producto`) REFERENCES `servicios` (`id`);

--
-- Filtros para la tabla `pendiente_29`
--
ALTER TABLE `pendiente_29`
  ADD CONSTRAINT `pendiente_29_ibfk_1` FOREIGN KEY (`id_User`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `pendiente_29_ibfk_2` FOREIGN KEY (`id_Producto`) REFERENCES `servicios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
