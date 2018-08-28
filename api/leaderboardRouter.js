const express = require('express');

const leaderboardRouter = express.Router();

const leaderboard = [
  {
    name: 'Sandy',
    score: '72934'
  },
  {
    name: 'bob',
    score: '56430'
  },
  {
    name: 'Willinator',
    score: '43023'
  }
];

leaderboardRouter.get('/', (req, res) => {
  res.json({leaderboard});
});

leaderboardRouter.post('/', (req, res) => {
  let splicePoint = leaderboard.length;

  console.log(req.body);

  for(let i = 0; i < leaderboard.length; i++) {
    if(leaderboard[i].score < req.body.score) {
      splicePoint = i;
      break;
    }
  }

  let newEntry = {
    name: 'Charles',
    score: '20'
  };

  leaderboard.splice(splicePoint, 0, newEntry);
  res.status(200).send();
})

module.exports = leaderboardRouter;
