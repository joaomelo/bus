# The EventBus

EventBus is a design pattern that helps decouple parts of a system that need to coordinate asynchronously with each other. The implementation and usage of an EventBus can be relatively simple. 

Even so, if desired, this small and 100% test covered package can be used as one in any javascript app.

## Motivation

Let's say you are developing a javascript web app that needs to route to a new URL after login. You could do something like this:

    // login.js

    import { route } from '__src/router';

    function login (email, password) {
	    // perform some login logic
	    route.to('/home');
    }

Cool. But let's say a few days later you discover that after login you need to make sure the user has profile information saved and create the default profile preferences if not. The code should evolve into something new.

    // login.js
    
    import { route } from '__src/router';
    import { hasProfile, createProfile } from '__src/profile';

    function login(email, password) {
      // perform some login logic
      if (!hasProfile(email)) {
        createProfile(email);
      }
      route.to('/home');
    }

Now, let's take a break, do some fun stuff and come back six months later to update the profile or router modules. What's the odds of this future you or some teammate remembers that login code is dependent on router or profile logic? Well, never tell me the odds.

## Usage

The EventBus approach minimizes this kind of hard dependency. There are some variations in how to implement it. But they gravitate around the same central pattern of publishing and subscribing to events types -- also known as topics.

Let's start installing our package and keep the explanation going on. 

### Installation

You can download [bus.js file](https://github.com/joaomelo/bus/blob/master/src/bus.js) directly or install it with npm.

    npm install @joaomelo/bus

### Getting Started

The behavior is driven by the subscribe and publish functions. To listen to a topic, you import the subscribe function and call it passing the topic key and a callback function to be called when the event is published. Our router and profile modules become:

    // router.js
    import { subscribe }  from '@joaomelo/bus';
    subscribe('USER_LOGGED_IN', () => { route.to('/home') } );

    // profile.js
    import { subscribe }  from '@joaomelo/bus';
    subscribe('USER_LOGGED_IN', email => { 
      if (!hasProfile(email)) {
        createProfile(email)
      }
    });

The login module should now just publish the event without the need to understand any details about how this would be used. Data is passed as payload to all subscribers callback functions.

    // login .js
    import { publish } from '@joaomelo/bus'

    function login(email, password) {
	    // perform some login logic
      publish('USER_LOGGED_IN', email)
    }

### Unsubscribe

The subscribe function returns another function. Invoking it will prevent that particularly callback to be executed in future event publications.

    // some-module.js
    import { subscribe } from '@joaomelo/bus';

    const unsub = subscribe('MY_TOPIC', payload => console.log(payload));

    unsub(); // forget about it

### Late subscription

Everything until here is enough to use the Bus effectively. Complex business cases will impose more sophistication like queue management or failsafe recovery. Our humble package has only one configuration option. It is optional and could be passed as the third parameter of the subscribe function.

Maybe you are subscribing after an event was already published. For example, you want to listen for the user login but it happened automatically on initialization based on some cached data. The code that subscribes to the login event was unable to catch that.

The Bus can compensate for that running the callback immediately after subscription if the topic was published at last one time. The last payload will be passed. For that to happen, pass the boolean true value as the third parameter of the subscribe function.

    subscribe('SOME_TOPIC', callback, true);

## Wrapping up

As said, the EventBus is simple to implement and use. You can check that the whole code resides in a few lines in one file. But it has its drawbacks. 

Now you will have a central point of failure that can ruin a lot of expectations. If you change the EventBus maybe a large refactoring will be needed. 

Another disadvantage is that even if the dependency was managed it didn't go away. The modules still share the topic key and payload as an indirect interface. A bug now can more hard to identify and fix.

Still, is a very practical design and easily recognizable. I use it a lot when the dependency has no business meaning.

## Testing

The package has 100% test coverage. To run the tests, clone the repository, install all dev dependencies and have fun.

    git clone https://github.com/joaomelo/bus.git
    npm install
    npm test

## License

Made by [João Melo](https://www.linkedin.com/in/joaomelo81/?locale=en_US) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details