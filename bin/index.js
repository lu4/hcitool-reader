"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var yargs_1 = __importDefault(require("yargs"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var command_1 = require("./command");
var Runner = /** @class */ (function () {
    function Runner() {
    }
    Runner.main = function (cwd) {
        return __awaiter(this, void 0, void 0, function () {
            var directory, filenames, descriptors, _loop_1, _i, filenames_1, filename, _loop_2, _a, descriptors_1, descriptor, argv, commandName, target;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        directory = './commands';
                        filenames = fs
                            .readdirSync(path.join(__dirname, directory))
                            .filter(function (filename) { return path.extname(filename) === '.ts'; });
                        descriptors = [];
                        _loop_1 = function (filename) {
                            var joined, module_1, declarations, _i, declarations_1, declaration, name, instance;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        joined = path.join(directory, filename);
                                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./" + joined)); })];
                                    case 1:
                                        module_1 = _a.sent();
                                        declarations = Object.keys(module_1).map(function (key) { return module_1[key]; });
                                        for (_i = 0, declarations_1 = declarations; _i < declarations_1.length; _i++) {
                                            declaration = declarations_1[_i];
                                            if (command_1.IsCommand(declaration)) {
                                                name = path.parse(filename).name;
                                                instance = new declaration();
                                                descriptors.push({ name: name, instance: instance, declaration: declaration });
                                            }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, filenames_1 = filenames;
                        _b.label = 1;
                    case 1:
                        if (!(_i < filenames_1.length)) return [3 /*break*/, 4];
                        filename = filenames_1[_i];
                        return [5 /*yield**/, _loop_1(filename)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        descriptors.sort(function (x, y) { return x.name < y.name ? -1 : x.name === y.name ? 0 : 1; });
                        yargs_1.default
                            .help()
                            .scriptName(JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')).toString()).name)
                            .usage('Usage: $0 <command> [options]')
                            .demandCommand(1);
                        _loop_2 = function (descriptor) {
                            yargs_1.default.command(descriptor.name, descriptor.instance.description, function (args) {
                                var options = descriptor.instance.options;
                                var keys = Object.keys(options);
                                keys.sort();
                                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                                    var key = keys_1[_i];
                                    args = args.option(key, options[key]);
                                }
                                return args;
                            });
                        };
                        for (_a = 0, descriptors_1 = descriptors; _a < descriptors_1.length; _a++) {
                            descriptor = descriptors_1[_a];
                            _loop_2(descriptor);
                        }
                        argv = yargs_1.default.help('h')
                            .strict()
                            .alias('h', 'help')
                            .showHelpOnFail(true)
                            .parse();
                        commandName = argv._[0];
                        target = descriptors.find(function (x) { return x.name === commandName; });
                        if (!target) return [3 /*break*/, 6];
                        return [4 /*yield*/, target.instance.run(commandName, argv)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        console.log("Command '" + commandName + "' not found!");
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Runner;
}());
exports.Runner = Runner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFFMUIsZ0RBQTBCO0FBRTFCLHFDQUF5QjtBQUN6Qix5Q0FBNkI7QUFFN0IscUNBQTJEO0FBRTNEO0lBQUE7SUFnRUEsQ0FBQztJQS9EdUIsV0FBSSxHQUF4QixVQUF5QixHQUFXOzs7Ozs7d0JBQzVCLFNBQVMsR0FBRyxZQUFZLENBQUM7d0JBQ3pCLFNBQVMsR0FBRyxFQUFFOzZCQUNiLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzs2QkFDNUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLEVBQWhDLENBQWdDLENBQUMsQ0FBQzt3QkFFdEQsV0FBVyxHQUErQixFQUFFLENBQUM7NENBRXhDLFFBQVE7Ozs7O3dDQUNULE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQzt3Q0FDL0Isc0ZBQWEsT0FBSyxNQUFRLFFBQUM7O3dDQUFwQyxXQUFTLFNBQTJCO3dDQUVwQyxZQUFZLEdBQTZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsUUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFDO3dDQUV6RixXQUFvQyxFQUFaLDZCQUFZLEVBQVosMEJBQVksRUFBWixJQUFZLEVBQUU7NENBQTdCLFdBQVc7NENBQ2hCLElBQUksbUJBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRTtnREFDcEIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENB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