var mysql = require('mysql');

var con = mysql.createConnection({
  host: "bvwds6jhztumdpjbhhvu-mysql.services.clever-cloud.com",
  user: "unzioikaweymhb8b",
  password: "3mjXFFedT4pJh7XtdE9P",
  database: "bvwds6jhztumdpjbhhvu"
});

module.exports = con;