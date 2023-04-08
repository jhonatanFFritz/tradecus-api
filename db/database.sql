-- MySQL Script generated by MySQL Workbench
-- Fri Apr  7 18:29:57 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tradecus
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tradecus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tradecus` DEFAULT CHARACTER SET utf8 ;
USE `tradecus` ;

-- -----------------------------------------------------
-- Table `tradecus`.`tour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`tour` (
  `id_tour` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `precio` DECIMAL NOT NULL,
  `duracion` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`id_tour`))
ENGINE = InnoDB;

INSERT INTO tour (nombre, precio, duracion) VALUES 
('Tour a la ciudad de Cusco 1', 100, '1 dia'),
('Tour a la ciudad de Cusco 2', 200, '2 dias'),
('Tour a la ciudad de Cusco 3', 300, '3 dias'),
('Tour a la ciudad de Cusco 4', 400, '4 dias'),
('Tour a la ciudad de Cusco 5', 500, '5 dias');


-- -----------------------------------------------------
-- Table `tradecus`.`detalle_tour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`detalle_tour` (
  `id_detalle_tour` INT NOT NULL AUTO_INCREMENT,
  `atractivo_tour` VARCHAR(45) NOT NULL,
  `tipo_transporte` VARCHAR(50) NOT NULL,
  `duracion_viaje` VARCHAR(8) NOT NULL,
  `distancia_recorrido` VARCHAR(6) NOT NULL,
  `imagen_tour` TEXT NOT NULL,
  `tour_id_tour` INT NOT NULL,
  PRIMARY KEY (`id_detalle_tour`, `tour_id_tour`),
  INDEX `fk_detalle_tour_tour_idx` (`tour_id_tour` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_tour_tour`
    FOREIGN KEY (`tour_id_tour`)
    REFERENCES `tradecus`.`tour` (`id_tour`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tradecus`.`medio_transporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`medio_transporte` (
  `id_transporte` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `detalle_tour_id_detalle_tour` INT NOT NULL,
  `detalle_tour_tour_id_tour` INT NOT NULL,
  PRIMARY KEY (`id_transporte`, `detalle_tour_id_detalle_tour`, `detalle_tour_tour_id_tour`),
  INDEX `fk_medio_transporte_detalle_tour1_idx` (`detalle_tour_id_detalle_tour` ASC, `detalle_tour_tour_id_tour` ASC) VISIBLE,
  CONSTRAINT `fk_medio_transporte_detalle_tour1`
    FOREIGN KEY (`detalle_tour_id_detalle_tour` , `detalle_tour_tour_id_tour`)
    REFERENCES `tradecus`.`detalle_tour` (`id_detalle_tour` , `tour_id_tour`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tradecus`.`tipo_doc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`tipo_doc` (
  `id_tipo_doc` INT NOT NULL AUTO_INCREMENT,
  `nombre_doc` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_tipo_doc`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tradecus`.`visitante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`visitante` (
  `id_visitate` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `sexo` VARCHAR(6) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `numero_doc` VARCHAR(18) NOT NULL,
  `tipo_doc_id_tipo_doc` INT NOT NULL,
  PRIMARY KEY (`id_visitate`, `tipo_doc_id_tipo_doc`),
  INDEX `fk_visitante_tipo_doc1_idx` (`tipo_doc_id_tipo_doc` ASC) VISIBLE,
  CONSTRAINT `fk_visitante_tipo_doc1`
    FOREIGN KEY (`tipo_doc_id_tipo_doc`)
    REFERENCES `tradecus`.`tipo_doc` (`id_tipo_doc`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tradecus`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`reserva` (
  `id_reserva` INT NOT NULL AUTO_INCREMENT,
  `codigo_reserva` VARCHAR(8) NOT NULL,
  `fecha_reserva` DATE NOT NULL,
  `fecha_llegada` DATE NOT NULL,
  PRIMARY KEY (`id_reserva`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tradecus`.`empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`empleado` (
  `id_empleado` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `telefono` VARCHAR(18) NOT NULL,
  `num_doc` VARCHAR(18) NOT NULL,
  `tipo_doc_id_tipo_doc` INT NOT NULL,
  PRIMARY KEY (`id_empleado`, `tipo_doc_id_tipo_doc`),
  INDEX `fk_empleado_tipo_doc1_idx` (`tipo_doc_id_tipo_doc` ASC) VISIBLE,
  CONSTRAINT `fk_empleado_tipo_doc1`
    FOREIGN KEY (`tipo_doc_id_tipo_doc`)
    REFERENCES `tradecus`.`tipo_doc` (`id_tipo_doc`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tradecus`.`metodo_pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`metodo_pago` (
  `id_metodo_pago` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_metodo_pago`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tradecus`.`detalle_reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`detalle_reserva` (
  `id_detalle_reserva` INT NOT NULL AUTO_INCREMENT,
  `visitante_id_visitate` INT NOT NULL,
  `reserva_id_reserva` INT NOT NULL,
  `tour_id_tour` INT NOT NULL,
  `empleado_id_empleado` INT NOT NULL,
  `metodo_pago_id_metodo_pago` INT NOT NULL,
  PRIMARY KEY (`id_detalle_reserva`, `visitante_id_visitate`, `reserva_id_reserva`, `tour_id_tour`, `empleado_id_empleado`, `metodo_pago_id_metodo_pago`),
  INDEX `fk_detalle_reserva_visitante1_idx` (`visitante_id_visitate` ASC) VISIBLE,
  INDEX `fk_detalle_reserva_reserva1_idx` (`reserva_id_reserva` ASC) VISIBLE,
  INDEX `fk_detalle_reserva_tour1_idx` (`tour_id_tour` ASC) VISIBLE,
  INDEX `fk_detalle_reserva_empleado1_idx` (`empleado_id_empleado` ASC) VISIBLE,
  INDEX `fk_detalle_reserva_metodo_pago1_idx` (`metodo_pago_id_metodo_pago` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_reserva_visitante1`
    FOREIGN KEY (`visitante_id_visitate`)
    REFERENCES `tradecus`.`visitante` (`id_visitate`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_reserva_reserva1`
    FOREIGN KEY (`reserva_id_reserva`)
    REFERENCES `tradecus`.`reserva` (`id_reserva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_reserva_tour1`
    FOREIGN KEY (`tour_id_tour`)
    REFERENCES `tradecus`.`tour` (`id_tour`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_reserva_empleado1`
    FOREIGN KEY (`empleado_id_empleado`)
    REFERENCES `tradecus`.`empleado` (`id_empleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_reserva_metodo_pago1`
    FOREIGN KEY (`metodo_pago_id_metodo_pago`)
    REFERENCES `tradecus`.`metodo_pago` (`id_metodo_pago`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tradecus`.`servicio_adicional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tradecus`.`servicio_adicional` (
  `id_serv_adicional` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `precio` DECIMAL NOT NULL,
  `detalle_reserva_id_detalle_reserva` INT NOT NULL,
  PRIMARY KEY (`id_serv_adicional`, `detalle_reserva_id_detalle_reserva`),
  INDEX `fk_servicio_adicional_detalle_reserva1_idx` (`detalle_reserva_id_detalle_reserva` ASC) VISIBLE,
  CONSTRAINT `fk_servicio_adicional_detalle_reserva1`
    FOREIGN KEY (`detalle_reserva_id_detalle_reserva`)
    REFERENCES `tradecus`.`detalle_reserva` (`id_detalle_reserva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;