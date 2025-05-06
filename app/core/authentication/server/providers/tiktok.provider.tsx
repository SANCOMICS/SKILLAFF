import { config } from 'dotenv'
import { Strategy as OAuth2Strategy } from 'passport-oauth2'
import { Configuration } from '~/core/configuration'
import { Database } from '~/core/database'
import { Utility } from '~/core/helpers/utility'

config()
class Provider {
  public name = 'tiktok'
  public strategy: OAuth2Strategy

  constructor() {
    this.setup()
  }

  isActive() {
    return !!this.strategy
  }

  private setup() {
    try {
      const clientID = process.env.SERVER_AUTHENTICATION_TIKTOK_CLIENT_ID
      const clientSecret = process.env.SERVER_AUTHENTICATION_TIKTOK_CLIENT_SECRET
      const callbackURL = `${Configuration.getBaseUrl()}/api/auth/tiktok/callback`

      if (Utility.isNull(clientID) || Utility.isNull(clientSecret)) {
        throw new Error(
          `Set SERVER_AUTHENTICATION_TIKTOK_CLIENT_ID AND SERVER_AUTHENTICATION_TIKTOK_CLIENT_SECRET in your .env to activate the Authentication TikTok provider`,
        )
      }

      this.strategy = new OAuth2Strategy(
        {
          authorizationURL: 'https://www.tiktok.com/auth/authorize/',
          tokenURL: 'https://open-api.tiktok.com/oauth/access_token/',
          clientID,
          clientSecret,
          callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Check if user already exists in your database
            const email = profile.emails[0].value

            let user = await Database.user.findFirst({ where: { email } })

            if (!user) {
              user = await Database.user.create({
                data: {
                  email,
                  name: profile.displayName,
                  pictureUrl: profile.photos[0].value,
                },
              })
            }

            const payload = {
              accessToken,
              refreshToken,
              user,
            }

            done(null, payload)
          } catch (error) {
            done(error)
          }
        },
      )

      console.log(`Authentication TikTok provider is active`)
    } catch (error) {
      console.error(
        `Could not setup Authentication TikTok provider: ${error.message}`,
      )
    }
  }
}

export const TikTokProvider = new Provider()
