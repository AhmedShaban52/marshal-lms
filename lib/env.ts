import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL : z.string().url(),
    AUTH_GITHUB_CLIENT_ID : z.string().url().min(1),
    AUTH_GITHUB_SECRET : z.string().url().min(1),
  },

  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {},
});
