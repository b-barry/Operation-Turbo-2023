const traverse = require('traverse');
const seedrandom = require('seedrandom');
const rng = seedrandom('vue-sdk-seed');
const path = require('path');

const filterEmptyTextNodes = (node) =>
  !(
    typeof node.properties._text === 'string' &&
    !node.properties._text.trim().length
  );

const getSeededId = () => {
  const rngVal = rng();
  return Number(String(rngVal).split('.')[1]).toString(36);
};

/**
 * @param {any} x
 * @returns {x is import('@builder.io/mitosis').MitosisNode}
 */
const isMitosisNode = (x) => x && x['@type'] === '@builder.io/mitosis/node';

const kebabCase = (string) =>
  string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

/**
 * @type {import('@builder.io/mitosis'.MitosisConfig['getTargetPath'])}
 */
const getTargetPath = ({ target }) => {
  const targetKebabCase = kebabCase(target);
  switch (target) {
    // we have to workaround a name collision, where the folder can't have the name of the `exports` property in package.json.
    // crazy, crazy stuff.
    case 'vue2':
      return `vue2`;
    case 'rsc':
      return `react/src/server`;
    case 'react':
      return `react/src/client`;
    case 'vue':
    case 'vue3':
      return `vue`;
    default:
      return `${targetKebabCase}`;
  }
};

/**
 * @type {import('@builder.io/mitosis'.MitosisConfig['options']['vue'])}
 */
const vueConfig = {
  typescript: true,
  api: 'options', // TODO handle props compilation error in composition api
  cssNamespace: getSeededId,
  asyncComponentImports: false,
  plugins: [
    () => ({
      json: {
        pre: (json) => {
          traverse(json).forEach(function (item) {
            if (!isMitosisNode(item)) {
              return;
            }

            if (item.bindings.dangerouslySetInnerHTML) {
              item.bindings.innerHTML = item.bindings.dangerouslySetInnerHTML;
              delete item.bindings.dangerouslySetInnerHTML;
            }
          });

          return json;
        },
      },
    }),
  ],
};

/**
 * @type {import('@builder.io/mitosis'.Plugin)}
 */
const SRCSET_PLUGIN = () => ({
  code: {
    pre: (code) => {
      // workaround until we resolve
      // https://github.com/BuilderIO/mitosis/issues/526
      return code.replace(/srcset=/g, 'srcSet=');
    },
  },
});

const BYPASS_TRANSPILE_CLI_FOR_IMPORT_PLUGIN = () => ({
  json: {
    pre: (json) => {
      // console.log("JSON", json)
    },
  },
  code: {
    post: (code) => {
      return code.replace(/.lite/g, '');
    },
  },
});

/**
 * @type {import('@builder.io/mitosis'.MitosisConfig)}
 */
module.exports = {
  files: 'src/**',
  overridesDir: './overrides',
  dest: './mitosis-output',
  targets: [
    'react',
    'rsc',
    'vue3',
    // 'reactNative',
    // 'vue2',
    // 'solid',
    // 'svelte',
    // 'qwik',
  ],
  getTargetPath,
  options: {
    react: {
      typescript: true,
      prettier: true,
      stylesType: 'style-tag',
      plugins: [SRCSET_PLUGIN, BYPASS_TRANSPILE_CLI_FOR_IMPORT_PLUGIN],
    },
    rsc: {
      typescript: true,
      prettier: true,
      // plugins: [SRCSET_PLUGIN, BYPASS_TRANSPILE_CLI_FOR_IMPORT_PLUGIN],
    },
    vue3: vueConfig,
    reactNative: {
      plugins: [SRCSET_PLUGIN],
    },
    qwik: {
      typescript: true,
      plugins: [SRCSET_PLUGIN],
    },
    svelte: {
      typescript: true,
      plugins: [
        () => ({
          json: {
            pre: (json) => {
              const tag =
                json.meta.useMetadata && json.meta.useMetadata.elementTag;

              if (tag) {
                traverse(json).forEach(function (item) {
                  if (!isMitosisNode(item)) {
                    return;
                  }

                  if (item.name === tag) {
                    item.bindings.this = { code: item.name };
                    item.name = 'svelte:element';
                  }
                });
              }
            },
          },
        }),
      ],
    },
  },
};
