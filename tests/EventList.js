// import React from 'react';
// import { expect } from 'chai';
// import { mount } from 'enzyme';
// import EventList from '../src/components/EventList';
//
// const SAMPLE_DATA = [ // TODO: replace with API query
//   {
//     name: 'The Beegees',
//     date: '2016-12-15T08:00:00',
//     venue: {
//       name: 'Civic Auditorium',
//       lat: 37.7780405,
//       lng: -122.41741339999999,
//     },
//     description: 'Stayin\' alive.',
//     thumbnail: 'http://path.to.eventful.cdn.com/thumbnail.jpg',
//   },
//   {
//     name: 'Parliament Funkadelic',
//     date: '2016-12-17T10:00:00',
//     venue: {
//       name: 'The Fillmore',
//       lat: 37.7840042,
//       lng: -122.43313319999999,
//     },
//     description: 'Give up the funk.',
//     thumbnail: 'http://path.to.eventful.cdn.com/thumbnail.jpg',
//   },
//   {
//     name: 'Pink Floyd',
//     date: '2016-12-17T08:00:00',
//     venue: {
//       name: 'The Warfield',
//       lat: 37.7826598,
//       lng: -122.41018099999997,
//     },
//     description: 'Just another brick in the wall.',
//     thumbnail: 'http://path.to.eventful.cdn.com/thumbnail.jpg',
//   },
// ];
//
// describe('<EventList />', () => {
//   const result = mount(<EventList data={ SAMPLE_DATA } />);
//
//   it('has a state.events matching prop.data', () => {
//     expect(result.state('events')).to.equal(SAMPLE_DATA);
//   });
// });
