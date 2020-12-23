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
    nombre                  	VARCHAR(75) NOT NULL,
    logo                    	TEXT NOT NULL,
    direccion               	VARCHAR(100) NOT NULL,
    estado						VARCHAR(15) NOT NULL,
    usuario_nombre				VARCHAR(50) NOT NULL,
    usuario_apellido			VARCHAR(50) NOT NULL,
    usuario_fecha_nacimiento	VARCHAR(50) NOT NULL,
    usuario_correo_electronico 	VARCHAR(75) NOT NULL,
    usuario_sexo 				CHAR(1) NOT NULL,
    usuario_password			VARCHAR(50) NOT NULL,
    municipio_id_municipio  	INTEGER NOT NULL,
    sector_id_sector        	INTEGER NOT NULL,
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
    nombre_tienda         VARCHAR(50) NOT NULL,
    apellido              VARCHAR(50) NOT NULL,
    fecha_nacimiento      DATE NOT NULL,
    correo_electronico    VARCHAR(75) NOT NULL,
    sexo                  CHAR(1) NOT NULL,
    tarjeta_credito       INTEGER,
    password              VARCHAR(50) NOT NULL,
    tipo_usuario_id_tipo  INTEGER NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY ( id_usuario )
);

CREATE TABLE categoria (
    id_categoria  INTEGER NOT NULL,
    nombre        VARCHAR(50) NOT NULL,
    CONSTRAINT categoria_pk PRIMARY KEY ( id_categoria )
);

CREATE TABLE depto_tienda (
    id_depto          INTEGER NOT NULL,
    nombre            VARCHAR(50) NOT NULL,
    tienda_id_tienda  INTEGER NOT NULL,
    CONSTRAINT depto_tienda_pk PRIMARY KEY ( id_depto )
);

CREATE TABLE inventario (
    producto_id_producto  INTEGER NOT NULL,
    cantidad              INTEGER NOT NULL,
    CONSTRAINT inventario_pk PRIMARY KEY ( producto_id_producto )
);

CREATE TABLE producto (
    id_producto            INTEGER NOT NULL,
    nombre                 VARCHAR(50) NOT NULL,
    descripcion            VARCHAR(75) NOT NULL,
    depto_tienda_id_depto  INTEGER NOT NULL,
    CONSTRAINT producto_pk PRIMARY KEY ( id_producto )
);

CREATE TABLE producto_categoria (
    producto_id_producto    INTEGER NOT NULL,
    categoria_id_categoria  INTEGER NOT NULL,
    CONSTRAINT producto_categoria_pk PRIMARY KEY ( producto_id_producto, categoria_id_categoria )
);

CREATE TABLE tienda (
    id_tienda           INTEGER NOT NULL,
    fecha_aprobacion    DATE NOT NULL,
    usuario_id_usuario  INTEGER NOT NULL,
    CONSTRAINT tienda_pk PRIMARY KEY ( id_tienda )
);

ALTER TABLE departamento
    ADD CONSTRAINT departamento_pais_fk FOREIGN KEY ( pais_id_pais )
        REFERENCES pais ( id_pais );

ALTER TABLE depto_tienda
    ADD CONSTRAINT depto_tienda_tienda_fk FOREIGN KEY ( tienda_id_tienda )
        REFERENCES tienda ( id_tienda );

ALTER TABLE inventario
    ADD CONSTRAINT inventario_producto_fk FOREIGN KEY ( producto_id_producto )
        REFERENCES producto ( id_producto );

ALTER TABLE municipio
    ADD CONSTRAINT municipio_departamento_fk FOREIGN KEY ( departamento_id_depto )
        REFERENCES departamento ( id_depto );

ALTER TABLE producto_categoria
    ADD CONSTRAINT producto_categoria_categoria_fk FOREIGN KEY ( categoria_id_categoria )
        REFERENCES categoria ( id_categoria );

ALTER TABLE producto_categoria
    ADD CONSTRAINT producto_categoria_producto_fk FOREIGN KEY ( producto_id_producto )
        REFERENCES producto ( id_producto );

ALTER TABLE producto
    ADD CONSTRAINT producto_depto_tienda_fk FOREIGN KEY ( depto_tienda_id_depto )
        REFERENCES depto_tienda ( id_depto );

ALTER TABLE tienda
    ADD CONSTRAINT tienda_formulario_fk FOREIGN KEY ( id_tienda )
        REFERENCES formulario ( id_formulario );

ALTER TABLE formulario
    ADD CONSTRAINT tienda_municipio_fk FOREIGN KEY ( municipio_id_municipio )
        REFERENCES municipio ( id_municipio );

ALTER TABLE formulario
    ADD CONSTRAINT tienda_sector_fk FOREIGN KEY ( sector_id_sector )
        REFERENCES sector ( id_sector );

ALTER TABLE tienda
    ADD CONSTRAINT tienda_usuario_fk FOREIGN KEY ( usuario_id_usuario )
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

