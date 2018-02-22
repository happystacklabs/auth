<img src=".github/happystack.png" alt="Happystack" width="150" height="150" />

# Happystack Frontend Boilerplate

![Version](https://img.shields.io/badge/Version-0.3.0-green.svg?style=flat)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)

## UNDER ACTIVE DEVELOPMENT!!!

#### Frontend Boilerplate is a React boilerplate created by Happystack to help streamline your development. Visit the [playground](http://boilerplate.happystack.io) to learn more.


## 🔧 Installation
### Step 1
Clone the [repository](https://github.com/happystacklabs/frontend-boilerplate) on your computer
```
git clone git@github.com:happystacklabs/frontend-boilerplate.git
```

### Step 2
Update this line in the file `src/agent.js` with your backend API URL:
```
export const API_ROOT = process.env.NODE_ENV === 'production' ? 'API.EXAMPLE.COM/API' : 'http://localhost:3001/api';
```

### Step 3
With your [Surge](http://surge.sh/) account activated, update this line in the
file `deploy.sh` with your website URL:
```
tasks[5]='Deploy to Surge'
tasksCommand[5]='surge ./build  EXAMPLE.COM'
```

### Step 3
Install the dependencies by running `npm install`

### Step 4
Create your new repository for the project on [Github](https://github.com/).

Git init at the root of your project folder that you cloned `git init`.

Add changes `git add .`

Do your first commit `git commit -m "first commit"`

Add the remote `git remote add origin REPO-URL`

And push `git push -u origin master`


## 🕹 Usage
TODO

### Getting Started
TODO

## 🚀 Deployment
Now you can simply run `npm run deploy` at the root of the project and Runner
will guide you in the deployment process.


## 📄 Licenses
* Source code is licensed under [MIT](https://opensource.org/licenses/MIT)


## 💡 Feedback
[Create an issue or feature request](https://github.com/happystacklabs/frontend-boilerplate/issues/new).
