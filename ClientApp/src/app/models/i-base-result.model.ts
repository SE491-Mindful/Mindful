import { IErrorModel } from './i-error.model';

export interface IBaseResult {
    success: boolean;
    error: IErrorModel;
}
