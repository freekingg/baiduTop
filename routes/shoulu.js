const Router = require("koa-router");
const router = new Router({
  prefix: "/shoulu",
});
const { create,progress } = require("../controllers/shoulu");

// router.get("/", find);

router.get("/progress", progress);


router.post("/", create);

// router.get("/:id", findById);

module.exports = router;
