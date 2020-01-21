const SUBSCRIPTION_STATES = {
  VIRGIN: Symbol('SUBSCRIPTION_STATES.VIRGIN'),
  CALLED: Symbol('SUBSCRIPTION_STATES.CALLED')
};

// subscription  singleton
const subscriptions = new Map();

function subscribe (eventType, callback, runIfCalled = false) {
  if (!subscriptions.has(eventType)) {
    const subscriptionTemplate = {
      state: SUBSCRIPTION_STATES.VIRGIN,
      lastPayload: null,
      callbacks: []
    };
    subscriptions.set(eventType, subscriptionTemplate);
  }

  const subscription = subscriptions.get(eventType);
  subscription.callbacks.push(callback);

  if (runIfCalled && subscription.state === SUBSCRIPTION_STATES.CALLED) {
    callback(subscription.lastPayload);
  }

  const unsubscribe = () => subscription.callbacks.splice(subscription.callbacks.indexOf(callback), 1);
  return unsubscribe;
}

function publish (eventType, payload) {
  const subscription = subscriptions.get(eventType);
  if (!subscription) return;

  subscription.lastPayload = payload;
  subscription.state = SUBSCRIPTION_STATES.CALLED;
  subscription.callbacks.forEach(callback => callback(payload));
}

export { subscribe, publish };
