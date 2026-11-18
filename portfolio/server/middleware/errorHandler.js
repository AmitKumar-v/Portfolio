// Runs when no route matched the URL
export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

// Runs when any controller throws an error. Express 5 catches errors from async functions for us.
export function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;

  // Mongoose validation failed (for example a required field is missing)
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }
  // The id in the URL is not a valid MongoDB id
  if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid id';
  }

  // multer error, for example the file is bigger than the limit
  if (err.name === 'MulterError') {
    status = 400;
    message = err.code === 'LIMIT_FILE_SIZE' ? 'File is too large. Maximum size is 2 MB' : 'Could not upload the file';
  }

  if (status === 500) {
    console.error(err);
    message = 'Something went wrong on the server';
  }

  res.status(status).json({ message });
}
