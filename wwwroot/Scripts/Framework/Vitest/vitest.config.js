import { defineConfig } from "../../../../node_modules/";
export default defineConfig({
    test: {
        environment: 'happy-dom', // or 'jsdom'
    },
});
