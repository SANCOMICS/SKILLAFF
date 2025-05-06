import Mailjet from 'node-mailjet';
import { Provider, SendOptions } from '../provider';

export class MailjetProvider implements Provider {
  private client: Mailjet;
  private templateIds: Record<string, number> = {};

  constructor() {
    this.initialise();
  }

  private initialise(): void {
    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
      console.warn(`Mailjet is running in development mode`);
    }

    try {
      const apiKey = process.env.SERVER_EMAIL_MAILJET_API_KEY;
      const secretKey = process.env.SERVER_EMAIL_MAILJET_SECRET_KEY;

      if (!apiKey || !secretKey) {
        console.warn(`Set SERVER_EMAIL_MAILJET_API_KEY and SERVER_EMAIL_MAILJET_SECRET_KEY to activate Mailjet`);
        return;
      }

      this.client = Mailjet.apiConnect(apiKey, secretKey);
      console.log(`Mailjet service active`);
    } catch (error) {
      console.error(`Could not start Mailjet service`, error);
    }
  }

  async send(options: SendOptions): Promise<void> {
    if (!options.templateId && !options.content) {
      throw new Error('Either templateId or content must be provided');
    }

    const message = this.buildMessage(options);

    return this.client
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [message],
      })
      .then(result => {
        console.log(`Emails sent`, result.body);
      })
      .catch(error => {
        console.error(`Could not send emails (${error.statusCode}):`, error.response?.body);
      });
  }

  private buildMessage(options: SendOptions): {
    From: { Email: string; Name: string };
    To: { Email: string; Name: string }[];
    Subject: string;
    HTMLPart?: string;
    Variables?: Record<string, any>;
    TemplateLanguage?: boolean;
    TemplateID?: number;
  } {
    const from = {
      Email: 'mbiyber@gmail.com',
      Name: 'SKILLFLOW',
    };

    const to = options.to.map(item => ({ Email: item.email, Name: item.name }));

    const message: any = {
      From: from,
      To: to,
      Subject: options.subject,
    };

    if (options.templateId) {
      message.TemplateLanguage = true;
      message.TemplateID = options.templateId;
      message.Variables = options.variables;
    } else {
      message.HTMLPart = options.content;
    }

    return message;
  }
}
