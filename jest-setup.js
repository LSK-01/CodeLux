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