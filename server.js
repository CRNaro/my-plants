const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

require("dotenv").config();

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });


const sess = {
  secret: process.env.SECRET, // Ensure this is set in your .env file
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Static files cache control
const oneDay = 1000 * 60 * 60 * 24; // 24 hours
app.use(express.static(path.join(__dirname, "public"), { maxAge: oneDay }));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


const middleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next();
}

app.use(middleware)


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}!`));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
