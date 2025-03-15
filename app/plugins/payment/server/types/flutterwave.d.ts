declare module 'flutterwave-node-v3' {
  export default class Flutterwave {
    constructor(publicKey: string, secretKey: string);
    Charge: {
      card(payload: any): Promise<any>;
      create(payload: any): Promise<any>;
    };
    MobileMoney: {
      charge(payload: any): Promise<any>;
    };
    Transaction: {
      fetch(payload: any): Promise<any>;
    };
    Bank: {
      validate(payload: any): Promise<any>;
      create(payload: any): Promise<any>;
    };
    Transfer: {
      create(payload: any): Promise<any>;
    };
    Webhook: {
      verifyWebhook(signature: string, secretHash: string): boolean;
    };
  }
}
