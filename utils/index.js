const fs = require('fs');
const path = require('path');
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

const isElectronRenderer =
  typeof window !== 'undefined' && window != null && window.DiscordNative && window.DiscordNative.isRenderer;

let dataDirectory;
try {
  dataDirectory =
    isElectronRenderer && window.DiscordNative.fileManager.getModuleDataPathSync
      ? path.join(window.DiscordNative.fileManager.getModuleDataPathSync(), 'discord_utils')
      : null;
} catch (e) {
  console.error('Failed to get data directory: ', e);
}

if (dataDirectory != null) {
  try {
    fs.mkdirSync(dataDirectory, {recursive: true});
  } catch (e) {
    console.warn("Couldn't create utils data directory ", dataDirectory, ':', e);
  }
}

module.exports.getGPUDriverVersions = async () => ({
  nvidia: {
    error: "Error: Command failed with exit code 2 (ENOENT): C:\\Program Files/NVIDIA Corporation/NVSMI/nvidia-smi.exe\nspawn C:\\Program Files/NVIDIA Corporation/NVSMI/nvidia-smi.exe ENOENT"
  }
});

module.exports.submitLiveCrashReport = async (channel, sentryMetadata) => null;
