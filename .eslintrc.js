module.exports = {
    root: true, // don't look any higher in filesystem for eslint config
    plugins: [
        "jsdoc" // using eslint-plugin-jsdoc in preference to eslint-plugin-tsdoc, because tsdoc is too rigid
        // (e.g. it assumes the doc comment is HTML instead of markdown, and warns about < and <=)
    ],
    parserOptions: {
        ecmaVersion: "latest"
    },
    env: {
        browser: true,
        es6: true
    },
    // start with some base recommended rules
    extends: ["eslint:recommended", "plugin:jsdoc/recommended"],

    // and configure them a bit for 6.102
    rules: {
        // in the config below,
        //    error means that Caesar will show a comment marked #important
        //    warn means that Caesar will show a comment, but without #important
        //    off means eslint and Caesar won't report the issue

        // turn on these rules (to mimic our Java Checkstyle configuration)
        "no-tabs": "error",
        "max-lines": ["warn", 2000],
        "max-params": ["warn", 7],
        "max-lines-per-function": ["warn", 150],
        "max-depth": ["warn", 4],
        "no-warning-comments": "warn", // catches TODO
        semi: "error", // require semicolons ending statements
        // configure jsdoc plugin to match the loose way we use TypeDoc
        "jsdoc/tag-lines": "off", // too picky about spacing

        // turn off these recommended rules
        "no-constant-condition": "off", // so that we can say "while (true) {...}" without error
        // configure magic numbers a bit
        "no-magic-numbers": ["error", { ignore: [0, 1, 2, -1, -2] }]
    },
    overrides: [
        {
            // turn off magic-number checking in tests
            files: ["**/test/**"],
            rules: {
                "no-magic-numbers": "off"
            }
        }
    ]
};
