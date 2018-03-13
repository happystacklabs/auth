import React from 'react';
import { mount } from 'enzyme';
import { SettingsAvatar } from '../components/SettingsAvatar';

describe('SettingsAvatar', () => {
  it('passed all props', () => {

  });

  describe('upload', () => {
    it('show the modal with dropzone when upload is clicked', () => {
      const user = { username: 'foo' };
      const settingsAvatar = mount(<SettingsAvatar currentUser={user} />);
      expect(settingsAvatar.state().modal).toBe(false);
      settingsAvatar.find('button').at(0).simulate('click');
      expect(settingsAvatar.state().modal).toBe(true);
    });

    it('call onChange() prop when dropzone is changed', () => {
      const user = { username: 'foo' };
      const spy = jest.fn();
      const file = new Blob(['file contents'], { type: 'text/plain' });
      const settingsAvatar = mount(<SettingsAvatar currentUser={user} onChange={spy} />);
      const dropzone = settingsAvatar.find('Dropzone').at(0);
      dropzone.find('input').at(0).simulate('change', { target: { files: [file] } });
      expect(spy.mock.calls.length).toBe(1);
    });

    it('it close modal when handleUpload is called', () => {
      const user = { username: 'foo' };
      const spy = jest.fn();
      const file = new Blob(['file contents'], { type: 'text/plain' });
      const settingsAvatar = mount(<SettingsAvatar currentUser={user} onChange={spy} />);
      settingsAvatar.find('button').at(0).simulate('click');
      expect(settingsAvatar.state().modal).toBe(true);
      const dropzone = settingsAvatar.find('Dropzone').at(0);
      dropzone.find('input').at(0).simulate('change', { target: { files: [file] } });
      expect(settingsAvatar.state().modal).toBe(false);
    });

    it('should show the change button when avatar is in currentUser', () => {
      const user = { username: 'foo', avatar: 'baz' };
      const settingsAvatar = mount(<SettingsAvatar currentUser={user} />);
      expect(settingsAvatar.find('button').at(0).text()).toBe('Change');
    });

    it('should show the delete buttton when avatar is in currentUser', () => {
      const user = { username: 'foo', avatar: 'foo' };
      const settingsAvatar = mount(<SettingsAvatar currentUser={user} />);
      expect(settingsAvatar.contains('Remove')).toBe(true);
    });

    it('call onRemove() prop when remove button is clicked', () => {
      const user = { username: 'foo', avatar: 'baz' };
      const spy = jest.fn();
      const settingsAvatar = mount(<SettingsAvatar currentUser={user} onRemove={spy} />);
      settingsAvatar.find('button').at(1).simulate('click');
      expect(spy.mock.calls.length).toBe(1);
    });
  });
});
