//? 1. What do you think is wrong with the code, if anything?
// Changed declarations from (var) to (const)
// As it's asynchronous function, added (async) and (await)
// HTTP response status codes, line 55 does not make sence, as it's passing BAD REQUEST after REQUEST HAS SUCCEEDED.

//? 2. Can you see any potential problems that could lead to exceptions.
// I wouldn't use Old-style call back on Superagens ad (.end()) - instead use (.then()) 

//? 3. How would you refactor this code to:
// I would implement TEST for Superagent

//?Improve the stability of the system:
// Build testing for it, error reporting, build pipeline tests

//? Improve the testability of the code
// Use callbacks or promises with asynchromous code
// Give each function a single purpose and try not to mutate parameters

//? 4. How might you use the latest JavaScript features to refactor the code?
// I guess I would follow Test Driven Development and Continuous Integration during code refactoring. 
// It will greatly minimize the risk of introducing new bugs in the system.



//! Refactored code

// missing superagent
const superagent = require('superagent');

exports.inviteUser = (req, res) => {
  //changed to const instead var
  const invitationBody = req.body;
  const shopId = req.params.shopId;
  // Here should be 
  const authUrl = process.env.AUTH_URL;
  // instead of 
  const authUrl = "https://url.to.auth.system.com/invitation";

  superagent
  .post(authUrl)
  .send(invitationBody)
  // added async
  .end(async function (err, res) {
    if (res.status === 201) {
      // added await
      await User.findOneAndUpdate({
        authId: invitationResponse.body.auth,
        email: invitationBody.email
      },{
        upsert: true,
        new: true
      }, 
      // added async
      async function(err, createdUser) {
        // added await
        await Shop.findById(shopId).exec(function(err, shop) {
          if (err || !shop) {
            return res.status(500).send(err || {message: 'No shop found'});
          }
          if (shop.invitations.indexOf(res.body.invitationId)) {
            shop.invitations.push(res.body.invitationId);
          }
          if(shop.users.indexOf(createdUser._id) === -1) {
            shop.users.push(createdUser);
          }
          // added await
          await shop.save()
        })
      })
    } else if (invitationResponse.status === 200) {
      // (invitationResponse.status === 200) it sends request has succeeded, 
      //and res.status(400) it sends (server could not understand the request due to invalid syntax)
      res.status(400).json({
        error: true,
        message: 'User already invited to this shop'
      });
      return;
    }
    res.json(invitationResponse)
  })
}