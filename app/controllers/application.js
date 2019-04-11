import Controller from '@ember/controller';

import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  router: service(),
  
  isNewUser: true,	// Stub
  
  actions: {
    login(nameEntry) {
      return true;	// Stub
    }
  }
});
