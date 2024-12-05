import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/webhooks/clerk",
  "/api/webhooks/stripe",
]);

// Function to handle public routes
const isPublic = (request: Request) => {
  const publicRoutes = ["/", "/api/webhooks/clerk", "/api/webhooks/stripe"];
  const url = new URL(request.url);
  return publicRoutes.some((route) => url.pathname.startsWith(route));
};

export default clerkMiddleware(async (auth, request) => {
  // Check if the request matches public routes or the existing sign-in/sign-up routes
  if (!isPublic(request) && !isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
