import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import UsersServices from '../services/UsersServices';
import { authenticate } from '../services/authenticate';

export default class UserController {

  // list all users 
  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const usersRepository = getRepository(User);
      const user = await usersRepository.findOne({
        where: { id }
      });
      return res.status(200).json(user);

    } catch (err) {
      res.status(400).send({ error: `Error while loading data: ${err}.` });
    }
  };

  // user login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing entries. Try again.' });
    }

    try {
      const user = await getRepository(User).findOne({
        where: { email }
      });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Incorrect username or password' });
      }

      // extracts email and password from user and creates the object credentials
      const { id, name, created_at, updated_at, ...credentials } = user;
      const token = authenticate(credentials);

      return res.status(200).json({ id, name, email, token });

    } catch (err) {
      res.status(400).send({ error: `Error while loading data: ${err}.` });
    }

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

    try {
      const usersRepository = getRepository(User);
      const user = await usersRepository.findOne({
        where: { email }
      });

      if (user) return res.status(400).json({ message: 'Email already exists' });

      const userData = { name, email, password };

      await usersRepository.save(userData);
      res.status(201).json(userData);

    } catch (err) {
      res.status(500).send({ error: `Error while trying to save: ${err}.` });
    }

  };


  // updates a user data
  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
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

    try {
      const usersRepository = getRepository(User);
      const user = await usersRepository.findOne({
        where: { id }
      });

      if (!user) return res.status(400).json({ message: 'User not found' });

      const userData = { name, email, password };

      usersRepository.merge(user, userData);
      const results = await usersRepository.save(user);
      return res.status(201).json(results);

    } catch (err) {
      res.status(500).send({ error: `Error while trying to save: ${err}.` });
    }

  };


};