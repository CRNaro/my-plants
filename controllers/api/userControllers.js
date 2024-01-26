const router = require('express').Router();
const { User } = require('../../models');
const { sendEmail } = require('../../controllers/nodemailerConfig');

//Create New User
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });


    req.session.save(async () => {
      req.session.logged_in = true;

      // send email to user
      const welcomeMessage = `Welcome to I Wet My Plants, ${userData.name}!`;
      const welcomeText = `Thank you ${req.body.name}, for signing up for I Wet My Plants! 
      We hope you enjoy using our app to keep track of your plants' 
      watering schedules. Happy growing!`;

      try { 
        await sendEmail(req.body.email, welcomeMessage, welcomeText);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Error sending email: ', emailError);
      }

      res.status(200).json(userData);

    });
  } catch (err) {
    res.status(500).json(err)
  }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
            return;
          }

          const validPassword = await userData.checkPassword(req.body.password);

          if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
            return;
          }
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.redirect('/')
          });
      
        } catch (err) {
          res.status(500).json(err);
        }
      });

      //Logout
      router.post('/logout', (req, res) => {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
              });
            } else {
              res.status(404).end();
            }
          });
          
            module.exports = router;