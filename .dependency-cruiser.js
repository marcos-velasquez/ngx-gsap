/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies can cause initialization issues and make code harder to maintain.',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-orphans',
      severity: 'warn',
      comment: 'Orphan modules are not used anywhere and should be removed.',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$', // dot files
          '\\.d\\.ts$', // TypeScript declaration files
          '\\.spec\\.ts$', // test files
          '(^|/)tsconfig\\.json$', // TypeScript config
          '(^|/)index\\.ts$', // barrel exports
          'public-api\\.ts$', // public API exports
        ],
      },
      to: {},
    },
    {
      name: 'no-deprecated-core',
      severity: 'warn',
      comment: 'A module depends on a node core module that has been deprecated.',
      from: {},
      to: {
        dependencyTypes: ['core'],
        path: ['^(punycode|domain|constants|sys|_linklist|_stream_wrap)$'],
      },
    },
    {
      name: 'not-to-deprecated',
      severity: 'warn',
      comment: 'This module uses a (version of an) npm module that has been deprecated.',
      from: {},
      to: {
        dependencyTypes: ['deprecated'],
      },
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      comment: 'This module depends on an npm package that is not in package.json.',
      from: {},
      to: {
        dependencyTypes: ['npm-no-pkg', 'npm-unknown'],
      },
    },
    {
      name: 'not-to-unresolvable',
      severity: 'error',
      comment: 'This module depends on a module that cannot be found.',
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: 'no-duplicate-dep-types',
      severity: 'warn',
      comment: 'This module depends on a module that is in both dependencies and devDependencies.',
      from: {},
      to: {
        moreThanOneDependencyType: true,
        dependencyTypesNot: ['type-only'],
      },
    },
    // Architecture rules
    {
      name: 'utils-no-deps-on-models',
      severity: 'error',
      comment: 'Utils should not depend on models - keep utilities independent.',
      from: {
        path: '^packages/ngx-gsap/src/utils',
      },
      to: {
        path: '^packages/ngx-gsap/src/models',
      },
    },
    {
      name: 'models-no-deps-on-directives',
      severity: 'error',
      comment: 'Models should not depend on directives - maintain proper layering.',
      from: {
        path: '^packages/ngx-gsap/src/models',
      },
      to: {
        path: '^packages/ngx-gsap/src/directives',
      },
    },
    // Isolation rules - keep model subfolders independent
    {
      name: 'no-cross-model-dependencies',
      severity: 'warn',
      comment: 'Model subfolders should be independent. Use index.ts for public API.',
      from: {
        path: '^packages/ngx-gsap/src/models/([^/]+)/',
        pathNot: [
          // Allow animation-parsing to use preset-resolution (valid dependency)
          '^packages/ngx-gsap/src/models/animation-parsing/',
        ],
      },
      to: {
        path: '^packages/ngx-gsap/src/models/',
        pathNot: [
          '^packages/ngx-gsap/src/models/$1',
          'index\\.ts$', // Allow imports from index files
        ],
      },
    },
    // Utils should be used (at least once)
    {
      name: 'utils-must-be-used',
      severity: 'warn',
      comment: 'Utility modules should be used. Consider removing unused utilities.',
      from: {},
      module: {
        path: '^packages/ngx-gsap/src/utils/[^/]+\\.ts$',
        pathNot: 'index\\.ts$',
        numberOfDependentsLessThan: 1,
      },
    },
    // No direct GSAP imports outside models
    {
      name: 'no-direct-gsap-imports',
      severity: 'error',
      comment: 'Only models should import GSAP directly. Directives should use Timeline abstraction.',
      from: {
        path: '^packages/ngx-gsap/src/directives',
      },
      to: {
        path: 'node_modules/gsap',
        pathNot: [
          'ScrollTrigger', // Allowed for type imports
          'SplitText', // Allowed for type imports
        ],
      },
    },
    // Extractors should only be used by AnimationParser
    {
      name: 'extractors-only-by-parser',
      severity: 'warn',
      comment: 'Extractors should only be used by AnimationParser to maintain encapsulation.',
      from: {
        pathNot: ['animation-parser\\.ts$', 'extractors/index\\.ts$', '\\.spec\\.ts$'],
      },
      to: {
        path: '^packages/ngx-gsap/src/models/animation-parsing/extractors/[^/]+-extractor\\.ts$',
      },
    },
    // No test files in production code
    {
      name: 'no-test-in-production',
      severity: 'error',
      comment: 'Test files should not be imported in production code.',
      from: {
        pathNot: '\\.spec\\.ts$',
      },
      to: {
        path: '\\.spec\\.ts$',
      },
    },
    // Presets should be centralized
    {
      name: 'presets-only-from-presets-folder',
      severity: 'warn',
      comment: 'Presets should only be accessed through preset-resolver to maintain encapsulation.',
      from: {
        pathNot: ['preset-resolution/', '\\.spec\\.ts$'],
      },
      to: {
        path: 'preset-resolution/presets',
      },
    },
    // Constants should not depend on anything
    {
      name: 'constants-no-dependencies',
      severity: 'error',
      comment: 'Constants should be pure and not depend on other modules.',
      from: {
        path: '@constants/',
      },
      to: {
        pathNot: ['node_modules', '@constants/'],
      },
    },
  ],
  required: [
    // All directives must use AnimateDirective as base
    {
      name: 'directives-must-extend-base',
      severity: 'error',
      comment: 'All directives must extend AnimateDirective for consistency.',
      module: {
        path: '^packages/ngx-gsap/src/directives/animate-[^/]+\\.directive\\.ts$',
      },
      to: {
        path: 'animate\\.directive\\.ts$',
      },
    },
  ],
  options: {
    doNotFollow: {
      path: ['node_modules', '\\.spec\\.ts$', '__tests__'],
    },
    includeOnly: '^packages/ngx-gsap/src',
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
      extensions: ['.ts', '.js', '.json'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: [
          'node_modules/[^/]+',
          '^packages/ngx-gsap/src/models/animation-parsing/applicators/[^/]+$',
          '^packages/ngx-gsap/src/models/animation-parsing/extractors/[^/]+$',
          '^packages/ngx-gsap/src/utils/[^/]+$',
        ],
        theme: {
          replace: false,
          graph: {
            bgcolor: '#1a1a2e',
            splines: 'ortho',
            rankdir: 'LR',
            ranksep: '1.5',
            nodesep: '0.8',
            fontname: 'Arial',
            fontsize: '12',
            fontcolor: '#ffffff',
          },
          node: {
            shape: 'box',
            style: 'filled,rounded',
            fillcolor: '#16213e',
            fontcolor: '#ffffff',
            color: '#0f3460',
            fontname: 'Arial',
            fontsize: '11',
          },
          edge: {
            arrowhead: 'vee',
            arrowsize: '0.7',
            penwidth: '1.5',
            color: '#e94560',
            fontcolor: '#ffffff',
            fontname: 'Arial',
            fontsize: '9',
          },
          modules: [
            {
              criteria: { source: '^packages/ngx-gsap/src/directives' },
              attributes: {
                fillcolor: '#ff6b6b',
                color: '#c92a2a',
                fontcolor: '#ffffff',
                shape: 'component',
              },
            },
            {
              criteria: { source: '^packages/ngx-gsap/src/models/animation-parsing/applicators' },
              attributes: {
                fillcolor: '#51cf66',
                color: '#2b8a3e',
                fontcolor: '#000000',
                shape: 'box3d',
              },
            },
            {
              criteria: { source: '^packages/ngx-gsap/src/models/animation-parsing' },
              attributes: {
                fillcolor: '#4dabf7',
                color: '#1971c2',
                fontcolor: '#ffffff',
              },
            },
            {
              criteria: { source: '^packages/ngx-gsap/src/models/timeline' },
              attributes: {
                fillcolor: '#845ef7',
                color: '#5f3dc4',
                fontcolor: '#ffffff',
              },
            },
            {
              criteria: { source: '^packages/ngx-gsap/src/models/preset-resolution' },
              attributes: {
                fillcolor: '#ffd43b',
                color: '#f08c00',
                fontcolor: '#000000',
              },
            },
            {
              criteria: { source: '^packages/ngx-gsap/src/models/trigger' },
              attributes: {
                fillcolor: '#ff8787',
                color: '#c92a2a',
                fontcolor: '#ffffff',
              },
            },
            {
              criteria: { source: '^packages/ngx-gsap/src/utils' },
              attributes: {
                fillcolor: '#da77f2',
                color: '#9c36b5',
                fontcolor: '#ffffff',
                shape: 'hexagon',
              },
            },
            {
              criteria: { source: 'index\\.ts$' },
              attributes: {
                fillcolor: '#20c997',
                color: '#087f5b',
                fontcolor: '#000000',
                shape: 'folder',
              },
            },
            {
              criteria: { coreModule: true },
              attributes: {
                fillcolor: '#868e96',
                color: '#495057',
                fontcolor: '#ffffff',
              },
            },
          ],
          dependencies: [
            {
              criteria: { circular: true },
              attributes: {
                color: '#fa5252',
                penwidth: '3',
                style: 'bold',
              },
            },
            {
              criteria: { dynamic: true },
              attributes: {
                color: '#fab005',
                style: 'dashed',
              },
            },
          ],
        },
      },
      archi: {
        collapsePattern: '^packages/ngx-gsap/src/[^/]+',
      },
    },
  },
};
