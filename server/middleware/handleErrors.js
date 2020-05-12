const handleError = (err, request, response, next) => {
  if (err.status) {
    return response.status(err.status).json(err.message);
  }

  if (err.name === "ValidationError") {
    return response.status(409).json(formatErrorMessage(err));
  }

  if (config.production) {
    return response
      .status(500)
      .send("an error has occurred, please ty again later");
  } else {
    return response.status(500).json(err.message);
  }
};

const formatErrorMessage = (err) => {
  const arr = err.message.split(":");
  const error = err.errors[arr[1].trim()];
  if (error["properties"]) {
    return error.properties;
  } else if (error.name === "CastError") {
    return error.message;
  }
};

module.exports = handleError;
