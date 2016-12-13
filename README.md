## Delivery
This is a sample Laravel + Ionic + Cordova application.
Make sure you have PHP, MySQL, Apache and NodeJS installed.


Install Ionic CLI
```
$ npm install -g ionic
```
Install Cordova
```
$ npm install -g cordova
```
Clone this repo
```
$ git clone https://github.com/90lucasgabriel/delivery
```


## API Laravel
cd into the api folder

Fix php artisan
```
$ composer update --no-scripts
```
Generate Laravel App Key
```
$ php artisan key:generate
```
Create database

Insert into .env: database, user, password, Pusher settings and Ionic.io settings.

Seed database
```
$ php artisan migrate:refresh --seed
```
cd into the activity folder run npm install
```
$ npm install
```
Serve the app
```
$ php artisan serve
```

## Ionic Application
cd into the ionic folder and run npm install
```
$ npm install
```
You may need to restore the state of the ionic project, especially if you plan on using cordova.
```
ionic prepare
```
Build the app
```
$ npm run build
```
Serve the app
```
$ ionic serve
```
Head to `http://localhost:8100` in your browser and you'll see the app running
