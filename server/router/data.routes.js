const Router = require("express").Router;
const router = new Router();

const authMiddleware = require("../middleware/auth-middleware");
const dataController = require("../controllers/data-controller");

const upload = require("../service/upload");

router.get("/roles", dataController.getRoles);
router.get("/cities", dataController.getCities);
router.get("/tours/categories", dataController.getTourCategories);
router.post(
  "/guide/tour/create",
  upload.array("images"),
  dataController.createNewTour
);

router.post("/guide/tour/cards", dataController.getGuideCardById);

router.delete("/guide/tour/:id", dataController.deleteGuideCardById);
router.get("/guide/tour/edit/:id", dataController.getIdGuideCard);
router.post(
  "/guide/tour/edit/:id",
  upload.array("images"),
  dataController.editGuideCardById
);

router.get("/card/:id", dataController.getDataCard);

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Возвращаем URL загруженного файла
  res.json({
    url: `${process.env.API_URL}/public/uploads/${req.file.filename}`,
  });
});
router.get("/places", dataController.getPlaces);
router.post("/myCabinet/customTour/create", dataController.createNewCustomTour);
router.post("/myCabinet/customTour", dataController.getCustomTours);

module.exports = router;
