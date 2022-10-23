### Theming with css variables

While light/dark mode variations can be handled explicitly via `dark:` variants
90% of the additional classes are simply to choose different colors.

In theory we could reduce the need for 90% dark variant classes by simply changing
the colors via css variables.

See https://www.radix-ui.com/colors

Would even be possible to have more than one theme TBD.

Note that this is orthogonal to implementing color-scheme (dark mode).