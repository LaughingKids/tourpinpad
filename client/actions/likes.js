// increment
/* user like storage
 * 'postId':[userId1,userId2, ... , userIdn]
 * update current like record in mongodb
 * update current userUnreaded msg list
 * send a PUT request to user API
 */
export function increment(postId,userId) {
  return {
    type: 'INCREMENT_LIKES',
    postId,
    userId,
  }
}
