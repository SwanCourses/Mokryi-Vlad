import User from '../models/user';
import cuid from 'cuid';
import serverConfig from '../config';
import jwt from 'jwt-simple';
import { generateRandomToken, sha512 } from '../util/security';

export function create(req, res) {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
  } else {
    let newUser = new User(req.body.user);
    newUser.cuid = cuid();
    newUser.password_salt = generateRandomToken();
    newUser.password = sha512(newUser.password, newUser.password_salt);

    let payload = { sub: newUser.cuid };

    User.findOne({ email: newUser.email })
      .then((emailUser) => {
        if (emailUser) {
          res.status(403).end();
        } else {
          return newUser.save();
        }
      })
      .then(user => {
        let token = jwt.encode(payload, serverConfig.JWT_TOKEN);
        res.json({ token: token, admin: false });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}

export function update(req, res) {
  if (!req.body) {
    res.status(403).end();
  } else {
    let userCuid = jwt.decode(req.headers.authorization.replace('JWT ', ''), serverConfig.JWT_TOKEN).sub;
    User.findOne({cuid: userCuid})
      .then(document => {
        document.firstName = req.body.firstName;
        document.lastName = req.body.lastName;
        return document.save();
      })
      .then(saved => {
        res.json({email: saved.email, firstName: saved.firstName, lastName: saved.lastName});
      })
      .catch(err=> {
        res.status(500).send(err);
      });
  }
}

export function profile(req, res) {
  let userCuid = jwt.decode(req.headers.authorization.replace('JWT ', ''), serverConfig.JWT_TOKEN).sub;
  User.findOne({cuid: userCuid})
    .then(document => {
      res.json({email: document.email, firstName: document.firstName, lastName: document.lastName});
    })
    .catch(err=> {
      res.status(500).send(err);
    });
}
