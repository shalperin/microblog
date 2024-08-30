install npm from binary
    https://nodejs.org/en/download/prebuilt-installer

modify npm global install dir
    + Make directory `mkdir ~/.npm-global`
    + Set configuration folder location
    + `npm config set prefix ~/.npm-global`
    + Add path to user environment path
    + `export PATH=~/.npm-global/bin:$PATH`

install yarn
    npm install --global yarn

clone module

usefull commands

yarn install
yarn build (configured to use public not dist, see package.json)
yarn start (same commment)
yarn add -- eg yarn add markdow


parcel build errors eg "key errror"?
    rm -rf .parcel-cache

    






