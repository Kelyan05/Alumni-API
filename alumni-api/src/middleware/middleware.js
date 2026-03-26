module.exports = async (req, res, next) => {
    const key = req.headers['x-api-key'];
  
    if (!key) return res.status(403).send("No key");
  
    if (key !== "testkey") return res.status(403).send("Invalid");
  
    next();
  };