export default defineNuxtPlugin((nuxtApp) => {
  if (process.env.NODE_ENV === 'production') {
    nuxtApp.hook('app:rendered', (ctx) => {
      if (ctx.renderResult?.html) {
        ctx.renderResult.html = ctx.renderResult.html.replace(
          /<style([^>]*)>([\s\S]*?)<\/style>/gi,
          (match, attrs, css) => {
            // Remove CSS comments
            let minified = css.replace(/\/\*[\s\S]*?\*\//g, '');
            // Remove all newlines and tabs
            minified = minified.replace(/[\n\r\t]/g, '');
            // Replace multiple spaces with single space
            minified = minified.replace(/\s\s+/g, ' ');
            // Remove spaces around CSS special characters
            minified = minified.replace(/\s*([{}:;,>+~])\s*/g, '$1');
            // Remove spaces after opening brackets
            minified = minified.replace(/\{\s+/g, '{');
            // Remove spaces before closing brackets
            minified = minified.replace(/\s+\}/g, '}');
            // Remove trailing semicolons before closing braces
            minified = minified.replace(/;}/g, '}');
            // Trim whitespace
            minified = minified.trim();
            
            return `<style${attrs}>${minified}</style>`;
          }
        );
      }
    });
  }
})