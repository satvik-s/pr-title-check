module.exports = {
    trailingComma: 'all',
    useTabs: false,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    overrides: [
        { files: '*.ts', options: { parser: 'typescript' } },
        { files: '*.json', options: { tabWidth: 2 } },
        { files: '*.yml', options: { tabWidth: 2 } },
    ],
};
