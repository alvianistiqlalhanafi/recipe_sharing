const bcrypt = require("bcrypt");
const basicAuth = require("basic-auth");
const response = require("../utils/respons");
const db = require("../config/database");

const auth = (req, res, next) => {
    const auth = basicAuth(req);
    const sql1 = `SELECT * FROM users WHERE username = ?`;
    db.promise().query(sql1, [auth.name])
      .then(([result]) => {
        if (!auth || !auth.name || !auth.pass) {
          return response(401, "Unauthorized", "Input Username and Password", res);
        }
        const results = result[0];
        bcrypt.compare(auth.pass, results.password, (error, isMatch) => {
          if (error) {
            return response(401, "Unauthorized", "Error comparing password", res);
          }
          if (!isMatch) {
            return response(401, "Unauthorized", "Wrong username or password", res);
          }
          next();
        });
      })
      .catch(error => {
        return response(401, "Unauthorized", "No Authentication Data Found", res);
      });
  };
  
module.exports = auth;