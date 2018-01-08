import 'raf/polyfill';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { configure, shallow, mount } from 'enzyme';
import shallowWithStore from './shallowWithStore';


// React 16 Enzyme adapter
configure({ adapter: new Adapter() });


// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.mount = mount;
global.shallowWithStore = shallowWithStore;
