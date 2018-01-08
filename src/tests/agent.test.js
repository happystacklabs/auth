import moxios from 'moxios';
import * as agent from '../agent';


describe('agent', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('requests', () => {
    describe('get', () => {
      it('make a get request and return the body', (done) => {
        const spy = jest.fn();
        agent.requests.get('/').then(spy);
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 201,
            response: { payload: 'foo' },
          }).then(() => {
            expect(request.config.method).toBe('get');
            expect(request.config.url).toBe('http://localhost:3001/api/');
            expect(spy.mock.calls[0][0].data).toEqual({ payload: 'foo' });
            done();
          });
        });
      });
    });

    describe('post', () => {
      it('make a post request and return the body', (done) => {
        const spy = jest.fn();
        agent.requests.post('/', 'body').then(spy);
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 201,
            response: { payload: 'foo' },
          }).then(() => {
            expect(request.config.data).toBe('body');
            expect(request.config.method).toBe('post');
            expect(request.config.url).toBe('http://localhost:3001/api/');
            expect(spy.mock.calls[0][0].data).toEqual({ payload: 'foo' });
            done();
          });
        });
      });
    });

    describe('put', () => {
      it('make a put request and return the body', (done) => {
        const spy = jest.fn();
        agent.requests.put('/', 'body').then(spy);
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 201,
            response: { payload: 'foo' },
          }).then(() => {
            expect(request.config.data).toBe('body');
            expect(request.config.method).toBe('put');
            expect(request.config.url).toBe('http://localhost:3001/api/');
            expect(spy.mock.calls[0][0].data).toEqual({ payload: 'foo' });
            done();
          });
        });
      });
    });
  });

  describe('Auth', () => {
    describe('login', () => {
      it('make a post request with the login information and return a post request', () => {
        agent.requests.post = jest.fn();
        agent.requests.post.mockImplementation(() => ({ response: 'foo' }));
        expect(agent.Auth.login('foo@bar.com', 'bar')).toEqual({ response: 'foo' });
      });
    });

    describe('current', () => {
      it('make a get request to /user', () => {
        agent.requests.get = jest.fn();
        agent.requests.get.mockImplementation(() => ({ user: 'foo' }));
        expect(agent.Auth.current()).toEqual({ user: 'foo' });
      });
    });

    describe('register', () => {
      it('make a post request to /users', () => {
        agent.requests.post = jest.fn();
        agent.requests.post.mockImplementation(() => ({ response: 'foo' }));
        expect(agent.Auth.register('username', 'foo@bar.com', 'bar')).toEqual({ response: 'foo' });
      });
    });

    describe('save', () => {
      it('make a post put request to /user', () => {
        agent.requests.put = jest.fn();
        agent.requests.put.mockImplementation(() => ({ response: 'foo' }));
        expect(agent.Auth.save('username', 'foo@bar.com', 'bar')).toEqual({ response: 'foo' });
      });
    });
  });

  describe('setToken', () => {
    it('set the token in agent', () => {
      expect(agent.token).toBe(null);
      agent.setToken('foo');
      expect(agent.token).toBe('foo');
    });
  });
});
