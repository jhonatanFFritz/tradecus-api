-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema tradecus
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tradecus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tradecus` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb` ;
USE `tradecus` ;

-- -----------------------------------------------------
-- Table `tradecus`.`cabecera`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`cabecera` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero_serie` VARCHAR(45) NOT NULL,
  `nombre_empresa` VARCHAR(200) NOT NULL,
  `ruc` VARCHAR(50) NOT NULL,
  `direccion` VARCHAR(200) NOT NULL,
  `website` VARCHAR(200) NOT NULL,
  `celular` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`tipo_doc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`tipo_doc` (
  `id_tipo_doc` INT NOT NULL AUTO_INCREMENT,
  `nombre_doc` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_tipo_doc`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `fecha_creado` TIMESTAMP NULL DEFAULT NULL,
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_rol`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `id_rol` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `usuario_ibfk_1`
    FOREIGN KEY (`id_rol`)
    REFERENCES `tradecus`.`rol` (`id_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`cliente_contacto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`cliente_contacto` (
  `id_cliente` INT NOT NULL,
  `nombre_cli` VARCHAR(80) NOT NULL,
  `aplellidos_cli` VARCHAR(80) NOT NULL,
  `email_cli` VARCHAR(120) NOT NULL,
  `celular_cli` VARCHAR(20) NOT NULL,
  `id_tipo_doc` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_cliente`, `id_tipo_doc`, `id_usuario`),
  INDEX `fk_cliente_contacto_tipo_doc1_idx` (`id_tipo_doc` ASC) VISIBLE,
  INDEX `fk_cliente_contacto_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_cliente_contacto_tipo_doc1`
    FOREIGN KEY (`id_tipo_doc`)
    REFERENCES `tradecus`.`tipo_doc` (`id_tipo_doc`),
  CONSTRAINT `fk_cliente_contacto_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `tradecus`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`metodo_pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`metodo_pago` (
  `id_metodo_pago` INT NOT NULL AUTO_INCREMENT,
  `nombre_pago` VARCHAR(45) NOT NULL,
  `descripcion_pago` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_metodo_pago`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`reserva` (
  `id_reserva` INT NOT NULL AUTO_INCREMENT,
  `codigo_reserva` VARCHAR(8) NOT NULL,
  `fecha_reserva` DATE NOT NULL,
  `fecha_llegada` DATE NOT NULL,
  `num_visitantes` INT NOT NULL,
  `precio_reserva` DECIMAL(7,2) NOT NULL,
  `fecha_creado` TIMESTAMP NULL DEFAULT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_reserva`, `id_usuario`),
  INDEX `fk_reserva_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_reserva_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `tradecus`.`usuario` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`servicio_adicional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`servicio_adicional` (
  `id_serv_adicional` INT NOT NULL AUTO_INCREMENT,
  `nombre_serv` VARCHAR(150) NOT NULL,
  `descripcion_serv` TEXT NOT NULL,
  `precio_serv` DECIMAL(7,2) NOT NULL,
  PRIMARY KEY (`id_serv_adicional`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`tour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`tour` (
  `id_tour` INT NOT NULL AUTO_INCREMENT,
  `nombre_tour` VARCHAR(100) NOT NULL,
  `precio_tour` DECIMAL(7,2) NOT NULL,
  `precio_promo_tour` DECIMAL(7,2) NOT NULL,
  `duracion_tour` VARCHAR(8) NOT NULL,
  `descripcion_tour` TEXT NULL DEFAULT NULL,
  `estado_tour` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_tour`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`visitante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`visitante` (
  `id_visitante` INT NOT NULL AUTO_INCREMENT,
  `nombre_vis` VARCHAR(50) NOT NULL,
  `apellido_vis` VARCHAR(50) NOT NULL,
  `sexo_vis` VARCHAR(6) NOT NULL,
  `fecha_nacimiento_vis` DATE NOT NULL,
  `numero_doc_vis` VARCHAR(18) NOT NULL,
  `id_tipo_doc` INT NOT NULL,
  `cliente_contacto_id` INT NOT NULL,
  PRIMARY KEY (`id_visitante`, `id_tipo_doc`, `cliente_contacto_id`),
  INDEX `fk_visitante_tipo_doc1_idx` (`id_tipo_doc` ASC) VISIBLE,
  INDEX `cliente_contacto_id` (`cliente_contacto_id` ASC) VISIBLE,
  CONSTRAINT `fk_visitante_tipo_doc1`
    FOREIGN KEY (`id_tipo_doc`)
    REFERENCES `tradecus`.`tipo_doc` (`id_tipo_doc`),
  CONSTRAINT `visitante_ibfk_1`
    FOREIGN KEY (`cliente_contacto_id`)
    REFERENCES `tradecus`.`cliente_contacto` (`id_cliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`detalle_reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`detalle_reserva` (
  `id_detalle_reserva` INT NOT NULL AUTO_INCREMENT,
  `id_visitate` INT NOT NULL,
  `id_reserva` INT NOT NULL,
  `id_tour` INT NOT NULL,
  `id_metodo_pago` INT NOT NULL,
  `id_serv_adicional` INT NOT NULL,
  `cabecera_id` INT NOT NULL,
  PRIMARY KEY (`id_detalle_reserva`, `id_visitate`, `id_reserva`, `id_tour`, `id_metodo_pago`, `id_serv_adicional`),
  INDEX `fk_detalle_reserva_visitante1_idx` (`id_visitate` ASC) VISIBLE,
  INDEX `fk_detalle_reserva_reserva1_idx` (`id_reserva` ASC) VISIBLE,
  INDEX `fk_detalle_reserva_tour1_idx` (`id_tour` ASC) VISIBLE,
  INDEX `fk_detalle_reserva_metodo_pago1_idx` (`id_metodo_pago` ASC) VISIBLE,
  INDEX `fk_detalle_reserva_servicio_adicional1_idx` (`id_serv_adicional` ASC) VISIBLE,
  INDEX `fk_detalle_reserva_cabecera1_idx` (`cabecera_id` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_reserva_cabecera1`
    FOREIGN KEY (`cabecera_id`)
    REFERENCES `mydb`.`cabecera` (`id`),
  CONSTRAINT `fk_detalle_reserva_metodo_pago1`
    FOREIGN KEY (`id_metodo_pago`)
    REFERENCES `tradecus`.`metodo_pago` (`id_metodo_pago`),
  CONSTRAINT `fk_detalle_reserva_reserva1`
    FOREIGN KEY (`id_reserva`)
    REFERENCES `tradecus`.`reserva` (`id_reserva`),
  CONSTRAINT `fk_detalle_reserva_servicio_adicional1`
    FOREIGN KEY (`id_serv_adicional`)
    REFERENCES `tradecus`.`servicio_adicional` (`id_serv_adicional`),
  CONSTRAINT `fk_detalle_reserva_tour1`
    FOREIGN KEY (`id_tour`)
    REFERENCES `tradecus`.`tour` (`id_tour`),
  CONSTRAINT `fk_detalle_reserva_visitante1`
    FOREIGN KEY (`id_visitate`)
    REFERENCES `tradecus`.`visitante` (`id_visitante`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`medio_transporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`medio_transporte` (
  `id_transporte` INT NOT NULL AUTO_INCREMENT,
  `nombre_transporte` VARCHAR(60) NOT NULL,
  `descripcion_transporte` TEXT NOT NULL,
  PRIMARY KEY (`id_transporte`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`detalle_tour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`detalle_tour` (
  `id_detalle_tour` INT NOT NULL AUTO_INCREMENT,
  `atractivo_tour` VARCHAR(225) NOT NULL,
  `tipo_transporte` VARCHAR(50) NOT NULL,
  `duracion_viaje` VARCHAR(20) NOT NULL,
  `distancia_recorrido` VARCHAR(20) NOT NULL,
  `id_tour` INT NOT NULL,
  `id_transporte` INT NOT NULL,
  PRIMARY KEY (`id_detalle_tour`, `id_tour`, `id_transporte`),
  INDEX `fk_detalle_tour_tour_idx` (`id_tour` ASC) VISIBLE,
  INDEX `fk_detalle_tour_medio_transporte1_idx` (`id_transporte` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_tour_medio_transporte1`
    FOREIGN KEY (`id_transporte`)
    REFERENCES `tradecus`.`medio_transporte` (`id_transporte`),
  CONSTRAINT `fk_detalle_tour_tour`
    FOREIGN KEY (`id_tour`)
    REFERENCES `tradecus`.`tour` (`id_tour`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`imagenes` (
  `id_img` INT NOT NULL AUTO_INCREMENT,
  `nombre_img` VARCHAR(255) NOT NULL,
  `url_img` VARCHAR(255) NOT NULL,
  `tour_id` INT NOT NULL,
  PRIMARY KEY (`id_img`, `tour_id`),
  INDEX `fk_imagenes_tour1_idx1` (`tour_id` ASC) VISIBLE,
  CONSTRAINT `fk_imagenes_tour1`
    FOREIGN KEY (`tour_id`)
    REFERENCES `tradecus`.`tour` (`id_tour`))
ENGINE = InnoDB
AUTO_INCREMENT = 73
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tradecus`.`visitante_reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`visitante_reserva` (
  `id_visitante_reserva` INT NOT NULL AUTO_INCREMENT,
  `id_reserva` INT NOT NULL,
  `id_visitante` INT NOT NULL,
  PRIMARY KEY (`id_visitante_reserva`),
  INDEX `id_reserva` (`id_reserva` ASC) VISIBLE,
  INDEX `id_visitante` (`id_visitante` ASC) VISIBLE,
  CONSTRAINT `visitante_reserva_ibfk_1`
    FOREIGN KEY (`id_reserva`)
    REFERENCES `tradecus`.`reserva` (`id_reserva`)
    ON DELETE CASCADE,
  CONSTRAINT `visitante_reserva_ibfk_2`
    FOREIGN KEY (`id_visitante`)
    REFERENCES `tradecus`.`visitante` (`id_visitante`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
