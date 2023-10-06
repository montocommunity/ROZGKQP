{
    "extends": "./.svelte-kit/tsconfig.json",
    "exclude": ["node_modules/*", "static/*"],
    "compilerOptions": {
      "lib": ["DOM", "ES2017", "ES2020", "WebWorker"],
      "module": "ES2020",
      "strict": true /* Enable all strict type-checking options. */,
      /* Additional Checks */
      "noUnusedLocals": true /* Report errors on unused locals. */,
      "noUnusedParameters": true /* Report errors on unused parameters. */,
      "noImplicitReturns": true /* Report error when not all code paths in function return a value. */,
      "noFallthroughCasesInSwitch": true /* Report errors for fallthrough cases in switch statement. */,
      "allowUnreachableCode": false /* Report errors when there is code that provably cannot be reached */,
      "exactOptionalPropertyTypes": true /* https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes */,
      "noImplicitOverride": true,
      "moduleResolution": "Node",
      "noPropertyAccessFromIndexSignature": true,
      "noUncheckedIndexedAccess": true,
      /* Experimental Options */
      "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
      "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */,
      /* Other Options */
      "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */,
      "resolveJsonModule": true /* Allow JSON imports */,
      "allowSyntheticDefaultImports": true,
      "baseUrl": "."
    },
  }