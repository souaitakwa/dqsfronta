// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firstName: 'Shehan',


  /*dialogflow: {
    angularBot: '634c5ccad7ff097b17b07963798289a201dd4645'
  },*/
  dialogflow: {
    projectId: "alphalyr-ysk9"
  },
  backend: {
    baseUrl: "http://localhost:3000/",
    apiUrl: "http://localhost:3000/api/",
    requestTextUrl: "http://localhost:3000/api/requestText/"
  }
};
