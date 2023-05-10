const response = require("../utils/respons");
const { hashPassword } = require('../utils/hash_password');
const db = require("../config/database");

// CREATE USERS
const createUsers = async (req, res) => {
    try {
      const { username, password, first_Name, last_Name, address, bio, phone_Number } =
        req.body;
        const hashedPassword = await hashPassword(password);
      const sql = `INSERT INTO users (username, password, first_Name, last_Name, address, bio, phone_Number)
                   values (?, ?, ?, ?, ?, ?, ?)`;
  
      db.query (sql, [username, hashedPassword, first_Name, last_Name, address, bio, phone_Number,], 
        (error, result) => {
        if (error) {
          response(400, error.name, error.message, res);
          return;
        }
        if (result.affectedRows) {
          const data = {
            isSuccess: result.affectedRows,
            usersID: result.insertId,
          };
          response(200, data, "Successfully created account", res);
        }
      });
    } catch (error) {
      response(400, error.name, error.message, res);
    }
};

// GET ALL USERS
const getAllUsers = (req, res) => {
    const sql = `SELECT * FROM users`;
  
    db.query(sql, (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      response(200, result, "Successfully get all users", res);
    });
  };
  
// GET USERS BY ID
const getUsersById = (req, res) => {
    const userId = req.params.usersID;
    const sql = `SELECT * FROM users WHERE usersID = ?`;
  
    db.query(sql, [userId], (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      if (result.length) {
        response(200, result[0], "Successfully get user", res);
      } else {
        response(404, null, "User not found", res);
      }
    });
};
  
// UPDATE USERS
const updateUsers = async (req, res) => {
    try {
      const userId = req.params.usersID;
      const { username, password, first_Name, last_Name, address, bio, phone_Number } =
        req.body;

      const hashedPassword = await hashPassword(password);
  
      const sql = `UPDATE users SET username=?, password=?, first_Name=?, last_Name=?, address=?, bio=?, phone_Number=? WHERE usersID=?`;
  
      db.query(
        sql,
        [username, hashedPassword, first_Name, last_Name, address, bio, phone_Number, userId],
        (error, result) => {
          if (error) {
            response(400, error.name, error.message, res);
            return;
          }
          if (result.affectedRows) {
            const data = {
              isSuccess: result.affectedRows,
            };
            db.query('SELECT * FROM users WHERE usersID = ?', [userId], (err, result) => {
              if (err) {
                response(500, err.name, err.message, res);
                return;
              }
              if (result.length > 0) {
                response(200, data, "Successfully updated user", res);
              } else {
                response(404, null, "User not found", res);
              }
            });
          } else {
            response(404, null, "User not found", res);
          }
        }
      );
    } catch (error) {
      response(400, error.name, error.message, res);
    }
  };

// DELETE USERS
const deleteUsers = (req, res) => {
    const userId = req.params.usersID;
    const sql = `DELETE FROM users WHERE usersID = ?`;
  
    db.query(sql, [userId], (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      if (result.affectedRows) {
        const data = {
          isSuccess: result.affectedRows,
        };
        response(200, data, "Successfully deleted user", res);
      } else {
        response(404, null, "User not found", res);
      }
    });
};
  
module.exports = {
    createUsers,
    getAllUsers,
    getUsersById,
    updateUsers,
    deleteUsers,
};