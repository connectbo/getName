import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";
import {authenticateUser} from "../middlewares/auth";

const fetch = require("node-fetch");

export const router = express.Router();
export const prefix = '/private';

const {privateStore} = require('../data/DataStore');

/**
 * Every request to this route needs
 * to be made from an authenticated user.
 */
router.use(authenticateUser);

router.get('/', parseGet, function (req, res) {
  const result = req.handleGet(privateStore);
  if (typeof result !== 'undefined') {
    res.send(privateStore['_data']['playlists'])
  }
});

router.post('/store_playlist', parsePost, function (req, res) {
  const _user = req.body.data.user;
  const _token = req.body.data.token;
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
        formatted_playlist[i]['app_username'] = _user;
        formatted_playlist[i]['likes'] = 0;
        formatted_playlist[i]['comments'] = [];
      }
      privateStore.set(`playlists`,formatted_playlist)
    })

  const result = req.handlePost(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});
