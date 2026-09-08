
export const useLandingAsset = () => {
  const { app } = useRuntimeConfig();

  const assetUrl = (path) => `${app.baseURL}${path.replace(/^\//, "")}`;

  return { assetUrl };
};
