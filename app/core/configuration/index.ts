export class Configuration {
  private static instance: Configuration;

  private constructor() {}

  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }
    return Configuration.instance;
  }

  public static getFapshiBaseUrl(): string {
    return process.env.FAPSHI_BASE_URL || "https://api.fapshi.com";
  }

  public static getFapshiApiUser(): string {
    return process.env.FAPSHI_API_USER || "";
  }

  public static getFapshiApiKey(): string {
    return process.env.FAPSHI_API_KEY || "";
  }

  public static getAuthenticationSecret(): string {
    return process.env.AUTHENTICATION_SECRET || "";
  }

  public static getBaseUrl(): string {
    return process.env.BASE_URL || "http://localhost:3000";
  }

  public static isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  }

  public static isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
  }
}
