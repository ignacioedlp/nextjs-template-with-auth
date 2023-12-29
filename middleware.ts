import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) return false; // Si no hay token, deniega el acceso

        const isAdmin = token.role === "ADMIN";
        const isUser = token.role === "USER";
        const isDashboardRoute = req.nextUrl.pathname === "/dashboard";

        // Si es admin, permite el acceso a todas las rutas
        if (isAdmin) return true;

        // Si es un usuario y está intentando acceder al dashboard, permite el acceso
        if (isUser && isDashboardRoute) return true;

        // En otros casos, deniega el acceso
        return false;
      },
    },
  }
);

export const config = { matcher: ["/dashboard", "/users"] };
