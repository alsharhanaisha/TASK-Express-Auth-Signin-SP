If you need a starting point fork this: [Starting point](https://github.com/JoinCODED/TASK-Express-Auth-Signin-SP).


#### Signin Route

1. In our user `controllers`, create a method called `signin`.
2. For now just console log the response.
3. Create your route in `users.routes.js` and give it the path `/signin` and a `post` method.
4. Test it in Postman. You should get the response logged.

#### Passport Setup

1. Install `passport` and `passport-local`.
2. Require `passport` in `app.js`.
3. Call the `app.use` method and pass it `passport.initialize()`.

#### Local Strategy

1. In `middleware`, create a file called `passport.js`.
2. Require `LocalStrategy` from `passport-local`.
3. Create a variable called `localStrategy` that's equal to a `LocalStrategy` instance.
4. Pass `LocalStrategy` an asynchronous function as an argument. This function receives three parameters: `username`, `password` and `done`.
5. Add a `try catch` statement in the function. In the `catch` block, call `done` and pass it `error`.
6. Look for a user in the `User` model that has the username `username` that's passed to the local strategy. Save it in a variable called `user`.
7. Don't forget to import `User`.
8. Require `bcrypt`.
9. If `user` exists, call `bcrypt.compare()` and pass it `password` and `user.password` for comparison.
10. Save the returned value in a variable called `passwordsMatch`.
11. If `user` doesn't exist, set `passwordsMatch` to `false`.
12. If `passwordsMatch` is `true`, return `done()` and pass it two arguments, `null` and `user`.
13. Else, `return` `done()` and pass it two arguments, `null` and `false`.
14. In `app.js`, require the `localStrategy` instance that we just created.
15. Under the `passport` initialization, call `passport.use()` and pass it `localStrategy`.
16. In the `/signin` route, call `passport.authenticate()` and pass it `"local"` and `{ session: false }` as arguments.
17. Test your route in `Postman`.

#### Generating a Token

Generate a token in user `controllers`'s `signin` function.

1. In the user controller create a generate token method that takes a user and returns a token
2. In the `signin` method, call the `generateToken` function and pass it `req.user`.
3. Save the returned value in a variable called `token`.
4. Send `token` in an object as a `json` response.
