// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import FormComponent from './components/FormComponent';
import './style.css';

const App = () => (
    <div>
        <FormComponent />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
