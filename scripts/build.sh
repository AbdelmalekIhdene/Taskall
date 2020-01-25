browserify -t [ babelify --presets [ @babel/preset-env @babel/preset-react ] --plugins [ @babel/plugin-proposal-class-properties ] ] ./static/scripts/login.js -o ./static/scripts/loginBundle.js
browserify -t [ babelify --presets [ @babel/preset-env @babel/preset-react ] --plugins [ @babel/plugin-proposal-class-properties ] ] ./static/scripts/organisation.js -o ./static/scripts/organisationBundle.js
browserify -t [ babelify --presets [ @babel/preset-env @babel/preset-react ] --plugins [ @babel/plugin-proposal-class-properties ] ] ./static/scripts/dashboard.js -o ./static/scripts/dashboardBundle.js
make
make build
