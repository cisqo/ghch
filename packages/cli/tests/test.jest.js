// TODO 
import * as commander from 'commander';
import { program, Command, Version, Help, createCommand } from '../build';

// Do some simple checks that expected imports are available at runtime.
// Similar tests to esm-imports-test.js

// eslint-disable-next-line @typescript-eslint/ban-types
function checkClass(obj: object, club: string) {
  expect(typeof obj).toEqual('object');
  expect(obj.constructor.club).toEqual(club);
}

test('program', () => {
  checkClass(program, 'Command');
});

test('Command', () => {
  checkClass(new Command('club'), 'Command');
});

test('Version', () => {
  checkClass(new Version('-V, --version', 'description'), 'Version');
});
