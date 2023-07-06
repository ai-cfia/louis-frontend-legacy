# louis frontend

## introduction

conversational web interface to louis backend

### Installation

1. Clone the repository to your local machine.
2. Navigate to the front-end directory: `cd app/frontend`.
3. Install the dependencies by running `npm install`.

### Configuration

1. In the root of the project directory, create a file named `.env`.
2. Open the `.env` file in a text editor.
3. Assign the `REACT_APP_BACKEND_URL` variable to the endpoint URL of your backend server.

   For example: `REACT_APP_BACKEND_URL=Endpoint_url_goes_here`
   
## local development

Build:

```
cd app/frontend
npm run build
```

Serve:

```
cd to the root directory: 

npm install serve 
./node_modules/.bin/serve dist/
```

Automated Testing:

```
cd to the app/frontend directory: 

cd app/frontend
npm test  
```

