Package.describe({
  name: "util",
  version: "1.0.0",
  summary: "internal utility functions"
});

Package.onUse(function(api) {
  api.versionsFrom("1.2.0.2");
  api.use("ecmascript");
  api.addFiles("util.js");
  api.export("Util");
});
