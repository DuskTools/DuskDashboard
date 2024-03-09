const log = (...msg: unknown[]) =>
  process.env.EXPO_PUBLIC_SHOW_DEBUG_LOGS === '1' && console.log(msg)

export default { log }
