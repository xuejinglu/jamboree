import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import { App } from '../src/App';

describe('Basic App test', () => {
  it('rendered the map component', () => {
    const result = render(<App />);
    expect(result.text()).to.contain('Map');
  });
});
