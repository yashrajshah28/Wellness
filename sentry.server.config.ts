// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c83ea86dfcd8b5d5e7c12322bebfccef@o4507589808881664.ingest.us.sentry.io/4508035386572800",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
