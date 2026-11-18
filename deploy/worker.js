// Static host for the goldenline build. The app is a single-page Vite bundle
// with hash routing, so every path is served from the built assets.
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
