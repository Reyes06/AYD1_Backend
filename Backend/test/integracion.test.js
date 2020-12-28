
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

let con;

beforeAll(() => {
    con = mysql.createConnection(objectConnection);
});

afterAll(() => {
    con.end();
});

describe("Verificar parametros iniciales a la base de datos", () => {

    test("Verificar que se ha abierto la conexion a la BD", () => {
        expect(con).not.toBe('undefined');
    });

    test("Verificar que exista al menos un usuario administrador", () => {
        con.connect();
        con.query("SELECT COUNT(*) AS count FROM usuario WHERE tipo_usuario_id_tipo = 1", (err, result, fields) => {
            if (err) throw err;
            expect(result[0].count > 0).toBe(true);
        })
    });

    test("Verificar que exista al menos un pais registrado", () => {
        con = mysql.createConnection(objectConnection);
        con.connect();
        con.query("SELECT COUNT(*) AS count FROM pais", (err, result, fields) => {
            if (err) throw err;
            expect(result[0].count > 0).toBe(true);
        })
    });

    test("Verificar que exista al menos un departamento registrado", () => {
        con = mysql.createConnection(objectConnection);
        con.connect();
        con.query("SELECT COUNT(*) AS count FROM departamento", (err, result, fields) => {
            if (err) throw err;
            expect(result[0].count > 0).toBe(true);
        })
    });

    test("Verificar que exista al menos un municipio registrado", () => {
        con = mysql.createConnection(objectConnection);
        con.connect();
        con.query("SELECT COUNT(*) AS count FROM municipio", (err, result, fields) => {
            if (err) throw err;
            expect(result[0].count > 0).toBe(true);
        })
    });

    test("Verificar que exista al menos una categoria registrada", () => {
        con = mysql.createConnection(objectConnection);
        con.connect();
        con.query("SELECT COUNT(*) AS count FROM categoria", (err, result, fields) => {
            if (err) throw err;
            expect(result[0].count > 0).toBe(true);
        })
    });
});