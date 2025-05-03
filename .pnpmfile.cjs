/**
 * This file helps pnpm handle native modules better
 */
module.exports = {
  hooks: {
    readPackage(pkg) {
      // Force oxc-parser to be installed at the root
      if (pkg.name === 'oxc-parser') {
        pkg.dependencies = pkg.dependencies || {};
        pkg.peerDependencies = pkg.peerDependencies || {};
        // Ensure it's hoisted
        pkg.hoisted = true;
      }
      return pkg;
    }
  }
};
