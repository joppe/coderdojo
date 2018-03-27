export type AlertType = 'success' | 'error';

export interface IAlertMessage {
    type: AlertType;
    text: string;
}
