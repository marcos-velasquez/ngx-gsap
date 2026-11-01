export default {
  displayName: 'ngx-gsap',
  preset: '../../jest.preset.js',
  setupFiles: ['<rootDir>/src/test-polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/packages/ngx-gsap',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  /* The plugin entry points of `gsap` are untranspiled ESM; their `dist/` builds are the UMD files
     jest can load, the same build `gsap` itself resolves to. */
  moduleNameMapper: { '^gsap/(ScrollTrigger|SplitText|MorphSVGPlugin)$': 'gsap/dist/$1' },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
