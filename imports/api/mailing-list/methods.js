/* eslint-disable new-cap */

import CryptoJS from 'crypto-js';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MailChimp } from '../../modules/server/mailchimp.js';

const { settings } = Meteor;

Meteor.methods({
  subscribeToMailingList(subscribe) {
    check(subscribe, {
      emailAddress: String,
      name: { first: String, last: String },
    });

    const { emailAddress, name } = subscribe;

    if (!emailAddress || !name.first || !name.last) {
      throw new Meteor.Error('500', 'Need your email address and name, slick.');
    } else {
      MailChimp.lists('subscribe', {
        list_id: settings.private.mailChimp.listId,
        status: 'subscribed',
        subscriber_hash: CryptoJS.MD5(emailAddress),
        email_address: emailAddress,
        merge_fields: {
          FNAME: name.first,
          LNAME: name.last,
        },
      });
    }
  },
});
