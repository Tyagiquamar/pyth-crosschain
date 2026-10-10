/** @type {import("jest").Config} */
export default {
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^uuid$": "uuid",
  },
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
};
