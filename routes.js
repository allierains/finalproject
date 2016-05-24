module.exports = function(app, passport) {

    // route for home page
    // app.get('/', function(req, res) {
    //     res.render('home.ejs'); // load the index.ejs file
    // });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page


        // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // route for twitter authentication and login

    // handle the callback after twitter has authenticated the user
    app.get('/login/twitter/return', function(req, res) {
        res.render('login.ejs');
        // passport.authenticate('twitter', {
        //     successRedirect : '/profile',
        //     failureRedirect : '/'
        });
    };



// route middleware to make sure a user is logged in
