const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


router.get('/me', auth , async (req, res) => {
  try {
      const profile = await Profile.findOne({ user: req.user.id}).populate('user',['name' , 'avatar']);
      if (!profile) {
          return res.status(400).json({msg: 'There is no profile for this user'});
      }
      res.json(profile);
  } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
  }
});


router.post('/', auth , [check('status','Status is required').not().isEmpty(),check('skills','Skills is required').not().isEmpty()] ,
  async (req , res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

  }

  const { 
     company,
     website,
     location,
     bio,
     status,
     githubusername,
     skills,
     youtube,
     facebook,
     twitter,
     instagram,
     linkedin,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;

  if (company) profileFields.company = company.trim();
    if (website) profileFields.website = website.trim();
    if (location) profileFields.location = location.trim();
    if (bio) profileFields.bio = bio.trim();
    if (status) profileFields.status = status.trim();
    if (githubusername) profileFields.githubusername = githubusername.trim();
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {} ;
    if (youtube) profileFields.social.youtube = youtube.trim();
    if (facebook) profileFields.social.facebook = facebook.trim();
    if (twitter) profileFields.social.twitter = twitter.trim();
    if (instagram) profileFields.social.instagram = instagram.trim();
    if (linkedin) profileFields.social.linkedin = linkedin.trim();

      try {
         let profile= await Profile.findOne({ user : req.user.id}) ;
         if (profile) {
             profile= await Profile.findOneAndUpdate(
                 {user : req.user.id},
                 {$set: profileFields},
                 {new: true}
             );
         } else {
             profile = new Profile(profileFields);
             await profile.save();
         }
         return res.json(profile);
      } catch (error) {
          console.error(error.message);
          res.status(500).send('Server Error');

      }
      console.log(profileFields.skills);
      res.send('Hello');
    }
);

router.get('/', async(req,res) => {
   try {
       const profiles = await Profile.find().populate('user', ['name','avatar']);
       res.json(profiles);
   } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error');
   }

});


// Get Profile by userId

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate('user', ['name','avatar']);

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
          }
          res.json(profile);
      } catch(error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');

      }
});



