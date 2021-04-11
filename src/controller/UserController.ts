import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import UsersServices from '../services/UsersServices';
import { authenticate } from '../services/authenticate';

export default class UserController {

  // list all users 
  async getAll(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return res.status(200).json(users);
  };

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

  // saves a new user
  async saveUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const usersServices = new UsersServices();

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing entries. Try again.' });
    }

    // email validation
    if (!usersServices.validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email entry' });
    }

    // password validation
    if (!usersServices.validatePassword(password)) {
      return res.status(400).json({
        message: 'Password must contains letters, numbers and at least 6 characters in length'
      });
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    });

    if (user) return res.status(400).json({ message: 'Email already exists' });

    const userData = { name, email, password };

    try {
      await usersRepository.save(userData);
      res.status(201).json(userData);
    } catch (error) {
      res.status(500).send({ message: `Error while trying to save: ${error}.` });
    }

  };

};