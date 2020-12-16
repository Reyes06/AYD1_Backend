INSERT INTO tipo_usuario (nombre, descripcion) VALUES ("Administrador", "Es el administrador de todo el sistema");
INSERT INTO tipo_usuario (nombre, descripcion) VALUES ("Comercial", "Es el usuario que posee al menos una tienda en el sistema");
INSERT INTO tipo_usuario (nombre, descripcion) VALUES ("Cliente", "Es el usuario que unicamente puede realizar compras en el sistema");

INSERT INTO pais (nombre) VALUES ("Guatemala");

SELECT * FROM pais;

INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (1, "Alta verapaz", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (2, "Baja verapaz", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (3, "Chimaltenango", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (4, "Chiquimula", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (5, "El progreso", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (6, "Escuintla", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (7, "Guatemala", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (8, "Huehuetenango", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (9, "Izabal", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (10, "Jalapa", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (11, "Jutiapa", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (12, "Peten", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (13, "Quetzaltenango", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (14, "Quiche", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (15, "Retalhuleu", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (16, "Sacatepequez", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (17, "San Marcos", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (18, "Santa Rosa", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (19, "Solola", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (20, "Suchitepequez", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (21, "Totonicapan", 1);
INSERT INTO departamento (id_depto, nombre, pais_id_pais) VALUES (22, "Zacapa", 1);

select * from municipio;

INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Flores", 12);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Puerto Barrios", 9);

INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Coban", 1);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Puerto Barrios", 9);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Santa cruz del Quiché", 14);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Huehuetenango", 8);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Escuintla", 6);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("San Marcos", 17);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Jutiapa", 11);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Salamá", 2);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Cuilapa", 18);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Zacapa", 22);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Mazatenango", 20);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Chiquimula", 4);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Ciudad de Guatemala", 7);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Jalapa", 10);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Chimaltenango", 3);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Quetzaltenango", 13);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Guastatoya", 5);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Retalhuleu", 15);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Solola", 19);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Totonicapan", 21);
INSERT INTO municipio (nombre, departamento_id_depto) VALUES ("Antigua Guatemala", 16);

INSERT INTO sector (nombre) VALUES ("Supermercado");
INSERT INTO sector (nombre) VALUES ("Pescadería");
INSERT INTO sector (nombre) VALUES ("Frutería");
INSERT INTO sector (nombre) VALUES ("Ferreteria");
INSERT INTO sector (nombre) VALUES ("Farmacia");
INSERT INTO sector (nombre) VALUES ("Libreria");
INSERT INTO sector (nombre) VALUES ("Vehiculos");
INSERT INTO sector (nombre) VALUES ("Zapatería");
INSERT INTO sector (nombre) VALUES ("Perfumeria");
INSERT INTO sector (nombre) VALUES ("Carniceria");
INSERT INTO sector (nombre) VALUES ("Tecnologia");


delete from sector where id_sector < 3;