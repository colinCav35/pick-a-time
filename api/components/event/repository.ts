import { bind } from 'decko';
import { getManager } from 'typeorm';

import { AbsRepository } from '../helper';

import { Event } from './model';

export class EventRepository extends AbsRepository<Event> {
  constructor () {
    super('event', getManager().getRepository(Event), ['userRole']);
  }

  /**
   * Read event by name from db
   *
   * @param name Name to search for
   * @returns Event
   */
  @bind
  readByName (name: string): Promise<Event> {
    try {
      return this.read({
        where: {
          name
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
