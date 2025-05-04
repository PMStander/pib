import { defineEventHandler, setCookie } from 'h3';
import { clearUserSession } from '../../ai/session';

export default defineEventHandler(async (event) => {
  try {
    // Clear the server-side session
    await clearUserSession(event);

    // Also clear the client-side cookie
    setCookie(event, 'pib_session', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0, // Expire immediately
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return {
      success: true,
      message: 'Logged out successfully'
    };
  } catch (error) {
    console.error('Error logging out:', error);
    return {
      success: false,
      error: 'Failed to log out'
    };
  }
});