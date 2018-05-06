echo 'Installing titanium-angular dependencies ...'
cd packages/titanium-angular
rm -rf node_modules
npm i
cd ..

echo 'Installing webpack-dev-titanium dependencies ...'
cd webpack-dev-titanium
rm -rf node_modules
npm i
cd ../..

echo 'Installing sample-app dependencies ...'
cd ti-angular-example/app
rm -rf node_modules
npm i
