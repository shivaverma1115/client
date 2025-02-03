'use client'
import "./globals.css";
import "../style/index.scss";
import AppProvider from "@/contextApi/AppProvider";
import ReduxProvider from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import { childrenType } from "@/interFace/interFace";
import { Provider } from "@/components/ui/provider"
import { usePathname } from "next/navigation";
import PrivetRoute from "@/privetRoute/PrivetRoute";

export default function RootLayout({ children }: childrenType) {
  const pathName = usePathname();
  const userIdMatch = pathName.match(/^\/sample-video\/([\w-]+)/);
  const id = userIdMatch ? userIdMatch[1] : null;

  // const publicRoutes = [
  //   "/login",
  //   "/register",
  //   "/forget-password",
  //   ...pathName.startsWith("/reset-password") ? [pathName] : [],
  // ];

  // const isPublicRoute = publicRoutes.some((route) =>
  //   pathName === route || pathName.startsWith(route)
  // );
  return (
    <>
      <html lang="en">
        <head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content="Global Creations" />
          <meta name="robots" content="noindex, follow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Demo - Global Creations</title>
          <link rel="icon" href="/favicon.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;900&display=swap"
            rel="stylesheet"
          ></link>
        </head>

        <body suppressHydrationWarning={true}>
          <ReduxProvider>
            <Provider>
              <AppProvider>
                {
                  // isPublicRoute || 
                  id
                    ? (
                      <main>{children}</main>
                    ) : (
                      <PrivetRoute>
                        <main>
                          <div className="cashier-dashboard-area">
                            {children}
                          </div>
                        </main>
                      </PrivetRoute>
                    )}
              </AppProvider>
              <ToastContainer
                position="top-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </Provider>
          </ReduxProvider>
        </body>
      </html>
    </>
  );
}
