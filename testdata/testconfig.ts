const env = process.env.ENV ?? 'test';

const baseUrls: Record<string, string> = {
  uat: process.env.ORANGEHRM_BASE_URL ?? 'https://uat.opensource-demo.orangehrmlive.com/',
  stage: process.env.ORANGEHRM_BASE_URL ?? 'https://stage.opensource-demo.orangehrmlive.com/',
  test: process.env.ORANGEHRM_BASE_URL ?? 'https://opensource-demo.orangehrmlive.com/',
};

export const ENV = env;
export const ORANGEHRM_BASE_URL = baseUrls[env] ?? baseUrls.test;

export const VALID_CREDENTIALS = {
  username: 'Admin',
  password: 'admin123',
};

export const INVALID_CREDENTIALS = {
  username: 'invalid-user',
  password: 'bad-password',
};
