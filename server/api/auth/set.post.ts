import { defineEventHandler, readBody, createError, setCookie } from 'h3';
import { setUserSession } from '../../ai/session';

export default defineEventHandler(async (event) => {
  try {
    // Read the session data from the request body
    const body = await readBody(event);

    // Validate the session data
    if (!body || !body.user || !body.user.id) {
      throw createError({
        statusCode: 400,
        message: 'Invalid session data'
      });
    }

    // Set the user session using the existing function
    await setUserSession(event, body);

    // Also set a cookie for client-side access
    setCookie(event, 'pib_session', JSON.stringify({
      userId: body.user.id,
      email: body.user.email,
      isAuthenticated: true,
      currentWorkspaceId: body.currentWorkspace?.id || null,
      currentProfileId: body.currentProfile?.id || null,
    }), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // Return the session data
    return {
      success: true,
      data: body
    };
  } catch (error: any) {
    console.error('❌ Login error:', error);

    throw createError({
      statusCode: error.statusCode || 500,
      message: error instanceof Error ? error.message : 'Login failed'
    });
  }
});