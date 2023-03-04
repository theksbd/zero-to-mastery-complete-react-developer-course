# Setup Prettier and ESLint

## 1. Create .editorconfig file

```
[*]
indent_style = space
indent_size = 2
end_of_line = lf
```

## 2. Install devDependencies to support prettier and eslint

```
npm i -D prettier eslint-plugin-prettier eslint-config-prettier eslint-config-react-app
```

## 3. Create .prettierrc file to specify the format of our code

```
{
  "arrowParens": "avoid",
  "trailingComma": "none",
  "singleQuote": true,
  "jsxSingleQuote": true,
  "useTabs": false,
  "tabWidth": 2,
  "semi": true
}
```

## 4. [OPTIONAL] Create .prettierignore file to ignore files/folders that don't need the format

```
# Ignore artifacts:
build
coverage
dist

# Ignore all HTML files:
*.html

package-lock.json
```

## 5. Create .eslintrc file to specify the rule of our code

```
{
  "extends": ["react-app", "prettier"],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "arrowParens": "avoid",
        "trailingComma": "none",
        "singleQuote": true,
        "jsxSingleQuote": true,
        "useTabs": false,
        "tabWidth": 2,
        "semi": true
      }
    ]
  }
}
```

## 6. [OPTIONAL] Create .eslintignore file to ignore files/folders that don't need the linting

```
node_modules
dist
build
test
```

## 7. Add these scripts to package.json file for linting and formatting

```
"lint": "eslint --ext js,jsx,ts,tsx src/",
"lint:fix": "eslint --fix --ext js,jsx,ts,tsx src/",
"prettier": "prettier --check \"src/**/*.{js,jsx,ts,tsx,css,scss,md}\"",
"prettier:fix": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,scss,md}\""
```
