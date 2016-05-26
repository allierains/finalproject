module.exports = function(app, passport) {



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
