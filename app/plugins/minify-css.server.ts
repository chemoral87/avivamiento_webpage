// plugins/minify-css.server.ts - Fixed with proper error handling
export default defineNuxtPlugin((nuxtApp) => {
  // Only run in production
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  // Check if lightningcss is available
  let lightningcss: any;
  try {
    lightningcss = require('lightningcss');
  } catch (e) {
    console.warn('lightningcss not found - skipping runtime CSS minification');
    return;
  }

  nuxtApp.hook('app:rendered', (ctx) => {
    if (!ctx.renderResult?.html) {
      return;
    }

    try {
      // Only minify inline styles, don't touch linked stylesheets
      ctx.renderResult.html = ctx.renderResult.html.replace(
        /<style([^>]*)>([\s\S]*?)<\/style>/gi,
        (match, attrs, css) => {
          // Skip if already minified (no whitespace)
          if (!css.includes('\n') && !css.includes('  ')) {
            return match;
          }

          try {
            const { transform } = lightningcss;
            const result = transform({
              filename: 'inline.css',
              code: Buffer.from(css),
              minify: true,
              targets: { chrome: 95 }, // Modern target
            });
            
            const minified = Buffer.from(result.code).toString('utf8').trim();
            return `<style${attrs}>${minified}</style>`;
          } catch (error) {
            // Fallback to simple minification
            const minified = css
              .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
              .replace(/\s+/g, ' ') // Collapse whitespace
              .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove space around operators
              .replace(/;}/g, '}') // Remove last semicolon
              .trim();
            
            return `<style${attrs}>${minified}</style>`;
          }
        }
      );
    } catch (error) {
      console.error('Error in CSS minification plugin:', error);
    }
  });
})