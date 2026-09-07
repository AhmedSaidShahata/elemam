export const getBaseURL = () => {
  const env = import.meta.env;
  if (env.VITE_ENV_MODE === "production") {
    return env.VITE_WEBSITE_PRODUCTION;
  } else if (env.VITE_ENV_MODE === "dproduction") {
    return env.VITE_WEBSITE_DPRODUCTION;
  } else if (env.VITE_ENV_MODE === "tproduction") {
    return env.VITE_WEBSITE_TPRODUCTION;
  } else if (env.VITE_ENV_MODE === "int") {
    return env.VITE_WEBSITE_INT;
  } else if (env.VITE_ENV_MODE === "dev") {
    return env.VITE_WEBSITE_DEV;
  } else if (env.VITE_ENV_MODE === "testing") {
    return env.VITE_WEBSITE_TEST;
  } else if (env.VITE_ENV_MODE === "beta") {
    return env.VITE_WEBSITE_BETA;
  } else {
    return env.VITE_WEBSITE_DEV;
  }

};
