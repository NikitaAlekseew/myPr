require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const authRouter = require("./router/auth.routes");
const dataRouter = require("./router/data.routes");
const toursRouter = require ('./router/tour.routes');
const userCabinet = require('./router/userCabinet.routes');
const bookingRouter = require('./router/booking.routes');
const cityRouter = require('./router/city.routes');
const customTourRouter = require('./router/customTour.routes')
const errorMiddleware = require("./middleware/error-middleware");

const PORT = process.env.PORT || 4101;
const app = express();

const path = require("path");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api", authRouter);
app.use("/data", dataRouter);
app.use("/", toursRouter);
app.use('/myCabinet/favorite', userCabinet);
app.use('/booking', bookingRouter);
app.use('/city', cityRouter);
app.use('/customTour', customTourRouter)


//? errorMiddleware - всегда пишется после всех routes
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
