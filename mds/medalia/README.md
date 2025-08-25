## Styles for Medalia forms

We've added stylesheets for styling form elements used in Medalia forms on maersk.com.

There are 2 generated stylesheets:

- `center-aligned.css`: composed from `/medalia/base/base.css` and `/medalia/base/center.css`
- `left-aligned.css`: composed from `/medalia/base/base.css` and `/medalia/base/left.css`

Editing and changing files:

- make changes in`/medalia/base/base.css`,`/medalia/base/center.css` or `/medalia/base/left.css`
- run in the root: `npm run generate:medalia`
- this will generate: `center-aligned.css` and `left-aligned.css` that can be uploaded to Akamai.

Both stylesheets have to be put manually on Akamai in MDS folder: https://assets.maerskline.com/mds/medalia/

URLs to stylesheets are:

- center aligned layout: `https://assets.maerskline.com/mds/medalia/center-aligned.css`
- left aligned layout: `https://assets.maerskline.com/mds/medalia/left-aligned.css`

Once uploaded to Akamai, the cache should be reset, so that the new stylesheet can kick in. You can do that through Admiral: from the sidebar, choose 'Catalogs' -> 'Akamai Integrations', click on 'Clear cache in Akamai', paste URL to the stylesheet, and press 'Send'.

The test surveys, that the styles were created for, are based on following test surveys:

- [Survey 1](https://maersk.digital-cloud.medallia.eu/dig-preview/build/index.html?propertyType=website&isShowToggle=true&versionToPresent=V2&formUuid=9deb6f90-f1e6-6880-7bcb-4aeea0d3a672&nebContext=preview&usedCustomParams=%5B%7B%22sourceName%22%3A%22selectedLang%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22country_code%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22medalliaTest%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22book-abandoned%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22localStorage.userDetails%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22maersk%23lang%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22perrec%22%2C%22source%22%3A%22Cookie%22%7D%5D&hostingElement=%7B%22width%22%3A%22%22%2C%22minHeight%22%3A%22%22%2C%22maxHeight%22%3A%22%22%7D)
- [Survey 2](https://maersk.digital-cloud.medallia.eu/dig-preview/build/index.html?propertyType=website&isShowToggle=true&versionToPresent=V2&formUuid=ab6ec518-f166-249c-b611-157e99c76942&nebContext=preview&usedCustomParams=%5B%7B%22sourceName%22%3A%22selectedLang%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22country_code%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22medalliaTest%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22book-abandoned%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22localStorage.userDetails%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22maersk%23lang%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22perrec%22%2C%22source%22%3A%22Cookie%22%7D%5D&hostingElement=%7B%22width%22%3A%22%22%2C%22minHeight%22%3A%22%22%2C%22maxHeight%22%3A%22%22%7D)
- [Survey 3](https://maersk.digital-cloud.medallia.eu/dig-preview/build/index.html?propertyType=website&isShowToggle=true&versionToPresent=V2&formUuid=5215c44e-283b-8302-407c-a03a0115f391&nebContext=preview&usedCustomParams=%5B%7B%22sourceName%22%3A%22selectedLang%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22country_code%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22medalliaTest%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22book-abandoned%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22localStorage.userDetails%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22maersk%23lang%22%2C%22source%22%3A%22Cookie%22%7D%2C%7B%22sourceName%22%3A%22perrec%22%2C%22source%22%3A%22Cookie%22%7D%5D&hostingElement=%7B%22width%22%3A%22%22%2C%22minHeight%22%3A%22%22%2C%22maxHeight%22%3A%22%22%7D)

## Running E2E test for Medalia

Run `npx nx run medalia:base` to generate base images for all tests and run tests.
Run `npx nx run medalia:actual` to compare snapshots.
