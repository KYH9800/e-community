const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('this is post router');
});

module.exports = router;