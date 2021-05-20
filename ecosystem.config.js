module.exports = {
  apps: [
    {
      name: "smallkirby.xyz",
      exec_mode: "cluster",
      instances: "max",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start"
    }
  ]
}
