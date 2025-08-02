import "server-only";

import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from "@arcjet/next";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
};

export default arcjet({
  key: process.env.ARCJET_KEY as string,
  characteristics: ["fingerprint"],
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});
