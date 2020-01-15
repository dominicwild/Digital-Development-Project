const passport = require("passport");
const OutlookStrategy = require("passport-outlook");
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
  new OutlookStrategy(
    {
      clientID: outlook.clientID,
      clientSecret: outlook.clientSecret,
      callbackURL: "http://localhost:3001/api/auth/outlook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      const displayName = profile.displayName; //In format LastName,FirstName
      const [lastName, firstName] = displayName.split(",");
      const user = {
        firstName: firstName,
        lastName: lastName,
        alias: profile.alias,
        email: profile.emails[0].value,
        accessToken: accessToken,
        refreshToken: refreshToken,
        outlookId: profile.id
      };

      
      EmployeeModel.getByOutlookId(user.outlookId).then(result => {
        
        if (result === null) {
          EmployeeModel.create(user)
            .then(user => {
              console.log(user)
              done(null, user);
            })
            .catch(err => {
              done(err, result);
            });
        } else {
          console.log(result);
          done(null, result);
        }
      });
    }
  )
);
