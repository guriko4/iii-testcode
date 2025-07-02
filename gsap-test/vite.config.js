export default {
    build: {
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                entryFileNames: 'main.js',
                assetFileNames: ({ name }) => {
                    if (name && name.endsWith('.css')) {
                        return 'style.css';
                    }
                    return 'assets/[name].[ext]';
                }
            }
        }
    }
}
