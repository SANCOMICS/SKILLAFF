// server/index.ts
import { createRequestHandler } from "@remix-run/express";
import compression from "compression";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";

// app/core/authentication/server/context.tsx
import { enhance } from "@zenstackhq/runtime";
import jwt from "jsonwebtoken";

// app/core/database/index.ts
import { PrismaClient } from "@prisma/client";
var singleton = globalThis;
if (!singleton.prisma) {
  singleton.prisma = new PrismaClient({
    log: ["error"]
  });
}
var Database = singleton.prisma;

// app/core/authentication/server/cookies.tsx
import cookie from "cookie";
var COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
var isProduction = process.env.NODE_ENV === "production";
var getCookie = (req, name, options) => {
  const cookieHeader = req.headers.get("Cookie");
  if (!cookieHeader) {
    return "";
  }
  const cookies = cookie.parse(cookieHeader, options);
  return cookies[name];
};
var setCookie = (resHeaders, name, value, options) => {
  resHeaders.set(
    "Set-Cookie",
    cookie.serialize(name, value, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      ...options
    })
  );
};
var setCookieOnResponse = (response, name, value, options) => {
  response.setHeader(
    "Set-Cookie",
    cookie.serialize(name, value, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      ...options
    })
  );
};
var deleteCookie = (resHeaders, name, options) => {
  resHeaders.set(
    "Set-Cookie",
    cookie.serialize(name, "", {
      maxAge: 0,
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      ...options
    })
  );
};
var Cookies = {
  get: getCookie,
  set: setCookie,
  setOnResponse: setCookieOnResponse,
  delete: deleteCookie
};

// app/core/authentication/server/context.tsx
var getSession = async (options) => {
  let user;
  try {
    const token = options.accessToken;
    if (!token) {
      throw new Error("No token found");
    }
    const { userId } = jwt.verify(
      token,
      process.env.SERVER_AUTHENTICATION_SECRET
    );
    user = await Database.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        globalRole: true
      }
    });
    return { user, userId };
  } catch (error) {
    return {};
  }
};
var getPrisma = (session) => {
  const databaseProtected = enhance(Database, { user: session.user });
  return {
    database: databaseProtected,
    databaseUnprotected: Database,
    prisma: databaseProtected,
    masterPrisma: Database
  };
};
var createTrpcContext = async (options) => {
  const accessToken = Cookies.get(options.req, "MARBLISM_ACCESS_TOKEN");
  const session = await getSession({ accessToken });
  const prisma = getPrisma(session);
  return {
    session,
    request: options.req,
    responseHeaders: options.resHeaders,
    ...prisma
  };
};
var createHttpContext = async (options) => {
  const accessToken = Cookies.get(options.request, "MARBLISM_ACCESS_TOKEN");
  const session = await getSession({ accessToken });
  const prisma = getPrisma(session);
  return {
    session,
    ...prisma
  };
};

// app/core/authentication/server/expressSetup.tsx
import Jwt from "jsonwebtoken";
import passport from "passport";

// app/core/configuration/index.tsx
var isDevelopment = () => process.env.NODE_ENV === "development";
var isProduction2 = () => process.env.NODE_ENV === "production";
var getBaseUrl = () => {
  const isServer = typeof window !== "undefined";
  const baseUrl = process.env.BASE_URL;
  const port2 = process.env.PORT ?? 8099;
  if (isServer) {
    return "";
  }
  if (baseUrl) {
    if (baseUrl.startsWith("http")) {
      return baseUrl;
    } else {
      return `https://${baseUrl}`;
    }
  }
  return `http://localhost:${port2}`;
};
var getAuthenticationSecret = () => {
  return process.env.SERVER_AUTHENTICATION_SECRET;
};
var Configuration = {
  isDevelopment,
  isProduction: isProduction2,
  getBaseUrl,
  getAuthenticationSecret
};

// app/core/authentication/server/providers/google.provider.tsx
import { config } from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// app/core/helpers/utility/index.ts
import { v4 as uuidv4 } from "uuid";
var Utility;
((Utility2) => {
  function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }
  Utility2.sleep = sleep;
  function isNull(value) {
    return value === null || value === void 0 || typeof value === "string" && value === "";
  }
  Utility2.isNull = isNull;
  function getUUID() {
    return uuidv4();
  }
  Utility2.getUUID = getUUID;
  function isDefined(value) {
    const isEmptyString = typeof value === "string" && value === "";
    return value !== null && value !== void 0 && !isEmptyString;
  }
  Utility2.isDefined = isDefined;
  function openInNewTab(window2, url) {
    window2.open(url, "_blank");
  }
  Utility2.openInNewTab = openInNewTab;
  function sortByString(items, key) {
    return items.sort(
      (a, b) => a[key].localeCompare(b[key])
    );
  }
  Utility2.sortByString = sortByString;
  function removeTrailingSlash(content) {
    const REGEX_SLASH = /\/$/g;
    return content.replace(REGEX_SLASH, "");
  }
  Utility2.removeTrailingSlash = removeTrailingSlash;
  function stringToInitials(content) {
    if (isNull(content)) {
      return "";
    }
    const words = content.trim().split(" ");
    const isOneWord = words.length === 1;
    if (isOneWord) {
      return words[0].slice(0, 2)?.toUpperCase();
    }
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  Utility2.stringToInitials = stringToInitials;
  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  Utility2.debounce = debounce;
})(Utility || (Utility = {}));

// app/core/authentication/server/providers/google.provider.tsx
config();
var Provider = class {
  name = "google";
  strategy;
  constructor() {
    this.setup();
  }
  isActive() {
    return !!this.strategy;
  }
  setup() {
    try {
      const clientID = process.env.SERVER_AUTHENTICATION_GOOGLE_CLIENT_ID;
      const clientSecret = process.env.SERVER_AUTHENTICATION_GOOGLE_CLIENT_SECRET;
      const callbackURL = `${Configuration.getBaseUrl()}/api/auth/google/callback`;
      if (Utility.isNull(clientID) || Utility.isNull(clientSecret)) {
        throw new Error(
          `Set SERVER_AUTHENTICATION_GOOGLE_CLIENT_ID AND SERVER_AUTHENTICATION_GOOGLE_CLIENT_SECRET in your .env to activate the Authentication Google provider`
        );
      }
      this.strategy = new GoogleStrategy(
        {
          clientID,
          clientSecret,
          callbackURL
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value;
            let user = await Database.user.findFirst({ where: { email } });
            if (!user) {
              user = await Database.user.create({
                data: {
                  email,
                  name: profile.displayName,
                  pictureUrl: profile.photos[0].value
                }
              });
            }
            const payload = {
              accessToken,
              refreshToken,
              user
            };
            done(null, payload);
          } catch (error) {
            done(error);
          }
        }
      );
      console.log(`Authentication Google provider is active`);
    } catch (error) {
      console.error(
        `Could not setup Authentication Google provider: ${error.message}`
      );
    }
  }
};
var GoogleProvider = new Provider();

// app/core/authentication/server/expressSetup.tsx
var providers = [GoogleProvider];
var getProviders = () => {
  return providers.filter((provider) => provider.isActive());
};
var expressSetup = (app2) => {
  app2.use(passport.initialize());
  getProviders().forEach((provider) => passport.use(provider.strategy));
  app2.get("/api/auth/:provider", (req, res, next) => {
    const provider = req.params.provider;
    passport.authenticate(provider, {
      scope: ["profile", "email"],
      // You can customize scope per provider if needed
      session: false,
      prompt: "select_account"
    })(req, res, next);
  });
  app2.get(
    "/api/auth/:provider/callback",
    (req, res, next) => {
      const provider = req.params.provider;
      passport.authenticate(provider, { failureRedirect: "/", session: false })(
        req,
        res,
        next
      );
    },
    (req, res) => {
      const provider = req.params.provider;
      const secret = Configuration.getAuthenticationSecret();
      const jwtToken = Jwt.sign(
        {
          userId: req.user["user"].id,
          [`${provider}AccessToken`]: req.user["accessToken"],
          [`${provider}RefreshToken`]: req.user["refreshToken"]
        },
        secret,
        {
          expiresIn: COOKIE_MAX_AGE
        }
      );
      Cookies.setOnResponse(res, "MARBLISM_ACCESS_TOKEN", jwtToken);
      res.redirect("/");
    }
  );
};

// app/core/authentication/server/middleware.tsx
var getHttpContext = async (options) => {
  const context = await createHttpContext(options);
  if (!context?.session?.user?.id) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return context;
};
var getHttpContextPublic = async (options) => {
  const context = await createHttpContext(options);
  return context;
};

// app/core/authentication/server/router.tsx
import { TRPCError as TRPCError2 } from "@trpc/server";
import Bcrypt from "bcryptjs";
import Jwt2 from "jsonwebtoken";
import { z as z2 } from "zod";

// app/plugins/email/server/email.router.tsx
import { z } from "zod";

// app/core/trpc/base/index.tsx
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
var createContext = async (options) => {
  return await createTrpcContext(options);
};
var trpcInstance = initTRPC.context().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});
var middlewareAuthenticated = trpcInstance.middleware(({ ctx, next }) => {
  if (!ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be authenticated"
    });
  }
  return next();
});
var procedurePublic = trpcInstance.procedure;
var procedure = procedurePublic.use(middlewareAuthenticated);
var Trpc = {
  createRouter: trpcInstance.router,
  mergeRouters: trpcInstance.mergeRouters,
  procedurePublic,
  procedure,
  createContext
};
var t = initTRPC.context().create({
  transformer: superjson
});

// app/plugins/email/server/providers/mailjet/mailjet.provider.ts
import Mailjet from "node-mailjet";
var MailjetProvider = class {
  client;
  templateIds = {};
  constructor() {
    this.initialise();
  }
  initialise() {
    const isProduction4 = process.env.NODE_ENV === "production";
    if (!isProduction4) {
      console.warn(`Mailjet is disabled in development`);
      return;
    }
    try {
      const apiKey = process.env.SERVER_EMAIL_MAILJET_API_KEY;
      const secretKey = process.env.SERVER_EMAIL_MAILJET_SECRET_KEY;
      if (!apiKey || !secretKey) {
        console.warn(
          `Set SERVER_EMAIL_MAILJET_API_KEY and SERVER_EMAIL_MAILJET_SECRET_KEY to activate Mailjet`
        );
        return;
      }
      this.client = new Mailjet({ apiKey, apiSecret: secretKey });
      console.log(`Mailjet service active`);
    } catch (error) {
      console.error(`Could not start Mailjet service`);
      console.error(error);
    }
  }
  async send(options) {
    const message = this.buildMessage(options);
    return this.client.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          ...message
        }
      ]
    }).then((result) => {
      console.log(`Emails sent`, result);
    }).catch((error) => {
      console.error(`Could not send emails (${error.statusCode})`);
    });
  }
  buildMessage(options) {
    const from = {
      Email: "no-reply@marblism.com",
      Name: "Marblism"
    };
    const to = options.to.map((item) => ({ Email: item.email, Name: item.name }));
    const message = {
      From: from,
      To: to,
      Subject: options.subject,
      HTMLPart: void 0,
      Variables: void 0,
      TemplateLanguage: void 0,
      templateId: void 0
    };
    if (options.templateId) {
      message.TemplateLanguage = true;
      message.templateId = options.templateId;
      message.Variables = options.variables;
    } else {
      message.HTMLPart = options.content;
    }
    return message;
  }
};

// app/plugins/email/server/providers/nodemailer/nodemailer.provider.ts
import * as NodemailerSDK from "nodemailer";
var NodemailerProvider = class {
  client;
  constructor() {
    this.initialise();
  }
  initialise() {
    try {
      const host = process.env.SERVER_EMAIL_MAILPIT_HOST ?? "localhost";
      const port2 = Number(process.env.SERVER_EMAIL_MAILPIT_PORT ?? 1022);
      this.client = NodemailerSDK.createTransport({
        host,
        port: port2
      });
      console.log(`Nodemailer is active (${host}:${port2})`);
    } catch (error) {
      console.error(`Nodemailer failed to start: ${error.message}`);
    }
  }
  async send(options) {
    for (const to of options.to) {
      await this.client.sendMail({
        from: `Marblism <no-reply@marblism.com>`,
        to: to.email,
        subject: options.subject,
        html: options.content
      }).then((result) => {
        console.log(`Emails sent`);
      }).catch((error) => {
        console.error(`Could not send emails (${error.statusCode})`);
        console.error(error);
      });
    }
  }
};

// app/plugins/email/server/templates/base.ts
var TemplateBase = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Marblism</title>
    <style>
      {{ style }}
    </style>
  </head>
  <body>
    <div class="card">{{ content }}</div>
  </body>
</html>
  `.trim();

// app/plugins/email/server/templates/components.ts
var TemplateComponents = {
  "<Card>": `
      <div class="card">
    `.trim(),
  "</Card>": "</div>",
  "<Card.Header>": `
      <table 
        class="card-header"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%;text-align:center"
      >
        <tbody>
    `.trim(),
  "</Card.Header>": "</tbody></table>",
  "<Card.Body>": `
      <table 
        class="card-body"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%"
      >
        <tbody>
    `.trim(),
  "</Card.Body>": "</tbody></table>",
  "<Card.Footer>": `
      <table 
        class="card-footer"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%;text-align:center"
      >
        <tbody>
    `.trim(),
  "</Card.Footer>": "</tbody></table>",
  "<p>": "<tr><td><p>",
  "</p>": "</p></td></tr>",
  "<h2>": "<tr><td><h2>",
  "</h2>": "</h2></td></tr>",
  "<hr />": "<tr><td><hr /></td></tr>"
};

// app/plugins/email/server/templates/invitationToOrganization.ts
var TemplateInvitationToOrganization = `
<Card.Header>
  <h2>Welcome to SKILLFLOW</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>You have been invited to join {{ organization_name }}.</p>
  <p>
    <a href="{{ url_invitation }}" target="_blank">Accept Invitation</a>
  </p>
</Card.Body>

<Card.Footer>
  <p>Sent by SKILLFLOW</p>
</Card.Footer>
  `.trim();

// app/plugins/email/server/templates/resetPassword.ts
var TemplateResetPassword = `
<Card.Header>
  <h2>Password Reset</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>We received a request to reset your password.</p>
  <p>Click the button below to reset it</p>
  <p>
    <a href="{{ url_password_reset }}" target="_blank">Reset Password</a>
  </p>
  <p>If you did not request a password reset, ignore this email.</p>
</Card.Body>

<Card.Footer>
  <p>Sent by SKILLFLOW</p>
</Card.Footer>
  `.trim();

// app/plugins/email/server/templates/style.ts
var TemplateStyle = `
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: rgba(41, 41, 41, 1);
  }

  .card {
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-size: 16px;
  }

  h1,
  h2,
  h3 {
    font-weight: 700;
    text-transform: uppercase;
    color: black;
  }

  p {
    width: 100%;
  }

  .card-header,
  .card-body,
  .card-footer {
    padding-top: 28px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .card-body,
  .card-footer {
    padding-bottom: 28px;
  }

  .card-body {
    color: rgba(41, 41, 41, 1);
  }

  .card-footer {
    color: white;
    font-size: 13px;
    background: black;
  }

  hr {
    width: 100%;
    border-top: 1px solid black;
  }

  .badge,
  a {
    color: #4f4f4f;
    background: white;
    font-size: 16px;
    font-weight: 700;
    padding: 12px 16px 12px 16px;
    border: 1px solid grey;
    border-radius: 4px;
    text-decoration: none;
  }

  a {
    cursor: pointer;
  }

  a:hover {
    color: black;
    border-color: black;
  }

  td {
    width: 100%;
  }
`;

// app/plugins/email/server/templates/verificationCode.ts
var TemplateVerificationCode = `
<Card.Header>
  <h2>Single-use verification code</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>
    You are receiving this e-mail because a request has been made for a unique
    code
  </p>
  <p>Enter the following code for verification</p>
  <p>
    <span class="badge">{{ code }}</span>
  </p>
  <p>Code expires in {{ expiration }}</p>
</Card.Body>

<Card.Footer>
  <p>Sent bY SKILLFLOW</p>
</Card.Footer>
  `.trim();

// app/plugins/email/server/templates/welcome.ts
var TemplateWelcome = `
<Card.Header>
  <h2>Welcome to SKILLFLOW</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>Your account is now active.</p>
</Card.Body>

<Card.Footer>
  <p>Sent by SKILLFLOW</p>
</Card.Footer>
  `.trim();

// app/plugins/email/server/email.service.tsx
var templates = {
  resetPassword: TemplateResetPassword,
  verificationCode: TemplateVerificationCode,
  welcome: TemplateWelcome,
  invitationToOrganization: TemplateInvitationToOrganization
};
var Service = class {
  provider;
  templates = templates;
  constructor() {
    const isProduction4 = process.env.NODE_ENV === "production";
    if (isProduction4) {
      this.provider = new MailjetProvider();
    } else {
      this.provider = new NodemailerProvider();
    }
  }
  async send(options) {
    const content = templates[options.templateKey] ?? options.content;
    const name = options.name ?? options.email;
    const contentBuilt = this.getTemplate({
      content,
      variables: options.variables
    });
    return this.provider.send({
      content: contentBuilt,
      to: [
        {
          name,
          email: options.email
        }
      ],
      variables: options.variables,
      subject: options.subject
    }).then(() => {
      console.log(`Email sent to ${options.email}`, options);
    });
  }
  getTemplate(options) {
    const values = options.variables ?? { content: options.content };
    const contentBase = TemplateBase;
    const contentCSS = TemplateStyle;
    const contentTemplate = options.content;
    let content = this.buildContent(contentTemplate, values);
    content = this.buildContent(contentBase, { style: contentCSS, content });
    content = this.buildComponents(content);
    return content;
  }
  buildContent(content, values) {
    let contentBuilt = content;
    for (const [key, value] of Object.entries(values)) {
      const token = new RegExp(`{{ ${key} }}`, "g");
      contentBuilt = contentBuilt.replace(token, value);
    }
    return contentBuilt;
  }
  buildComponents(content) {
    let contentUpdated = content;
    for (const [key, value] of Object.entries(TemplateComponents)) {
      const tag = new RegExp(`${key}`, "g");
      contentUpdated = contentUpdated.replace(tag, value);
    }
    return contentUpdated;
  }
};
var Singleton = class {
  static service = new Service();
};
var EmailService = Singleton.service;

// app/plugins/email/server/email.router.tsx
var TemplateKeys = Object.keys(EmailService.templates);
var EmailRouter = Trpc.createRouter({
  send: Trpc.procedure.input(
    z.object({
      userId: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
      subject: z.string(),
      content: z.string().optional(),
      templateKey: z.enum(TemplateKeys).optional(),
      variables: z.record(z.string(), z.string()).optional()
    })
  ).mutation(async ({ input, ctx }) => {
    let user;
    if (input.userId) {
      user = await ctx.database.user.findUniqueOrThrow({
        where: { id: input.userId }
      });
    }
    const email = user?.email ?? input.email;
    const name = user?.name ?? input.name;
    await EmailService.send({
      templateKey: input.templateKey,
      content: input.content,
      email,
      name,
      subject: input.subject,
      variables: input.variables
    });
    return {};
  })
});

// app/plugins/email/server/index.tsx
var EmailServer;
((EmailServer2) => {
  EmailServer2.service = EmailService;
  EmailServer2.trpcRouter = EmailRouter;
})(EmailServer || (EmailServer = {}));

// app/core/authentication/server/service.tsx
var Service2 = class {
  /**
   * This function is called when a new user sign up, you can use it to send welcome email for example
   */
  async onRegistration(ctx, userId) {
    const user = await ctx.databaseUnprotected.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      return;
    }
  }
};
var Singleton2 = class {
  static service = new Service2();
};
var AuthenticationService = Singleton2.service;

// app/core/authentication/server/router.tsx
var AuthenticationRouter = Trpc.createRouter({
  createAdmin: Trpc.procedurePublic.input(
    z2.object({
      email: z2.string().email(),
      password: z2.string()
    })
  ).mutation(async ({ ctx, input }) => {
    checkPassword(input.password);
    const passwordHashed = hashPassword(input.password);
    const user = await ctx.databaseUnprotected.user.create({
      data: {
        email: "admin@admin.com",
        password: passwordHashed,
        globalRole: "ADMIN",
        status: "VERIFIED"
      }
    });
    return { id: user.id };
  }),
  session: Trpc.procedure.query(async ({ ctx }) => {
    const user = await ctx.database.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id }
    });
    return { user };
  }),
  logout: Trpc.procedurePublic.mutation(async ({ ctx }) => {
    Cookies.delete(ctx.responseHeaders, "MARBLISM_ACCESS_TOKEN");
    ctx.responseHeaders.set("Location", "/");
    return {
      success: true,
      redirect: "/"
    };
  }),
  login: Trpc.procedurePublic.input(
    z2.object({
      email: z2.string().email(),
      password: z2.string()
    })
  ).mutation(async ({ ctx, input }) => {
    try {
      console.log(`Authentication attempt for email: ${input.email}`);
      let user;
      try {
        user = await ctx.databaseUnprotected.user.findUnique({
          where: { email: input.email }
        });
      } catch (error) {
        console.log(`Failed login attempt - user not found: ${input.email}`);
        return {
          success: false,
          code: "USER_NOT_FOUND",
          redirect: "/login?error=UserNotFound"
        };
      }
      if (!user) {
        console.log(`Failed login attempt - user not found: ${input.email}`);
        return {
          success: false,
          code: "USER_NOT_FOUND",
          redirect: "/login?error=UserNotFound"
        };
      }
      if (user.status !== "VERIFIED") {
        console.log(
          `Failed login attempt - user not verified: ${input.email}`
        );
        return {
          success: false,
          code: "USER_NOT_VERIFIED",
          redirect: "/login?error=UserNotVerified"
        };
      }
      const isValid = await Bcrypt.compare(input.password, user.password);
      if (!isValid) {
        console.log(`Failed login attempt - invalid password: ${input.email}`);
        return {
          success: false,
          code: "INVALID_CREDENTIALS",
          redirect: "/login?error=CredentialsSignin"
        };
      }
      const secret = Configuration.getAuthenticationSecret();
      const jwtToken = Jwt2.sign({ userId: user.id }, secret, {
        expiresIn: COOKIE_MAX_AGE
      });
      Cookies.set(ctx.responseHeaders, "MARBLISM_ACCESS_TOKEN", jwtToken);
      console.log(`Successful login for user: ${input.email}`);
      return {
        success: true,
        code: "SUCCESS",
        redirect: "/skillfeed"
      };
    } catch (error) {
      console.error(`Login error for ${input.email}:`, error);
      return {
        success: false,
        code: "INTERNAL_ERROR",
        redirect: "/login?error=default"
      };
    }
  }),
  register: Trpc.procedurePublic.input(
    z2.object({
      email: z2.string().email(),
      name: z2.string(),
      pictureUrl: z2.string().optional(),
      password: z2.string(),
      globalRole: z2.string().refine((value) => value !== "ADMIN", {
        message: "globalRole cannot be ADMIN"
      }).optional(),
      tokenInvitation: z2.string().optional()
    })
  ).mutation(async ({ ctx, input }) => {
    checkPassword(input.password);
    const payload = checkTokenInvitation(input.tokenInvitation);
    const email = input.email.trim().toLowerCase();
    let user;
    if (payload?.userId) {
      user = await ctx.databaseUnprotected.user.findUnique({
        where: { id: payload.userId, status: "INVITED" }
      });
      if (!user) {
        throw new TRPCError2({
          code: "CONFLICT",
          message: "User was not found"
        });
      }
    } else {
      const userExisting = await ctx.databaseUnprotected.user.findUnique({
        where: { email }
      });
      if (userExisting) {
        throw new TRPCError2({
          code: "CONFLICT",
          message: "Email is not available"
        });
      }
    }
    const passwordHashed = hashPassword(input.password);
    if (user) {
      user = await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: { ...input, password: passwordHashed, status: "VERIFIED" }
      });
    } else {
      user = await ctx.databaseUnprotected.user.create({
        data: {
          email: input.email,
          name: input.name,
          pictureUrl: input.pictureUrl,
          password: passwordHashed
        }
      });
    }
    await AuthenticationService.onRegistration(ctx, user.id);
    return { id: user.id };
  }),
  updatePassword: Trpc.procedure.input(z2.object({
    userId: z2.string(),
    currentPassword: z2.string(),
    newPassword: z2.string()
  })).mutation(async ({ ctx, input }) => {
    const { userId, currentPassword, newPassword } = input;
    const user = await ctx.databaseUnprotected.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      throw new TRPCError2({
        code: "NOT_FOUND",
        message: "User not found"
      });
    }
    const isValid = await Bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      throw new TRPCError2({
        code: "BAD_REQUEST",
        message: "Current password is incorrect"
      });
    }
    const passwordHashed = hashPassword(newPassword);
    await ctx.databaseUnprotected.user.update({
      where: { id: user.id },
      data: { password: passwordHashed }
    });
    return { success: true };
  }),
  sendResetPasswordEmail: Trpc.procedurePublic.input(z2.object({ email: z2.string() })).mutation(async ({ ctx, input }) => {
    const email = input.email.trim().toLowerCase();
    const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
      where: { email }
    });
    const payload = { userId: user.id };
    const secret = Configuration.getAuthenticationSecret();
    const TIME_24_HOURS = 60 * 60 * 24;
    const token = Jwt2.sign(payload, secret, { expiresIn: TIME_24_HOURS });
    const url = Configuration.getBaseUrl();
    const urlResetPassword = `${url}/reset-password/${token}`;
    try {
      await EmailServer.service.send({
        templateKey: "resetPassword",
        email: user.email,
        name: user.name ?? user.email,
        subject: `Reset your password`,
        variables: {
          url_password_reset: urlResetPassword
        }
      });
      return { success: true };
    } catch (error) {
      console.error(error.message);
      throw new TRPCError2({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not send the email"
      });
    }
  }),
  resetPassword: Trpc.procedurePublic.input(z2.object({ token: z2.string(), password: z2.string() })).mutation(async ({ ctx, input }) => {
    checkPassword(input.password);
    const secret = Configuration.getAuthenticationSecret();
    let decoded;
    try {
      decoded = Jwt2.verify(input.token, secret);
    } catch (error) {
      throw new TRPCError2({
        code: "UNAUTHORIZED",
        message: "Token is invalid"
      });
    }
    const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
      where: { id: decoded.userId }
    });
    const passwordHashed = hashPassword(input.password);
    await ctx.databaseUnprotected.user.update({
      where: { id: user.id },
      data: {
        password: passwordHashed
      }
    });
    return { success: true };
  })
});
var checkPassword = (password) => {
  const isValid = password?.length >= 6;
  if (isValid) {
    return;
  }
  throw new TRPCError2({
    code: "BAD_REQUEST",
    message: "Password must have at least 6 characters."
  });
};
var checkTokenInvitation = (token) => {
  if (Utility.isNull(token)) {
    return;
  }
  const secret = Configuration.getAuthenticationSecret();
  let decoded;
  try {
    decoded = Jwt2.verify(token, secret);
  } catch (error) {
    throw new TRPCError2({
      code: "UNAUTHORIZED",
      message: "Token is invalid"
    });
  }
  return decoded;
};
var hashPassword = (password) => {
  const saltRounds = 10;
  const salt = Bcrypt.genSaltSync(saltRounds);
  const passwordHashed = Bcrypt.hashSync(password, salt);
  return passwordHashed;
};

// app/core/authentication/server/index.tsx
var AuthenticationServer = {
  createTrpcContext,
  getHttpContext,
  getHttpContextPublic,
  trpcRouter: AuthenticationRouter,
  service: AuthenticationService,
  expressSetup,
  getProviders
};

// server/index.ts
var app = express();
var httpServer = createServer(app);
var isProduction3 = process.env.NODE_ENV === "production";
var viteDevServer = isProduction3 ? void 0 : await import("vite").then(
  (vite) => vite.createServer({
    server: {
      host: true,
      middlewareMode: true,
      hmr: {
        server: httpServer
      }
    }
  })
);
var remixHandler = createRequestHandler({
  build: viteDevServer ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build") : (
    // @ts-expect-error Build will appear after
    // eslint-disable-next-line import/no-unresolved
    await import("./remix.js")
  )
});
app.use(compression());
app.disable("x-powered-by");
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}
app.use(express.static("build/client", { maxAge: "1h" }));
app.use(morgan("tiny"));
AuthenticationServer.expressSetup(app);
app.all("*", remixHandler);
var port = process.env.PORT || 8099;
httpServer.listen(
  port,
  () => console.log(`Express server listening at http://localhost:${port}`)
);
