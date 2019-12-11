import express from "express";
import { parseGet } from "../middlewares/parse_get";
import { parsePost } from "../middlewares/parse_post";
import { parseDelete } from "../middlewares/parse_delete";
import { authenticateUser } from "../middlewares/auth";
import { modifyUserPath } from "../middlewares/modify_user_path";
const fetch = require("node-fetch");

export const router = express.Router();
export const prefix = '/user';

const { userStore } = require('../data/DataStore');

/**
 * Every request needs to be from a logged in user.
 * Modify path prefixes each request with the user's name.
 */
router.use([authenticateUser, modifyUserPath]);

router.get('/test', parseGet, function(req, res){
  const result = req.handleGet(userStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
})

router.post('/playlist', parsePost, function (req, res) {
  const _user = req.body.data.user;
  const _token = req.body.data.token;
  const result = req.handlePost(userStore);
  fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + _token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(playlist => {
      let formatted_playlist = playlist['items'];
      for (let i in formatted_playlist){
        
        formatted_playlist[i]['likes'] = 0;
        formatted_playlist[i]['comments'] = [];
      }
      userStore.set(`${_user}.playlist.playlists`,playlist)
    })
  if (typeof result !== 'undefined') {
    res.sendStatus(200);
  }
});

router.post('/*', parsePost, function (req, res) {
  const result = req.handlePost(userStore);
  if (typeof result !== 'undefined') {
    res.send({ result })
  }
});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(userStore);
  if (typeof result !== 'undefined') {
    res.send({ result })
  }
});
