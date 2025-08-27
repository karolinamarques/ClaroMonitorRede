import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Main from '../src/main';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockImplementation(() => ({
    render: jest.fn()
  }))
}));

describe('Main Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar sem erros', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    require('../src/main');

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(div);
    expect(ReactDOM.createRoot().render).toHaveBeenCalledWith(
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Router>
      </React.StrictMode>
    );
  });

  it('deve configurar o roteamento corretamente', () => {
    const { container } = render(
      <Router>
        <Main />
      </Router>
    );
    
    expect(container.querySelector('Routes')).toBeInTheDocument();
    expect(container.querySelector('Route[path="/"]')).toBeInTheDocument();
  });
}];