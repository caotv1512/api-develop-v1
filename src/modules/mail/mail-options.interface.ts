export interface IMailOptions {
  from: string;
  to: string;
  sender?: string | undefined;
  subject: string;
  html: string;
}
