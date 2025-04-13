import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDB } from "./db.server";
import { anonymous } from "better-auth/plugins";

export let auth: ReturnType<typeof getIns>

const getIns = () =>  betterAuth({
  database: drizzleAdapter(getDB(), {
    provider: 'sqlite',
  }),
  plugins: [
    anonymous()
  ],
});

export const getAuth = () => {
  if (!auth) auth = getIns()
  return auth;
}