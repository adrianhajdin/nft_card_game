export function AddNewEvent(eventFilter, provider, cb) {
  provider.removeListener(eventFilter);
  provider.on(eventFilter, ({ topics }) => cb(topics));
}
