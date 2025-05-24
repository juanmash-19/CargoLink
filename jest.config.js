const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './', 
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
    moduleNameMapper: {
        //Sporte para imports con '@'
        '^@/(.*)$': '<rootDir>/$1', 
        //mocks de archivos estaticos (imagenes, css    )
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
    },
    testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);