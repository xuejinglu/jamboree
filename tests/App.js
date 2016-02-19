import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import { App } from '../src/App';

describe('Basic App test', () => {
<<<<<<< HEAD
  it('shallow render', () => {
    const result = shallow(<App />);
    expect(result.contains(<h1>Hello World!</h1>)).to.equal(true);
  });

  it('full render', () => {
    const result = mount(<App />);
    expect(result.find('h1').length).to.equal(1);
  });

  it('static render', () => {
=======
  it('rendered the map component', () => {
>>>>>>> 1c18208714b11654144d2ed9f8379d453059ce0e
    const result = render(<App />);
    expect(result.text()).to.contain('Map');
  });
});
