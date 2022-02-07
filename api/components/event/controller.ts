import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

import { UtilityService } from '../../services/utility';

import { Event } from './model';
import { EventRepository } from './repository';

export class UserController {
  private readonly repo: EventRepository = new EventRepository();

  /**
   * Read events
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  @bind
  async readEvents (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const events: Event[] = await this.repo.readAll({}, true);

      return res.json(events);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Read user
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  @bind
  async readEvent (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { eventID } = req.params;

      const event: Event | undefined = await this.repo.read({
        where: {
          id: +eventID
        }
      });

      return res.json(event);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Read event by name
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  @bind
  async readEventByName (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name } = req.query;

      const event: Event = await this.repo.readByName(name as string);

      return res.json(event);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Create user
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  @bind
  async createEvent (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, date, time, repeating } = req.body;

      const event: Event = new Event(
        undefined,
        name,
        date,
        time,
        repeating
      );
      const newEvent: Event = await this.repo.save(event);

      return res.json(newEvent);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Update user
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  @bind
  async updateEvent (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { eventID } = req.params;
      const { name, date, time, repeating } = req.body;

      if (!eventID) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      const existingEvent: Event | undefined = await this.repo.read({
        where: {
          id: +eventID
        }
      });

      if (!existingEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }

      existingEvent.name = name;
      existingEvent.date = date;
      existingEvent.time = time;
      existingEvent.repeating = repeating;

      const updatedEvent: Event = await this.repo.save(existingEvent);

      return res.json(updatedEvent);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Delete user
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  @bind
  async deleteEvent (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { eventID } = req.params;

      const event: Event | undefined = await this.repo.read({
        where: {
          id: +eventID
        }
      });

      if (!event) {
        return res.status(404).json({ error: 'User not found' });
      }

      await this.repo.delete(event);

      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}
