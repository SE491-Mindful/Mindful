import { User } from '@firebase/auth';
import { IBaseResult } from './i-base-result.model';

export interface ILoginUserResultModel extends IBaseResult {
    user: User
}
