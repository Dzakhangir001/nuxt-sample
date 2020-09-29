import Velocity from 'velocity-animate'

export default (ctx, inject) => {
  if (process.client) {
    ctx.$velocity = Velocity
  }
  inject('velocity', Velocity)
}
