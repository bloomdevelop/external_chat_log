export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

    const error = process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message;

    res.status(500).json({
      error: error
    });
}
