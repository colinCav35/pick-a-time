import { Router } from 'express';
import { body, param, query } from 'express-validator';

import { AuthService, PassportStrategy } from '../../services/auth';

import { IComponentRoutes } from '../helper';

import { UserController } from './controller';

export class UserRoutes implements IComponentRoutes<UserController> {
  readonly name: string = 'event';
  readonly controller: UserController = new UserController();
  readonly router: Router = Router();
  authSerivce: AuthService;

  constructor (defaultStrategy?: PassportStrategy) {
    this.authSerivce = new AuthService(defaultStrategy);
    this.initRoutes();
  }

  initRoutes (): void {
    this.router.get(
      '/',
      this.authSerivce.isAuthorized(),
      this.authSerivce.hasPermission(this.name, 'read'),
      this.controller.readEvents
    );

    this.router.get(
      '/search',
      this.authSerivce.isAuthorized(),
      this.authSerivce.hasPermission(this.name, 'read'),
      query('name').isString(),
      this.authSerivce.validateRequest,
      this.controller.readEventByName
    );

    this.router.get(
      '/:eventID',
      this.authSerivce.isAuthorized(),
      this.authSerivce.hasPermission(this.name, 'read'),
      param('eventID').isNumeric(),
      this.authSerivce.validateRequest,
      this.controller.readEvent
    );

    this.router.post(
      '/',
      this.authSerivce.isAuthorized(),
      this.authSerivce.hasPermission(this.name, 'create'),
      body('name').isString(),
      body('date').isString(),
      body('time').isString(),
      body('repeating').isString(),
      this.authSerivce.validateRequest,
      this.controller.createEvent
    );

    this.router.put(
      '/:eventID',
      this.authSerivce.isAuthorized(),
      this.authSerivce.hasPermission(this.name, 'update'),
      param('eventID').isNumeric(),
      body('name').isEmail(),
      body('date').isString(),
      body('time').isString(),
      body('repeating').isString(),
      this.authSerivce.validateRequest,
      this.controller.updateEvent
    );

    this.router.delete(
      '/:eventID',
      this.authSerivce.isAuthorized(),
      this.authSerivce.hasPermission(this.name, 'delete'),
      param('eventID').isNumeric(),
      this.authSerivce.validateRequest,
      this.controller.deleteEvent
    );
  }
}
