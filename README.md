## Simplistic CRUD ionic 5 firestore TODO app example

This is a very simplistic CRUD (Create, Read, Update, Delete) Created with ionic 5 and firestore (database).

Note:
I used this design as inspiration: [https://dribbble.com/shots/4782162-To-Do-App-Concept-Minimal](https://dribbble.com/shots/4782162-To-Do-App-Concept-Minimal)

The idea here is to illustrate how to create a simple CRUD with firestore.

![todo](https://user-images.githubusercontent.com/8228498/79624393-5633dd00-80ef-11ea-9cad-f42da712c18c.gif)


##Installation

My advice is that you install nvm (to manage your node versions), here is [tutorial](http://www.jomendez.com/2018/06/03/install-multiple-versions-node-using-nvm/) step by step.

After you install nvm run the following commands:

```bash
nvm install 12
```

If everything went well you'll have installed node 12.0.0 

Now you'll need to install ionic cli:

```bash
npm install -g @ionic/cli
```

Now is time to download the project and install it's dependencies.  

```bash
git clone https://github.com/jomendez/ionic-5-crud-todo-with-firestore.git
cd ionic-5-crud-todo-with-firestore
npm install
```


Next step it to create a config file that will contain your firebase config keys here:

`src/app/config/firebase.ts`

If you are on bash you can use the following command:

```bash
touch src/app/config/firebase.ts
```

Assuming that you are familiar with firebase and already have an account, paste your configuration info into the firebase.ts file, it should looks something like this (This is just and example), If you are not familiar with firebase or doesn't have an account, I'll provide more information on how to do it bellow

Example of configuration:
```javascript
export const firebaseConfig = {
  apiKey: "AIzaSwERfdilPYtcNDfvFR6x944EowerdfghfSDFsfg",
  authDomain: "crud-456657.firebaseapp.com",
  databaseURL: "https://crud-456657.firebaseio.com",
  projectId: "crud-456657",
  storageBucket: "crud-456657.appspot.com",
  messagingSenderId: "10130122343423",
  appId: "1:1013012342277:web:sd9f8sd8fs8dfs89df89s",
  measurementId: "G-3FGJ34GFGJK"
};
```

## How to get your firebase configuration 

Go to [https://firebase.google.com/](https://firebase.google.com/) and login with your account or create a new one.

### Click on create a web app (This is the screen that you'll see the first time you create a projects):

![image](https://user-images.githubusercontent.com/8228498/79625856-f0008780-80f9-11ea-86be-63a4ecff5262.png)

### Or add a new project (If you have already other projects created):

![image](https://user-images.githubusercontent.com/8228498/79625190-399aa380-80f5-11ea-8df0-b8dd8b9606e6.png)


### Enter the name of your project, accept the terms, and finish the other two steps on the wizard:

 ![image](https://user-images.githubusercontent.com/8228498/79625222-75ce0400-80f5-11ea-8b54-d1c5a88ed181.png)


### Next you'll see something like this, from here you can grab the configuration key 

![image](https://user-images.githubusercontent.com/8228498/79625945-87fe7100-80fa-11ea-930a-aa5d235a813c.png)

### If you missed the previous screen you can always go to the cog wheel on the left side panel, and click on project settings.

![image](https://user-images.githubusercontent.com/8228498/79625424-2688d300-80f7-11ea-829b-ce117a7cbb7a.png)


Now scroll down to the Your App section and click on config radio button, and copy the code highlighted on the image bellow, and paste it on the firebase.ts file

![image](https://user-images.githubusercontent.com/8228498/79625529-b7f84500-80f7-11ea-8233-49c9ec8dd683.png)