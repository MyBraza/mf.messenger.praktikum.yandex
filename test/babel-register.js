const register = require('@babel/register').default;

register({extensions: ['.ts', '.tsx', '.js', '.jsx'], plugins: ["@babel/plugin-proposal-class-properties"],});