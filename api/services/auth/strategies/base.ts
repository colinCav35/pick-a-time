import { BasicStrategy as StrategyBasic } from 'passport-http';
import { Strategy as StrategyJwt } from 'passport-jwt';
import { getManager, Repository } from 'typeorm';

import { policy } from '../../../config/policy';

import { User } from '../../../components/user/model';

/**
 * Abstract BaseStrategy
 *
 * Other strategies inherits from this one
 */
export abstract class BaseStrategy {
  protected readonly userRepo: Repository<User> = getManager().getRepository('User');
  protected _strategy: StrategyJwt | StrategyBasic;

  /**
   * Get strategy
   *
   * @returns Returns Passport strategy
   */
  public get strategy (): StrategyJwt | StrategyBasic {
    return this._strategy;
  }

  /**
   * Sets acl permission for user
   *
   * @param user
   * @returns
   */
  protected async setPermissions (user: User): Promise<void> {
    // add role from db
    await policy.addUserRoles(user.id, user.userRole.name);
  }
}
