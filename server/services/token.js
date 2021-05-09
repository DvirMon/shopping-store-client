const jwt = require("jsonwebtoken");
const generator = require("generate-password");

// function to create an access token
const getAccessToken = (payload) => {
  return new Promise((resolve, reject) => {

    const user = { _id: payload._id, email: payload.email }

    jwt.sign({ user },
      process.env.JWT_ACCESS,
      { expiresIn: "5m" },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
// end of function

// function to create a refresh token
const getRefreshToken = (payload) => {

  const user = { _id: payload._id, email: payload.email }

  return new Promise((resolve, reject) => {
    jwt.sign({ user },
      process.env.JWT_REFRESH,
      { expiresIn: "3d" },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
// end of function

// function to create an access token
const getConfirmationToken = (contact) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { contact },
      process.env.JWT_CONFIRMATION,
      { expiresIn: "5m" },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
// end of function
module.exports = {
  getAccessToken,
  getRefreshToken,
  getConfirmationToken
};
