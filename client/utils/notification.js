/*
 * @para: Json data for an Object msg
 *  -> msg:title; msg:content; msg:icon; msg: redirect_url;
 */
export default function noticeUser(message) {
  // console.log(message);
  const options = {
    body: message.content,
    icon: 'https://gitlab.com/uploads/user/avatar/56386/tt_avatar_small.jpg'
  };
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert(message.title + "\n" + message.body);
  }
  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message.title,options);
    notification.onclick = function(event) {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      window.open(message.redirect_url , '_blank');
    }
  }
  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Whatever the user answers, we make sure we store the information
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message.title,options);
        notification.onclick = function(event) {
          event.preventDefault(); // prevent the browser from focusing the Notification's tab
          window.open(message.redirect_url , '_blank');
        }
      }
    });
  }
  // At last, if the user already denied any notification, and you
  // want to be respectful there is no need to bother them any more.
}
