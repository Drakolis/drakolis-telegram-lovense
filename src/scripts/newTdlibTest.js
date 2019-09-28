const TDLib = require('../singletons/tdlib');

TDLib.connect().then(() => TDLib.login());
