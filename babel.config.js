const isEnvDev = process.env.NODE_ENV === "development";

if (isEnvDev) {
    config.plugins.push("react-refresh/babel");
}
