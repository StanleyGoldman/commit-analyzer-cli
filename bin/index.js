#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var devnull = require('dev-null');
var getLogger = require("semantic-release/lib/get-logger");
var getConfig = require("semantic-release/lib/get-config");
var getCommits = require("semantic-release/lib/get-commits");
var git = require("semantic-release/lib/git");
var getNextVersion = require("semantic-release/lib/get-next-version");
var getLastRelease = require("semantic-release/lib/get-last-release");
var utils = require("semantic-release/lib/plugins/utils");
var context = { cwd: process.cwd(), env: process.env, stdout: devnull(), stderr: process.stderr };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, plugins, options, _b, _c, nextRelease, _d, e_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 6, , 7]);
                context.logger = getLogger(context);
                return [4 /*yield*/, getConfig(context, { plugins: [] })];
            case 1:
                _a = _e.sent(), plugins = _a.plugins, options = _a.options;
                context.options = options;
                _b = context;
                return [4 /*yield*/, getLastRelease(context)];
            case 2:
                _b.lastRelease = _e.sent();
                _c = context;
                return [4 /*yield*/, getCommits(context)];
            case 3:
                _c.commits = _e.sent();
                _d = {};
                return [4 /*yield*/, plugins.analyzeCommits(context)];
            case 4:
                _d.type = _e.sent();
                return [4 /*yield*/, git.getGitHead({ cwd: context.cwd, env: context.env })];
            case 5:
                nextRelease = (_d.gitHead = _e.sent(), _d);
                if (!nextRelease.type) {
                    return [2 /*return*/, false];
                }
                else {
                    context.nextRelease = nextRelease;
                    nextRelease.version = getNextVersion(context);
                    return [2 /*return*/, nextRelease.version];
                }
                return [3 /*break*/, 7];
            case 6:
                e_1 = _e.sent();
                console.error(e_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); })();
