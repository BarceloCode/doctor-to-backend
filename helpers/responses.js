exports.sendSuccess = (res, data) => {
  res.status(200).json({
    success: true,
    result: data,
    message: "Task completed succesfully!",
    statusCode: 200,
  });
};

exports.sendUpdated = (res) => {
  res.status(204).json({
    success: true,
    message: "Updated Succesfully!",
    statusCode: 204,
  });
};

exports.sendError = (res, message) => {
  res.status(422).json({
    success: false,
    message,
    statusCode: 422,
  });
};

exports.sendCreated = (res, data) => {
  res.status(201).json({
    success: true,
    result: data,
    message: "Created successfully!",
    statusCode: 201,
  });
};

exports.sendBadrequest = (res) => {
  res.status(400).json({
    success: false,
    message: "Request cant be processed",
    statusCode: 400,
  });
};

exports.sendNotFound = (res) => {
  res.status(404).json({
    success: false,
    message: "Data not found",
    statusCode: 404,
  });
};

exports.sendServerError = (res) => {
  res.status(404).json({
    success: false,
    message: "Internal server error",
    statusCode: 500,
  });
};

exports.sendCoustom = (res, data, success, message, statusCode) => {
  res.status(statusCode).json({
    success: success,
    data: data,
    message: message,
    statusCode: statusCode,
  });
};
