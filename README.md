# Bingo

A small bingo game created using React. Click "PLAY" to release the balls!

## Development

Getting started with development is fairly straight forward:

### Prerequisites

You will need `git` installed locally to clone this repository.

You will need `Node >= 6` installed on your machine. If you don't have Node
installed (nvm)[https://github.com/creationix/nvm] is an excellent version
manager for node.

### Running the app

To run a local version of the app, checkout this repo and `cd` into the `bingo`
directory. Install the app dependencies with:
```
npm install
```

Once the above is finished, start the app with:
```
npm start
```

You should now be able to access the app on (http://localhost:3000)[http://localhost:3000]

### Running the tests

Run the tests with the following command (note: make sure you've run `npm install first`):

```
npm test
```

You will drop into an interactive test session. Press `q` to quit. See below for
more details on the test framework used.

## Details about the libraries used

This app is build with (React)[https://reactjs.org/] - a Javascript library
focused on creating reusable components.

The (Create React App)[https://reactjs.org/docs/add-react-to-a-new-app.html]
module was used to create the initial project structure. This allows for quick
setup with minimal configuration. *Note:* If you need to configure advanced
features such as SASS or change the Webpack configuration you may need to follow
the CRA *eject* procedure.

The original Create React App README that was generated with the project is
available (here)[./CRA_README.md].

The testing framework used by React is (Jest)[https://facebook.github.io/jest/docs/en/tutorial-react.html].

## Code structure

React is fairly flexible in terms of file structure - you can place components
and tests whereever you want within the `src` directory. As such, it makes
sense to have a structure in mind to avoid things getting in a mess later!

The main entrypoint of the app is `src/index.js`. This loads the root `App`
component which is imported from `src/App.js`.

The components which make up the app (tickets, game screens etc) are found in
the `src/components` directory. If a component has it's own stylesheet, it can
be found in `src/components/styles`. The stylesheet will have the same name as
the component, i.e. the ticket component:

```
src/components/Ticket.js
```
has a stylesheet in:
```
src/components/styles/Ticket.css
```

Constants are found in `src/constants`.

Tests are available in `src/tests`, although bear in mind that any file with a
pattern matching `<name>.test.js` will be detected by Jest.

## Building for production

Run the following to build the React application assets in a minified, production
ready bundle:

```
npm run build
```

Assuming everything builds successfully you will have a `build` directory
containing all the static assets of the app, ready to deploy!

*Note:* The `build` directory will not, and _should not_, show up in version
control. It is ignored by default in `.gitignore`, as it should be freshly built
every time.

You can test the production build locally with the following steps:

Add the global yarn server:

```
yarn global add serve
```

Run the server by `cd`ing to the root directory and running the following:

```
serve -s build
```

The production build should now be running on (http://localhost:5000)[http://localhost:5000]

### Troubleshooting the yarn server

If (like me) you get an error such as `command not found: serve` you may need to
add yarn to your `$PATH`. To do so, run the following to get the path of the yarn
binary:
```
yarn global bin
```
Copy the directory this outputs and (add it to your $PATH)[https://unix.stackexchange.com/a/26059/251285].
