// Resolves a `public/` asset path against the app's base URL.
//
// A plain static `src="/assets/foo.svg"` attribute gets Nuxt's base URL baked
// in automatically at build time, but that rewrite only sees literal strings
// in the template - a dynamic `:src="`/assets/${x}.svg`"` binding is invisible
// to it, so it ships as a root-relative path no matter where the site is
// deployed. That's fine at the root, but on a sub-path deploy (e.g. GitHub
// Pages' /<repo>/ prefix) it 404s. Every dynamic landing image path should
// route through this instead of a bare template literal.
export const useLandingAsset = () => {
  const { app } = useRuntimeConfig();

  const assetUrl = (path) => `${app.baseURL}${path.replace(/^\//, "")}`;

  return { assetUrl };
};
