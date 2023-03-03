# Setup Prettier and ESLint

## 1. Create .editorconfig file

```
[*]
indent_style = space
indent_size = 2
```

## 2. Create .prettierrc file to specify the format of our code

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

## 3. [OPTIONAL] Create .prettierignore file to ignore files/folders that don't need the format

```
# Ignore artifacts:
build
coverage
dist

# Ignore all HTML files:
*.html

package-lock.json
```

## 4. Install devDependencies to support prettier and eslint

```
npm i -D prettier eslint-plugin-prettier eslint-config-prettier eslint-config-react-app
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

## 6. Add these scripts to package.json file

```
"lint": "eslint --ext js,jsx,ts,tsx src/",
"lint:fix": "eslint --fix --ext js,jsx,ts,tsx src/",
"prettier": "prettier --check \"src/**/*.{js,jsx,ts,tsx,css,scss,md}\"",
"prettier:fix": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,scss,md}\""
```
