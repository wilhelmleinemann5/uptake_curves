# mds-foundations

The package generates CSS that can be used as the foundations for HTML based web solutions.

The package generates two CSS files, one for px based units and one for rem based units:

- css/foundations.css
- css/foundations.min.css

Both CSS files use CSS properties from `@maersk-global/mds-design-tokens`.

The CSS includes:

- Reset styles
- Typography styles
- Link styles
- HTML table styles

To use in a solution, first include the Maersk fonts and include the theme you wish to use e.g.

```js
@import '~@maersk-global/fonts/maeu/fonts.css';
@import '~@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
@import '~@maersk-global/mds-foundations/css/foundations.css';
```

Just remember if you're importing the foundations package to an `scss` file, you would need to drop the `.css` extension in the import statement like below, otherwise you cannot use sass operators e.g. `@extend`:

```js
@import '~@maersk-global/mds-foundations/css/foundations';
```
