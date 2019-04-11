import Controller from '@ember/controller';

import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  currentUser: service(),
  router: service(),
  
  isNewUser: computed('nameEntry','model.length',function() {
    return !this.model.isAny('name',this.nameEntry);
  }),
  
  actions: {
    login(nameEntry) {
      if(!nameEntry) {
        this.set('displayNoNameError',true);
        return;
      } else {
        this.set('displayNoNameError',false);
      }
      
      // Check if name already exists, otherwise create it
      let user = this.model.findBy('name',nameEntry);
      
      if(user) {
        this.currentUser.set('user',user);
      } else {
        // create it
        user = this.store.createRecord('user', { name: nameEntry });
        user.save();
        this.currentUser.set('user',user);
      }
      
      this.router.transitionTo('index');
      
    }
  }
});
