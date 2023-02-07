# React Shopping Cart Example

A sample React shopping cart web app demo with custom hooks

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Introduction

**![image](https://user-images.githubusercontent.com/19681625/172130328-dfac46a0-e71a-4fa6-a518-d3255cd44281.png)**

A simple web app that allows a user to add supermarket items to a basket and remove items from the basket.
The app automatically calculate and display the costs of the items, and the total amount to pay.

The shop needs to allow the user to add these items to the basket:
Face Masks (£2.50 each)
Toilet Paper (65p per roll)

## Getting started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Custom Hooks Usage

- `useAddItem.tsx` - Add an item to basket
- `useCart.tsx` - Get cart items
- `useRemoveItem.tsx` - Remove an item from basket
