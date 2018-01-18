export const handleError = (error, req, res, next) => {
  console.error("Internal error", error);
  res.sendStatus(500);
};
