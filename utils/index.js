const {
  inputCaptureSetWatcher,
  inputCaptureRegisterElement,
} = require('./input_capture');

const {
  wrapInputEventRegister,
  wrapInputEventUnregister,
} = require('./input_event');

module.exports = require('./discord_utils.node');
module.exports.clearCandidateGamesCallback = module.exports.setCandidateGamesCallback;

inputCaptureSetWatcher(module.exports.inputWatchAll);
delete module.exports.inputWatchAll;
module.exports.inputCaptureRegisterElement = inputCaptureRegisterElement;

module.exports.inputEventRegister = wrapInputEventRegister(module.exports.inputEventRegister);
module.exports.inputEventUnregister = wrapInputEventUnregister(module.exports.inputEventUnregister);


module.exports.getGPUDriverVersions = async () => ({
  nvidia: {
    error: "Error: Command failed with exit code 2 (ENOENT)"
  }
});

module.exports.submitLiveCrashReport = async () => null;