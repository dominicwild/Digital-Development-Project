const passport = require("passport");
const OutlookStrategy = require("passport-outlook");
const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2");
const jwt = require("jsonwebtoken");
const outlook = require("./outlook");
const EmployeeModel = require("./models/EmployeeModel");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  EmployeeModel.getById(userId)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(error, null);
    });
});

passport.use(
  new AzureAdOAuth2Strategy(
    {
      clientID: outlook.clientID,
      clientSecret: outlook.clientSecret,
      callbackURL: outlook.callbackURL,
      scope: outlook.scope
    },
    function(accessToken, refreshToken, params, profile, done) {
      var profile = jwt.decode(params.id_token, "", true);
      
      const user = {
        firstName: profile.given_name,
        lastName: profile.family_name,
        alias: profile.upn.split("@")[0],
        email: profile.upn,
        accessToken: accessToken,
        refreshToken: refreshToken,
        outlookId: profile.oid
      };

      EmployeeModel.getByOutlookId(profile.oid).then(result => {
        if (result === null) {
          EmployeeModel.create(user)
            .then(user => {
              done(null, user);
            })
            .catch(err => {
              done(err, result);
            });
        } else {
          done(null, result);
        }
      });
    }
  )
);
