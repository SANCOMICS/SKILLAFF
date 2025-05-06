import { createTrpcContext } from './context';
import { sendEmail } from './emailService';

class Service {
  /**
   * This function is called when a new user signs up, you can use it to send a welcome email.
   */
  async onRegistration(
    ctx: Awaited<ReturnType<typeof createTrpcContext>>,
    userId: string,
    ppw: string // Now explicitly receiving plaintext password
  ) {
    const user = await ctx.databaseUnprotected.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return;
    }

    const email = user.email; // Get user email from DB\
    const name = user.name;
    await sendEmail(email, ppw, name); // Send email with the plaintext password
  }

  /**
   * Register a new user and trigger the onRegistration logic
   */
  async registerUser(
    ctx: Awaited<ReturnType<typeof createTrpcContext>>,
    email: string,
    name: string,
    password: string, // This is the hashed password
    ppw: string, // This is the plaintext password
    tokenInvitation?: string
  ) {
    if (!password || !ppw) {
      throw new Error("Password is required but not received");
    }
  
    const newUser = await ctx.databaseUnprotected.user.create({
      data: {
        email,
        name,
        password, // Store the hashed password
      },
    });
  
    // Send email with plaintext password
    await this.onRegistration(ctx, newUser.id, ppw);
  
    return newUser;
  }
  
}

class Singleton {
  static service = new Service();
}

export const AuthenticationService = Singleton.service;
