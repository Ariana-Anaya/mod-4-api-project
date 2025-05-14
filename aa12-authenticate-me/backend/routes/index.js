// backend/routes/index.js
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// Static routes
// serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // serve the frontend's index.html at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });

  // router.use(express.static(path.resolve("../frontend/dist"))); // from the README-deploy.md, caused the MIME type error
  // Serve the static assets in the frontend's build folder
  router.use(
    express.static(path.resolve(__dirname, "../../frontend/", "dist"))
  );

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });
}

// Add a XSRF-TOKEN cookie in development.  Combination of the code we used last module and this module so that we still have the token returned for logging, and for use with Postman if we wanted to manually test backend routes.
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken(); // this csrfToken() method was given to us in app.js from line 43.
    res.cookie("XSRF-TOKEN", csrfToken); // most important part, set the XSRF-TOKEN in cookies. so we now have both a _csrf and XSRF-TOKEN.  The _csrf part is handled in app.js before we even get to this file.
    res.status(200).json({
      "XSRF-Token": csrfToken, 
    });
  });
}

module.exports = router;
