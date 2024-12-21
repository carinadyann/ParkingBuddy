const { getDefaultConfig } = require('@expo/metro-config');

module.exports = getDefaultConfig(__dirname);

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig(__dirname);
//   return {
//     ...defaultConfig,
//     // Add your custom configuration here
//   };
// })();
