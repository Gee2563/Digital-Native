import '@testing-library/jest-dom';
// Mock the global fetch function
(global.fetch as jest.Mock) = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
  