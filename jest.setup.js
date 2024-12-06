import 'whatwg-fetch';

jest.mock('react-dom/test-utils', () => ({
  act: jest.requireActual('react').act,
}));
