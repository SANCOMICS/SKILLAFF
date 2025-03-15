import { config } from 'dotenv'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Configuration } from '~/core/configuration'
import { Database } from '~/core/database'
import { Utility } from '~/core/helpers/utility'

config()
class Provider {
  public name = 'youtube'
  public strategy: GoogleStrategy

  constructor() {
    this.setup()
  }

  isActive() {
    return !!this.strategy
  }

  private setup() {
    try {
      const clientID = process.env.SERVER_AUTHENTICATION_YOUTUBE_CLIENT_ID
      const clientSecret =
        process.env.SERVER_AUTHENTICATION_YOUTUBE_CLIENT_SECRET
      const callbackURL = `${Configuration.getBaseUrl()}/api/auth/youtube/callback`

      if (Utility.isNull(clientID) || Utility.isNull(clientSecret)) {
        throw new Error(
          `Set SERVER_AUTHENTICATION_YOUTUBE_CLIENT_ID AND SERVER_AUTHENTICATION_YOUTUBE_CLIENT_SECRET in your .env to activate the Authentication YouTube provider`,
        )
      }

      this.strategy = new GoogleStrategy(
        {
          clientID,
          clientSecret,
          callbackURL,
          scope: ['https://www.googleapis.com/auth/youtube.readonly'],
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

            const socialAccount = await Database.socialAccount.create({
              data: {
                platform: 'YouTube',
                status: 'CONNECTED',
                userId: user.id,
                accountId: profile.id,
              },
            })

            const payload = {
              accessToken,
              refreshToken,
              user,
              socialAccount,
            }

            done(null, payload)
          } catch (error) {
            done(error)
          }
        },
      )

      console.log(`Authentication YouTube provider is active`)
    } catch (error) {
      console.error(
        `Could not setup Authentication YouTube provider: ${error.message}`,
      )
    }
  }
}

export const YouTubeProvider = new Provider()
