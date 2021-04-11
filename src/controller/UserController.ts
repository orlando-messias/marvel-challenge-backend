import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import { authenticate } from '../services/authenticate';

export default class UserController {

  // user login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing entries. Try again.' });
    }

    const user = await getRepository(User).findOne({
      where: { email }
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    // extracts email and password from user and creates object credentials
    const { id, name, created_at, updated_at, ...credentials } = user;
    const token = authenticate(credentials);

    return res.status(200).json({ id, name, email, token });

  };

};