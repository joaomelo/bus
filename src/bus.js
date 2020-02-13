const SUBSCRIPTION_STATES = {
  VIRGIN: Symbol('SUBSCRIPTION_STATES.VIRGIN'),
  CALLED: Symbol('SUBSCRIPTION_STATES.CALLED')
};

// subscription map singleton
const subscriptions = new Map();

function subscribe (topic, callback, runIfPublished = false) {
  const subscription = getOrCreateSubscription(topic);
  subscription.callbacks.push(callback);

  if (runIfPublished && subscription.state === SUBSCRIPTION_STATES.CALLED) {
    callback(subscription.lastPayload);
  }

  const unsubscribe = () => subscription.callbacks.splice(subscription.callbacks.indexOf(callback), 1);
  return unsubscribe;
}

function publish (topic, payload) {
  const subscription = getOrCreateSubscription(topic);
  subscription.lastPayload = payload;
  subscription.state = SUBSCRIPTION_STATES.CALLED;
  subscription.callbacks.forEach(callback => callback(payload));
}

function getOrCreateSubscription (topic) {
  if (!subscriptions.has(topic)) {
    const subscriptionTemplate = {
      state: SUBSCRIPTION_STATES.VIRGIN,
      lastPayload: null,
      callbacks: []
    };
    subscriptions.set(topic, subscriptionTemplate);
  }
  const subscription = subscriptions.get(topic);
  return subscription;
}

function clear () {
  subscriptions.clear();
}

export { subscribe, publish, clear };
