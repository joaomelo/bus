# BUS

Bus is a small package that functions as a simple central event bus for a javascript app.

## INSTALLATION

You can simply download bus.js file from the src directory or install with npm

    npm install @joaomelo/bus

## Getting Started

The whole behavior is driven by subscribe and publish functions.

To listen to an event you import subscribe function given it a key to track the event and pass it a function to be called when the event happens.

    //a.js
    import { subscribe } from '@joaomelo/bus';

    function callback(payload){
      console.log(payload);
    };

    subscribe('SOME_TYPE_OF_EVENT', callback);

Then in another module, you can emit the event with some data as payload to all subscriber callbacks functions.

    //b.js
    import { publish } from '@joaomelo/bus';

    const payload('hello world')
    publish('SOME_TYPE_OF_EVENT', payload);

Maybe you are subscribing after an event already happened in the past. For example, you want to listen for the user login but it happened automatically even before your code subscribed to the event.

The BUS can run the callback once for the last publish occurrence for that event type, passing the last payload. For that, set as true the third and optional parameter (runIfCalled) to the subscribe function. The default behaviour is false.

    subscribe('USER_LOGGED_IN', callback, true);

## License

This was made by [João Melo](https://www.linkedin.com/in/joaomelo81/?locale=en_US)

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details