<div style="background: black;">
<p align="center" style="margin: 0;">
  <a href="https://dev.marblism.com" target="blank">
    <img src="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/marblism-logo.png" height="150" alt="Marblism Logo" />
  </a>
</p>
<h1 align="center" style="margin: 0;">In Marble We Trust</h1>

<a  style="margin: 0;" target="_blank" href="https://marblism.com">
<p align="center" style="margin: 0; letter-spacing: 3px;
text-decoration: none;">
marblism
</p>
</a>
</div>
<div style="height: 50px; background: linear-gradient(#000000, transparent);"></div>

## Documentation

Learn more in the [official documentation](https://dev.marblism.com).

## Installation

<div style="color: red;">

> ⚠️ **Important**<br/>Make sure the following tools are installed on your computer

<p align="center">

<a target="_blank" href="https://www.docker.com/get-started/">![Docker Desktop Version](https://img.shields.io/badge/Docker%20Desktop-4.19.0-black?logo=docker)</a>
<a target="_blank" href="https://nodejs.org/en">![Node.js version](https://img.shields.io/badge/Node.js-20.11.0-black?logo=nodedotjs)</a>
<a target="_blank" href="https://www.npmjs.com/">![npm Version](https://img.shields.io/badge/npm-10.2.4-black?logo=npm)</a>

</p>
</div>

<br />

```bash
$ pnpm run init
```

## Development

```bash
$ pnpm run dev
```

[View your application in your browser](http://localhost:8099)

## Production

```bash
$ pnpm run build
$ pnpm run start
```

## Support

We reply FAST on our <a target="_blank" href="https://discord.gg/GScNz7kAEu">Discord server</a>.

## Stay in touch

[@marblismAI](https://twitter.com/marblismAI)

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the values in `.env` with your actual configuration:
   - Replace all `your-*` placeholders with real values
   - Keep sensitive information secure and never commit `.env` to version control
   - Required values are marked with comments

3. Required Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: A secure random string for NextAuth
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
   - `FAPSHI_API_KEY` & `FAPSHI_SECRET_KEY`: From Fapshi Dashboard
   - `OPENAI_API_KEY`: From OpenAI Dashboard

4. Optional Environment Variables:
   - Email configuration if using email features
   - Storage configuration if using file storage
   - Analytics and monitoring tools
   - Feature flags for controlling application features
