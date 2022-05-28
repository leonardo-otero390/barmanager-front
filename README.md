# BARMANager

BARMANager is a proposal generator based on the client's needs, with the information passed it calculates the expenses and sends it to the company's email.

<img href="./demo-usage.gif" />

[Try it out now](http://barmanager-front.vercel.app/)

[You can check the back-end repo](https://github.com/leonardo-otero390/barmanager-back)

## About

This is an web application cocktail shop owners, with it they can answer customer proposes much way faster. Below are the implemented features:

- Auth
- Display to customer selection events categories and available cocktails
- Customer send their proposes

## Technologies

The following tools and frameworks were used in the construction of the project:

<a title="React" href="https://pt-br.reactjs.org/" target="_blank" rel="noreferrer"> 
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="reactjs" width="40" height="40"/> 
</a>
<a title="HTML" href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> 
</a>
<a title="CSS" href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> 
</a>
<a title="TypeScript" href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> 
      <img src="https://user-images.githubusercontent.com/85591297/157519943-9da08e53-e59d-450a-8b0d-81af17974fd0.svg" alt="TypeScript" height="40"/>
</a>

## Requirements

### [npm](https://www.npmjs.com/)

<details>
    <summary>install npm</summary>

```bash
wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh> | bash

## Or this command
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Close and open terminal
nvm install --lts
nvm use --lts
# Verify node version
node --version # Must show v14.16.1
# Verify npm version
npm -v
```

</details>

## How to run

1. Clone this repository
2. Clone the [back-end repository](https://github.com/leonardo-otero390/barmanager-back) and follow instructions
3. Install dependencies

```bash
npm i
```

4. Run the front-end with production database

```bash
npm start
```

5. If you want to run with backend development mode

```bash
npm run dev
```

6. You can optionally build the project running

```bash
npm run build
```
