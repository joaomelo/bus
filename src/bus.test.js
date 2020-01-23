import { subscribe, publish } from './index.js';

describe('when bus publishes', () => {
  it('the callback should be called', () => {
    expect.hasAssertions();

    let payload = 1;
    subscribe('event', () => ++payload);
    publish('event', payload);
    expect(payload).toBe(2);
  });

  it('after unsubscribe, the callback should be disabled', () => {
    expect.hasAssertions();

    let payload = 1;
    const unsub = subscribe('event', () => ++payload);
    unsub();
    publish('event', payload);

    expect(payload).toBe(1);
  });

  it('a unsubscribed event no callback should be called', () => {
    expect.hasAssertions();

    let payload = 1;
    subscribe('event', () => ++payload);
    publish('another-event', payload);

    expect(payload).toBe(1);
  });

  it('many times, the callback should be called every time', () => {
    expect.hasAssertions();

    let payload = 1;
    subscribe('event', () => ++payload);
    subscribe('event', () => ++payload);
    publish('event', payload);
    expect(payload).toBe(3);
  });

  it('before subscribe, the callback should be called if thrid parameter is true', () => {
    expect.hasAssertions();

    let payload = 1;
    publish('event', payload);
    subscribe('event', () => ++payload, true);
    expect(payload).toBe(2);
  });
});
