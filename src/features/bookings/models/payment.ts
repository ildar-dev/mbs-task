export enum EPaymentStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}
export interface IPaymentDetails {
  message: string;
  status: EPaymentStatus;
}
