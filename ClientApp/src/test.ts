// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

/**
 * Transforms the given method into a jasmine spy so that jasmine functions
 * can be called on this method without Typescript throwing an error
 *
 * @example
 * `asSpy(translator.getDefaultLang).and.returnValue(null);`
 * is equal to
 * `(translator.getDefaultLang as jasmine.Spy).and.returnValue(null);`
 *
 * This function will be mostly used in combination with `jasmine.createSpyObj`, when you want
 * to add custom behavior to a by jasmine created method
 * @example
 * `const translator: TranslateService = jasmine.createSpyObj('TranslateService', ['getDefaultLang'])
 * asSpy(translator.getDefaultLang).and.returnValue(null);`
 *
 * @param {() => any} method - The method that should be types as a jasmine Spy
 * @returns {jasmine.Spy} - The newly typed method
 */
export function asSpy (method: (param1? : any, param2?: any) => any): jasmine.Spy {
  return method as jasmine.Spy;
}
