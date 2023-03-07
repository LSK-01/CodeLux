import "@testing-library/jest-dom";
global.google = {
    charts: {
      load: jest.fn(),
      setOnLoadCallback: jest.fn(),
      // add other chart types here as needed
    },
    visualization: {
        arrayToDataTable: jest.fn(),
        // PieChart: jest.fn(),
        PieChart: {
            draw: jest.fn()
        }
    }
  };
global.user = {
  email: 'test@gmail.com',
  uid: 'UmImi8JtUuV6FubN9NCBTuTVhDn2',
  username: 'test',
  githubToken: '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'
};
