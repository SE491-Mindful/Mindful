import { User } from '@firebase/auth';
import { IBaseResult } from './i-base-result.model';

export interface ICreateUserResultModel extends IBaseResult {
    user: User
}
