# CJ's Handbook

![Node.js CI](https://github.com/johnjiang/animal-crossing-guide/workflows/Node.js%20CI/badge.svg)

http://cjhandbook.guide/

# Developer setup

## 🍺 Prerequisites

-   [Homebrew](https://brew.sh/)

## 💻 Initial Setup

```
# Install nvm and follow setup post-install instructions
brew install nvm

# Install the version of node we need
nvm install
```

## 🎢 Dev loop

```
# Activate the version of node in the shell
nvm use
npm install
npm run start # This will continuously watch the repo for changes
```

## 🧪 Testing

```
npm run test
npm run lint
```

## 🚀 Building and deploy

Automatically built via GitHub actions and deployed on netlify
