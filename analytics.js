// Vercel Web Analytics initialization for static HTML site
// This script is loaded from node_modules and initializes analytics tracking

(function() {
  'use strict';
  
  // Load the Vercel Analytics package
  // In production, Vercel will inject the actual analytics script
  // This ensures the analytics are properly initialized
  
  if (typeof window !== 'undefined') {
    // Initialize the analytics queue
    window.va = window.va || function() {
      (window.vaq = window.vaq || []).push(arguments);
    };
    
    // Load the analytics script from Vercel's CDN
    // This will be automatically handled when deployed to Vercel
    var script = document.createElement('script');
    script.defer = true;
    script.src = '/_vercel/insights/script.js';
    document.head.appendChild(script);
  }
})();
