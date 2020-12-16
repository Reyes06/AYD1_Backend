CREATE TABLE departamento (
    id_depto      INTEGER NOT NULL AUTO_INCREMENT,
    nombre        VARCHAR(50) NOT NULL,
    pais_id_pais  INTEGER NOT NULL,
    CONSTRAINT departamento_pk PRIMARY KEY ( id_depto )
);


CREATE TABLE municipio (
    id_municipio           INTEGER NOT NULL AUTO_INCREMENT,
    nombre                 VARCHAR(50) NOT NULL,
    departamento_id_depto  INTEGER NOT NULL,
    CONSTRAINT municipio_pk PRIMARY KEY ( id_municipio )
);

CREATE TABLE pais (
    id_pais  INTEGER NOT NULL AUTO_INCREMENT,
    nombre   VARCHAR(50) NOT NULL,
    CONSTRAINT pais_pk PRIMARY KEY ( id_pais )
);

CREATE TABLE sector (
    id_sector  INTEGER NOT NULL AUTO_INCREMENT,
    nombre     VARCHAR(50) NOT NULL,
    CONSTRAINT sector_pk PRIMARY KEY ( id_sector )
);


CREATE TABLE formulario (
    id_formulario               INTEGER NOT NULL AUTO_INCREMENT,
    nombre                  VARCHAR(75) NOT NULL,
    logo                    BLOB,
    direccion               VARCHAR(100) NOT NULL,
    usuario_id_usuario      INTEGER NOT NULL,
    municipio_id_municipio  INTEGER NOT NULL,
    sector_id_sector        INTEGER NOT NULL,
    CONSTRAINT formulario_pk PRIMARY KEY ( id_formulario )
);


CREATE TABLE tipo_usuario (
    id_tipo      INTEGER NOT NULL AUTO_INCREMENT,
    nombre       VARCHAR(50) NOT NULL,
    descripcion  VARCHAR(250) NOT NULL,
    CONSTRAINT tipo_usuario_pk PRIMARY KEY ( id_tipo )
);


CREATE TABLE usuario (
    id_usuario            INTEGER NOT NULL AUTO_INCREMENT,
    nombre                VARCHAR(50) NOT NULL,
    apellido              VARCHAR(50) NOT NULL,
    fecha_nacimiento      DATE NOT NULL,
    correo_electronico    VARCHAR(75) NOT NULL,
    sexo                  CHAR(1) NOT NULL,
    tarjeta_credito       INTEGER,
    password              VARCHAR(50) NOT NULL,
    tipo_usuario_id_tipo  INTEGER NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY ( id_usuario )
);

CREATE TABLE tienda (
	formulario_id_tienda	INTEGER NOT NULL,
    fecha_aprovacion		DATE NOT NULL,
    CONSTRAINT tienda_pk	PRIMARY KEY (formulario_id_tienda)
);


ALTER TABLE departamento
    ADD CONSTRAINT departamento_pais_fk FOREIGN KEY ( pais_id_pais )
        REFERENCES pais ( id_pais );

ALTER TABLE municipio
    ADD CONSTRAINT municipio_departamento_fk FOREIGN KEY ( departamento_id_depto )
        REFERENCES departamento ( id_depto );

ALTER TABLE formulario
    ADD CONSTRAINT formulario_municipio_fk FOREIGN KEY ( municipio_id_municipio )
        REFERENCES municipio ( id_municipio );

ALTER TABLE formulario
    ADD CONSTRAINT formulario_sector_fk FOREIGN KEY ( sector_id_sector )
        REFERENCES sector ( id_sector );

ALTER TABLE formulario
    ADD CONSTRAINT formulario_usuario_fk FOREIGN KEY ( usuario_id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_tipo_usuario_fk FOREIGN KEY ( tipo_usuario_id_tipo )
        REFERENCES tipo_usuario ( id_tipo );

/*
DROP TABLE tienda;
DROP TABLE sector;
DROP TABLE usuario;
DROP TABLE tipo_usuario;
DROP TABLE municipio;
DROP TABLE departamento;
DROP TABLE pais;   
*/

