'use strict';

Router.register('/dashboard', () => {
  Router.navigate(Auth.isAdmin() ? '/admin' : '/');
});
