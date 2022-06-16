## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Set up Google Client

1. Follow to the [Google Cloud Console](https://console.cloud.google.com/)
2. On the Welcome Page select *Create of select a project*. If you already have a project, just select that one. If you haven't one, click the *New project* button. After creating a project, select that one.
3. On the project page choose option *APIs & Services* then *OAuth consent screen* option.
4. In the *User type parameters* choose the *External* type and click the *Create* button. It redirects you to the Edit app registration page. Here write in an App name, choose a support email and write developer content emails. Other options are optional. Press the save button. Options on other pages are optional too.
5. Now choose *Credentials* option and click the *Create credentials* -> *OAuth client ID*.
6. Chose an application type. In our case the *Web application*. Give this one any name.
7. In the *Authorized JavaScript origins* part click the *Add URI* button and write in any URI that will be use in an app. In our case: *http://localhost:3001*;
8. In the *Authorized redirect URIs* part click the *Add URI* button and write in any URI that will be use as callbackURL. In our case: *http://localhost:3001/api/auth/google/redirect*. After that click the *Create* button.
9. Now you can see popup with your client information such as Client ID and Client Secret, that will need to add in environment file under GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET keys respectively.
