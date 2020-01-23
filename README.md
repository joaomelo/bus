# BUS

Bus is a small package that functions as a simple central event bus for a javascript app.

## Installation

You can download bus.js file from the src directory or install with npm

    npm install @joaomelo/bus

## Getting Started

The whole behavior is driven by the subscribe and publish functions.

To listen to an event you import the subscribe function and call it passing a key to track the event and a callback function to be called when the event is published.

    //a.js
    import { subscribe } from '@joaomelo/bus';

    function callback(payload){
      console.log(payload);
    };

    subscribe('SOME_TYPE_OF_EVENT', callback);

Then you can publish (emit) the event with some data as payload to be passed to all subscribers callback functions.

    //b.js
    import { publish } from '@joaomelo/bus';

    const payload = 'hello world'
    publish('SOME_TYPE_OF_EVENT', payload);

### Late subscription

Maybe you are subscribing after an event already happened in the past. For example, you want to listen for the user login but it happened automatically even before your code subscribed to the event.

The BUS can run the callback once for the last publish occurrence for that event type, passing the last payload. For that, set as true the third and optional parameter (runIfCalled) to the subscribe function. The default behavior is false.

    subscribe('USER_LOGGED_IN', callback, true);

### Unsubscribe

Lastly, the subscribe function returns another function to unsubscribe for the event in the future. Just call it to end the contract.

    //c.js
    import { subscribe } from '@joaomelo/bus';

    function callback(payload){
      console.log(payload);
    };

    const unsubscribe = subscribe('SOME_TYPE_OF_EVENT', callback);

    //forget about it
    unsubscribe();

## Testing

The package has 100% test coverage. To run the tests install all dev dependencies and run `npm test`

## License

Made by [João Melo](https://www.linkedin.com/in/joaomelo81/?locale=en_US) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details