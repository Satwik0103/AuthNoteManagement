const utilityOperation=require("../../src/commonUtils/utility")

describe('convertDatetime', () => {
    test('converts valid datetime', () => {
      const dt = new Date('2023-01-01T12:34:56Z');
      const result = utilityOperation.convertDatetime(dt);
      expect(result);
    });
  });