module.exports = {
    bail: true,
    verbose: true,
    transform: {
        "^.+\\.(j|t)sx?$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.{ts,tsx}"],
};
